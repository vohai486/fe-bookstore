import { StorageKeys, STATIC_HOST } from '@/constants/common'
import axios from 'axios'
const controller = new AbortController()
const { signal } = controller
const axiosClient = new axios.create({
  baseURL: `${STATIC_HOST}/`,
  timeout: 10000,
})

axiosClient.interceptors.request.use(
  function (config) {
    // config.signal = signal
    config.headers['Authorization'] =
      'Bearer ' +
      (localStorage.getItem(StorageKeys.TOKEN)
        ? localStorage.getItem(StorageKeys.TOKEN)
        : '')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response.data
  },

  function (error) {
    // const { config, status, data } = error.response;
    // const URLs = ["/api/auth/register", "/api/auth/login"];
    // if (URLs.includes(config.url) && [401, 400].includes(status)) {
    //   throw new Error("This user does not exist");
    // }
    // if (
    //   config.url === "/api/auth/register" &&
    //   [401, 400, 409].includes(status)
    // ) {
    //   throw new Error("Email already exists");
    // }
    if (error.response?.data?.msg) {
      console.log(error.response.data?.msg)
      throw new Error(error.response.data?.msg)
    }
    return Promise.reject(error)
  }
)
export default axiosClient
