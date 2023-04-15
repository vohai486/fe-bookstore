import axiosClient from "./axiosClient";
const categoriesApi = {
  getCategory(params) {
    const url = "api/v1/categories";
    return axiosClient.get(url);
  },
};
export default categoriesApi;
