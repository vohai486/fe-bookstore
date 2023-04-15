import axiosClient from './axiosClient'
const cartApi = {
  get() {
    const url = 'api/v1/cart'
    return axiosClient.get(url)
  },
  add(params) {
    const url = 'api/v1/cart'
    return axiosClient.post(url, params)
  },
  update(params) {
    const url = 'api/v1/cart'
    return axiosClient.patch(url, params)
  },
  remove(params) {
    const url = 'api/v1/cart'
    return axiosClient.delete(url, { data: { ...params } })
  },
}
export default cartApi
