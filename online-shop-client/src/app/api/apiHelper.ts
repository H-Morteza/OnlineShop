import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/";
const requestBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(requestBody),
  post: (url: string, body: {}) => axios.post(url, body).then(requestBody),
  put: (url: string, body: {}) => axios.put(url, body).then(requestBody),
  delete: (url: string) => axios.delete(url).then(requestBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const apiHelper = {
  Catalog,
};

export default apiHelper;
