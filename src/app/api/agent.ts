import axios, { AxiosResponse } from "axios";
import { UserLoginModel } from "../models";

const appEnv = import.meta.env.VITE_APP_ENV;
const appURL = import.meta.env.VITE_APP_API_URL;

const server_api_test = appURL;
const server_api_prod = appURL;

axios.defaults.baseURL =
  appEnv === "production" ? server_api_test : server_api_prod;

console.log(appEnv);
console.log(server_api_test);
console.log(server_api_prod);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: async (url: string, token?: string) => {
    const response = await axios.get(
      url,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );
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

const SmartWater = {
  setWiFi: (form: object, token: string, timeout?: number) => {
    console.log(form); // Before sending the POST request in React

    return requests.post(`/set-wifi`, form, token, timeout);
  },
  scanForWifi: (token: string) => requests.get(`/scan-wifi`, token),
  checkWiFiConnection: (token: string) =>
    requests.get("/check-connection", token),
  signin: (user_login: UserLoginModel) => {
    return requests.post(`/signin`, user_login);
  },
};

const agent = {
  SmartWater,
};

export default agent;
