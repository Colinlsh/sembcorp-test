// In ColinMapMap.tsx, add this new component at the top, after the imports.

import { useMapEvents } from "react-leaflet";
import { useAppDispatch } from "../app/hooks";
import { openMeteoHourlyAsync, setCenter } from "../app/slice/weatherSlice";
import React from "react";

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  // Use the /api/reverse endpoint which will be proxied by Vite
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const fallbackName = `Lat: ${lat.toFixed(3)}, Lon: ${lon.toFixed(3)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // If the request fails, return the fallback name
      return fallbackName;
    }

    const data = await response.json();

    // The 'display_name' property usually contains the full, formatted address
    return data.display_name || fallbackName;
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return fallbackName;
  }
}

export const MapClickHandler: React.FC = () => {
  const dispatch = useAppDispatch();

  useMapEvents({
    async click(e) {
      // e.latlng contains the latitude and longitude of the clicked point
      const { lat, lng } = e.latlng;
      console.log(`Map clicked at: Latitude: ${lat}, Longitude: ${lng}`);

      const locationName = await reverseGeocode(lat, lng);

      // 1. Dispatch `setCenter` to update the map's focus and current location name
      dispatch(
        setCenter({
          // We'll create a simple name from the coordinates for now
          name: locationName,
          location: { latitude: lat, longitude: lng },
          // Create a small bounding box around the clicked point
          bounds: [
            [lat - 0.01, lng - 0.01],
            [lat + 0.01, lng + 0.01],
          ],
        })
      );

      // 2. Dispatch the thunk to fetch new weather data for the clicked coordinates
      // Note: We leave startDate and endDate empty to use the defaults in the agent
      dispatch(
        openMeteoHourlyAsync({
          coordinates: { latitude: lat, longitude: lng },
          startDate: "",
          endDate: "",
        })
      );
    },
  });

  // This component does not render anything itself
  return null;
};
