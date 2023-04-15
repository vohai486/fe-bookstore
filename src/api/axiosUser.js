import axiosClient from "./axiosClient";
const userApi = {
  login(params) {
    const url = "api/v1/auth/login";
    return axiosClient.post(url, params);
  },
  register(params) {
    const url = "api/v1/auth/register";
    return axiosClient.post(url, params);
  },
  getMe() {
    const url = "api/v1/users/me";
    return axiosClient.get(url);
  },
  updateMe(user) {
    const data = new FormData();
    for (const key in user) {
      if (!!user[key]) {
        data.append(key, user[key]);
      }
    }
    return axiosClient.patch("api/v1/users/me", data);
  },
  updateMeImg(photo) {
    const data = new FormData();
    data.append("photo", photo);
    return axiosClient.patch("api/v1/users/me", data);
  },
  getListAddressUser() {
    return axiosClient.get("api/v1/users/me/address");
  },
  addAddress(params) {
    return axiosClient.post("api/v1/users/me/address", params);
  },
  removeAddress(id) {
    return axiosClient.delete(`api/v1/users/me/address/${id}`);
  },
  upadteAddress(id, params) {
    return axiosClient.patch(`api/v1/users/me/address/${id}`, params);
  },
  getAll(params) {
    const url = `api/v1/users`;
    return axiosClient.get(url, { params });
  },
  updateUser(params, id) {
    const url = `api/v1/users/${id}`;
    return axiosClient.patch(url, params);
  },
  deleteUser(id) {
    const url = `api/v1/users/${id}`;
    return axiosClient.delete(url);
  },
};
export default userApi;
