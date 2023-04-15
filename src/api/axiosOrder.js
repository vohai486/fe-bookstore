import { StorageKeys } from "@/constants/common";
import axios from "axios";
import axiosClient from "./axiosClient";
const orderApi = {
  add(params) {
    const url = "api/v1/orders/me";
    return axiosClient.post(url, params);
  },
  get() {
    const url = "api/v1/orders/me";
    return axiosClient.get(url);
  },
  cancel(id) {
    const url = `api/v1/orders/${id}/cancel`;
    return axiosClient.post(url);
  },
  getAll(params) {
    const url = `api/v1/orders`;
    return axiosClient.get(url, { params });
  },
  getDetail(id) {
    const url = `api/v1/orders/${id}`;
    return axiosClient.get(url);
  },
  updateStatus(id, params) {
    const url = `api/v1/orders/${id}`;
    return axiosClient.patch(url, params);
  },
  delivered(id) {
    const url = `api/v1/orders/${id}/delivered`;
    return axiosClient.post(url);
  },
};
export default orderApi;
