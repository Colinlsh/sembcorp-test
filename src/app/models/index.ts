// import * as FirebaseFirestore from "firebase/firestore";

export interface KeyValuePair {
  name: string;
  value: unknown[];
}

export interface MainState {
  modal: ModalModel;
  loading: boolean;
  error: string | null;
}

export interface User {
  username: string;
  tokens: tokens;
}

export interface tokens {
  access: string;
  refresh: string;
}

export interface UIState {
  modal: ModalModel;
  wifiModel: WifiModel;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    temperature2m: Float32Array | number[];
    relativehumidity2m?: number[];
    directRadiation?: number[]; // Changed from direct_radiation
  };
  daily: {
    time: string[];
    // ADD THESE TWO LINES
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface AreaForecast {
  area: string;
  forecast: string;
}

// Represents the valid time period for a forecast
export interface ValidPeriod {
  start: string;
  end: string;
}

// Represents a single item in the main 'items' array
export interface ForecastItem {
  update_timestamp: string;
  timestamp: string;
  valid_period: ValidPeriod;
  forecasts: AreaForecast[];
}

export interface WeatherApiResponse {
  area_metadata: {
    name: string;
    label_location: Coordinates;
  }[]; // Assuming area_metadata is an array of objects
  items: ForecastItem[];
}

export interface WeatherArchiveDataProps {
  startDate: string;
  endDate: string;
  coordinates: Coordinates;
}

export interface WeatherState {
  modal: ModalModel;
  data: WeatherData | null;
  areaForecasts: WeatherApiResponse | null;
  isLoading: boolean;
  currentLocation: {
    name: string;
    location: Coordinates;
    bounds: [[number, number], [number, number]];
  };
}

export interface WifiModel {
  ssid_list: WiFiConnectionsModel[];
  status: string;
  connected_network: ConnectedNetworkModel;
  wifiForm: WiFiFormModel;
  is_network_changing: boolean;
}

export interface WiFiFormModel {
  ssid: string;
  password: string;
  isLoading: boolean;
  isTimeoutSuccess: boolean;
}

export interface ModalModel {
  message?: string;
  header?: string;
  isShow?: boolean;
  isError?: boolean;
  result?: boolean;
  yesCallback?: () => void;
  noCallback?: () => void;
}

export interface UserLoginModel {
  username: string;
  password: string;
}

interface BaseWiFiConnectionModel {
  SSID: string;
  Mode: string;
  Channel: string;
  Rate: string;
  Signal: string;
  Bars: string;
  Security: string;
  IsLoading: boolean;
}

export interface WiFiConnectionsModel extends BaseWiFiConnectionModel {
  BSSID: string;
}

export interface ConnectedNetworkModel extends BaseWiFiConnectionModel {
  Active: boolean;
}

export interface dh22Model {
  temperature: number;
  humidity: number;
}
