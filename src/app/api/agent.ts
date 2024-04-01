import axios, { AxiosResponse } from "axios";
import { checkRainbowModel } from "../models";

const appEnv = import.meta.env.VITE_APP_ENV;
const gcp_function_test = import.meta.env.VITE_TEST_GCP_FUNCTION_TEST_URL;
const gcp_function_prod = import.meta.env.VITE_TEST_GCP_FUNCTION_URL;

axios.defaults.baseURL =
  appEnv === "production" ? gcp_function_test : gcp_function_prod;

console.log(appEnv);
console.log(gcp_function_test);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, token?: string) =>
    axios
      .get(url, token ? { headers: { Authorization: `Bearer ${token}` } } : {})
      .then(responseBody),
  post: (url: string, body: object, token?: string) =>
    axios
      .post(
        url,
        body,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      )
      .then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const EssentialOils = {
  listOils: () => requests.get(`oilapi/oils`),
  listRainbows: (token: string) => requests.get(`rainbowapi/rainbows`, token),
  check: (params: checkRainbowModel, token?: string) =>
    requests.post(`rainbowapi/checkRainbow`, params, token),
  rainbowHistory: (token: string) =>
    requests.get(`rainbowapi/rainbowHistory`, token),
};

const agent = {
  EssentialOils,
};

export default agent;
