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
