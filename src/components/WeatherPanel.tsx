import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { WeatherData } from "../app/models";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useRef } from "react";

interface WeatherChartPanelProps {
  data: WeatherData | null;
  locationName: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function WeatherChartPanel({
  data,
  locationName,
  onClose,
  isOpen,
}: WeatherChartPanelProps) {
  const miniMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // When the panel opens...
    if (isOpen && miniMapRef.current) {
      // Use a short timeout. This ensures the command runs AFTER the CSS transition
      // has given the map container its final size.
      setTimeout(() => {
        miniMapRef.current?.invalidateSize();
      }, 20); // A small delay is all that's needed
    }
  }, [isOpen]); // This effect runs whenever 'isOpen' changes

  if (!data) return null;

  // Get the first and last date strings from the daily data array
  const firstDay = data.daily.time[0];
  const lastDay = data.daily.time[data.daily.time.length - 1];

  // Define formatting options for a clean date style (e.g., "Jun 15, 2025")
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedStartDate = new Date(
    firstDay + "T00:00:00"
  ).toLocaleDateString("en-US", dateOptions);
  const formattedEndDate = new Date(lastDay + "T00:00:00").toLocaleDateString(
    "en-US",
    dateOptions
  );

  let lastDisplayedDay = "";

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem + "Z");
    const currentDay = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });

    // Check if the day of the current tick is different from the last one we showed.
    if (currentDay !== lastDisplayedDay) {
      lastDisplayedDay = currentDay; // Update our memory to the new day
      return currentDay; // Display the new day, e.g., "Sat 15"
    }

    // If it's the same day, just show the time.
    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  };

  const hourlyChartData = data.hourly.time.map((t, index) => ({
    rawTime: t,
    time: new Date(t + "Z").toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      hour: "numeric",
      hour12: true,
    }), // More descriptive tooltip time
    temperature: data.hourly.temperature2m[index],
    humidity: data.hourly.relativehumidity2m![index],
    radiation: data.hourly.directRadiation![index],
  }));

  const dailyChartData = data.daily.time.map((t, index) => ({
    date: new Date(t + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    }),
    "Max Temp": data.daily.temperature_2m_max[index],
    "Min Temp": data.daily.temperature_2m_min[index],
  }));

  return (
    <div
      className={`
        absolute top-1/2 left-1/2 w-11/12 max-w-4xl h-auto max-h-[90vh] 
        bg-white bg-opacity-90 backdrop-blur-sm z-[1000] p-4 shadow-2xl rounded-lg 
        flex flex-col overflow-y-auto
        transition-all duration-500 ease-in-out 
        ${
          isOpen
            ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2"
            : "opacity-0 scale-95 -translate-x-1/2 -translate-y-full pointer-events-none"
        }
      `}
    >
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <div>
          <h3 className="font-bold text-xl text-gray-800">
            Forecast for {locationName}
          </h3>
          <p className="text-sm text-gray-600">
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
        <button
          onClick={onClose}
          className="font-bold text-2xl text-gray-600 hover:text-gray-900 bg-transparent border-none"
        >
          &times;
        </button>
      </div>

      <div className="flex-grow flex flex-col md:flex-row gap-4 overflow-hidden">
        <div className="w-full md:w-1/3 h-64 md:h-[calc(80vh-6rem)] rounded-md overflow-hidden flex-shrink-0">
          <MapContainer
            ref={miniMapRef}
            key={`${data.latitude}_${data.longitude}`}
            center={[data.latitude, data.longitude]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            dragging={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[data.latitude, data.longitude]} />
          </MapContainer>
        </div>

        <div className="w-full md:w-2/3 flex-grow flex flex-col gap-6 overflow-y-auto pr-2">
          {/* --- CHART 1: TEMPERATURE & HUMIDITY --- */}
          <div className="w-full h-64">
            <h4 className="text-center font-semibold text-gray-700">
              Temperature & Humidity
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={hourlyChartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  dataKey="rawTime"
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  stroke="#555"
                  fontSize={12}
                  tickFormatter={formatXAxis}
                  interval="preserveStartEnd"
                />
                <YAxis
                  yAxisId="left"
                  stroke="#8884d8"
                  fontSize={12}
                  label={{ value: "°C", angle: -90, position: "insideLeft" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#82ca9d"
                  fontSize={12}
                  label={{ value: "%", angle: -90, position: "insideRight" }}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#8884d8"
                  name="Temp (°C)"
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#82ca9d"
                  name="Humidity (%)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* --- CHART 2: SOLAR RADIATION --- */}
          <div className="w-full h-64">
            <h4 className="text-center font-semibold text-gray-700">
              Solar Radiation
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={hourlyChartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="rawTime"
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  stroke="#555"
                  fontSize={12}
                  tickFormatter={formatXAxis}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#555"
                  fontSize={12}
                  label={{
                    value: "W/m²",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="radiation"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.6}
                  name="Radiation (W/m²)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* --- CHART 3: DAILY TEMPERATURES --- */}
          <div className="w-full h-64">
            <h4 className="text-center font-semibold text-gray-700">
              Daily Temperature Range
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyChartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#555" fontSize={12} />
                <YAxis unit="°C" stroke="#555" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Max Temp" fill="#ff7300" />
                <Bar dataKey="Min Temp" fill="#387908" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* <div className="w-full h-48 rounded-md overflow-hidden mb-4 flex-shrink-0">
        <MapContainer
          key={`${data.latitude}_${data.longitude}`}
          center={[data.latitude, data.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[data.latitude, data.longitude]} />
        </MapContainer>
      </div> */}
    </div>
  );
}
