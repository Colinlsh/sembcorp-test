import axios, { AxiosResponse } from "axios";
// import { UserLoginModel } from "../models";
// https://api.data.gov.sg/v1/environment/2-hour-weather-forecast

const areaWeatherURL =
  "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";

//https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2024-11-01&end_date=2024-11-10

// https://archive-api.open-meteo.com/v1/era5?latitude=1.29&longitude=103.85&start_date=2024-11-01&end_date=2024-11-10&hourly=temperature_2m&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore

// const forecastByLatLongURL = "https://api.open-meteo.com/v1/forecast";
const forecastByLatLongURL = "https://archive-api.open-meteo.com/v1/era5";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: async (url: string, params?: Record<string, unknown>) => {
    // const fullUrl = new URL(url);
    // if (params) {
    //   Object.keys(params).forEach((key) =>
    //     fullUrl.searchParams.append(key, String(params[key]))
    //   );
    // }
    // console.log(`Making GET request to: ${fullUrl.toString()}`);
    const response = await axios.get(url, { params });
    return responseBody(response);
  },
  post: async (
    url: string,
    body: FormData | object,
    token?: string,
    timeout?: number
  ) => {
    const headers: { [key: string]: string } = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await axios.post(url, body, { headers, timeout });
    return responseBody(response);
  },
  put: async (url: string, body: object, token?: string) => {
    const response = await axios.put(
      url,
      body,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );
    return responseBody(response);
  },
  del: async (url: string) => {
    const response = await axios.delete(url);
    return responseBody(response);
  },
};

// --- Helper function to format dates to YYYY-MM-DD ---
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SmartWeather = {
  getAreaWeather: () => {
    // This API might require a specific 'date_time' or 'date' in the body/params
    return requests.get(areaWeatherURL);
  },
  getForecastByLatLng: (
    lat: number,
    lon: number,
    startDate?: string,
    endDate?: string
  ) => {
    // Default to a 7-day forecast if dates are not provided
    const defaultStartDate = new Date("2024-11-01T00:00:00");
    const defaultEndDate = new Date("2024-11-10T00:00:00");

    const params = {
      latitude: lat,
      longitude: lon,
      hourly: "temperature_2m,relativehumidity_2m,direct_radiation",
      daily: "temperature_2m_max,temperature_2m_min",
      timezone: "auto", // 'auto' is often more flexible than a fixed timezone
      start_date: startDate || formatDate(defaultStartDate),
      end_date: endDate || formatDate(defaultEndDate),
    };

    // This is a GET request with all parameters in the URL
    return requests.get(forecastByLatLongURL, params);
  },
};

const agent = {
  SmartWeather,
};

export default agent;
