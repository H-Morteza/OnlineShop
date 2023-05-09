import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ProductReuquest } from "../models/productReuquest";

axios.defaults.baseURL = "http://localhost:5000/api/";
const requestBody = (response: AxiosResponse) => response.data;
axios.defaults.withCredentials = true;
const sleep = () => new Promise((resolve) => setTimeout(resolve, 100));
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as any;
    switch (status) {
      case 400:
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      case 500:
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);
const ApiErrors = {
  get400Error: () => requests.get(`bug/bad-request`),
  get401Error: () => requests.get(`bug/unauthorized`),
  get404Error: () => requests.get(`bug/not-found`),
  get500Error: () => requests.get(`bug/server-error`),
  getValidationError: () => requests.get(`bug/validation-error`),
};

const requests = {
  get: (url: string) => axios.get(url).then(requestBody),
  post: (url: string, body: {}) => axios.post(url, body).then(requestBody),
  put: (url: string, body: {}) => axios.put(url, body).then(requestBody),
  delete: (url: string) => axios.delete(url).then(requestBody),
};
const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Catalog = {
  list: (reuquest: ProductReuquest) => requests.post("products", reuquest),
  details: (id: number) => requests.get(`products/${id}`),
  filters: () => requests.get("products/filters"),
};

const apiHelper = {
  Catalog,
  ApiErrors,
  Basket,
};

export default apiHelper;
