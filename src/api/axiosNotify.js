import axiosClient from "./axiosClient";
const notifyApi = {
  add(params) {
    const url = "api/v1/notify";
    return axiosClient.post(url, params);
  },
  getAdmin() {
    const url = "api/v1/notify";
    return axiosClient.get(url);
  },
  getUser() {
    const url = `api/v1/notify/user`;
    return axiosClient.get(url);
  },
  markRead(id, type) {
    const url = `api/v1/notify/${id}/mark-read`;
    return axiosClient.patch(url, type);
  },
  markUnRead(id, type) {
    const url = `api/v1/notify/${id}/mark-unread`;
    return axiosClient.patch(url, type);
  },
};
export default notifyApi;
