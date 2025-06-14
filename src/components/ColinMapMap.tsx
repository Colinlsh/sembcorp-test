import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; //
import L from "leaflet";

// --- NEW: Import image assets directly ---
// Vite will correctly handle these imports and provide the URL paths.
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import SearchComponent from "./Search";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getSGAreaWeatherAsync,
  openMeteoHourlyAsync,
  setCenter,
} from "../app/slice/weatherSlice";
import { RootState } from "../app/store";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import WeatherChartPanel from "./WeatherPanel";
import { MapClickHandler } from "./MapClickHandler";
import Spinner from "./Spinner";

delete (
  L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string }
)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

export default function ColinMap() {
  const mapRef = useRef<L.Map | null>(null);
  const [zoom, setZoom] = useState(12);
  const [isPanelOpen, setIsPanelOpen] = useState(false); // <-- ADD THIS LINE

  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.weather);
  const provider = new OpenStreetMapProvider();

  const isInitialLoad = useRef(true);

  // Mock API call for search
  const handleSearch = async (
    query: string
  ): Promise<Array<{ position: [number, number]; name: string }>> => {
    console.log("Searching for:", query);

    const results = await provider.search({ query });

    if (results.length > 0) {
      return results.map((result) => ({
        position: [result.y, result.x],
        name: result.label,
        bounds: result.bounds,
      }));
    } else {
      return [];
    }
  };

  const handleLocationSelect = (location: {
    position: [number, number];
    name: string;
    bounds?: [[number, number], [number, number]];
  }) => {
    if (!mapRef.current) return;

    if (location.bounds) {
      mapRef.current.fitBounds([
        [location.bounds[0][0], location.bounds[0][1]],
        [location.bounds[1][0], location.bounds[1][1]],
      ]);
    } else {
      mapRef.current.setView(location.position, 14);
    }

    dispatch(
      setCenter({
        name: location.name,
        location: {
          latitude: location.position[0],
          longitude: location.position[1],
        },
        bounds: location.bounds!,
      })
    );

    setZoom(14);
  };

  useEffect(() => {
    if (state.currentLocation) {
      const bounds = state.currentLocation.bounds;
      // Calculate center of bounds
      const centerLat = (bounds[0][0] + bounds[1][0]) / 2;
      const centerLng = (bounds[0][1] + bounds[1][1]) / 2;

      dispatch(
        openMeteoHourlyAsync({
          coordinates: {
            latitude: centerLat,
            longitude: centerLng,
          },
          startDate: "",
          endDate: "",
        })
      );
    }
  }, [dispatch, state.currentLocation, state.currentLocation.location]);

  useEffect(() => {
    // Do nothing if data hasn't loaded yet
    if (!state.data) return;

    // Check if it's the very first time data has loaded
    if (isInitialLoad.current) {
      // If yes, flip the flag to false and do NOT open the panel
      isInitialLoad.current = false;
    } else {
      // If it's not the initial load, it means the user took an action,
      // so we open the panel with the new data.
      setIsPanelOpen(true);
    }
  }, [state.data]);

  useEffect(() => {
    if (state.areaForecasts === null) {
      dispatch(getSGAreaWeatherAsync());
    }
  }, [dispatch, state.areaForecasts]);

  if (!state.currentLocation) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen">
      {state.isLoading ?? <Spinner color="fill-white" />}
      <div className="absolute top-3 right-4 z-[1000]">
        <SearchComponent
          onSearch={handleSearch}
          onLocationSelect={handleLocationSelect}
        />
      </div>

      {state.data && !isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-20 right-4 z-[1000] bg-white text-gray-500 bg-opacity-70 font-semibold py-2 px-4 rounded-lg shadow-md border-none"
        >
          Show Forecast
        </button>
      )}

      {state.data && (
        <WeatherChartPanel
          data={state.data}
          locationName={state.currentLocation.name}
          onClose={() => setIsPanelOpen(false)}
          isOpen={isPanelOpen}
        />
      )}

      <MapContainer
        key={`${state.currentLocation.location.latitude.toString()}_${state.currentLocation.location.longitude.toString()}`}
        center={L.latLng(
          state.currentLocation.location.latitude,
          state.currentLocation.location.longitude
        )}
        ref={mapRef}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "0.5rem",
          zIndex: 0,
        }}
        zoom={zoom}
        zoomControl={true}
      >
        <MapClickHandler />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {state.areaForecasts !== null &&
          state.areaForecasts.area_metadata.map((location, index) => {
            const matchingForecast =
              state.areaForecasts!.items[0]?.forecasts.find(
                (forecast) => forecast.area === location.name
              );

            return (
              <Marker
                key={index}
                position={
                  new L.LatLng(
                    location.label_location.latitude,
                    location.label_location.longitude
                  )
                }
                eventHandlers={{
                  click: () => {
                    dispatch(
                      setCenter({
                        name: location.name,
                        location: location.label_location,
                        // Create a small bounding box for context
                        bounds: [
                          [
                            location.label_location.latitude - 0.01,
                            location.label_location.longitude - 0.01,
                          ],
                          [
                            location.label_location.latitude + 0.01,
                            location.label_location.longitude + 0.01,
                          ],
                        ],
                      })
                    );
                  },
                }}
              >
                <Popup>
                  <div className="space-y-1 font-sans">
                    <h3 className="font-bold text-gray-800">{location.name}</h3>

                    {matchingForecast && (
                      <div className="text-gray-700">
                        <p>Conditions: {matchingForecast.forecast}</p>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
