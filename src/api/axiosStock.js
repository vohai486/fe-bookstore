import axiosClient from './axiosClient'
const stockApi = {
  getStatsEntries(params) {
    const url = 'api/v1/stats/import'
    return axiosClient.get(url, { params })
  },
  createImport(params) {
    const url = 'api/v1/warehouse/import'
    return axiosClient.post(url, params)
  },
  updateImport(id, params) {
    const url = `api/v1/warehouse/import/${id}`
    return axiosClient.patch(url, params)
  },
  getInventory(params) {
    const url = `api/v1/stats`
    return axiosClient.get(url, { params })
  },
}
export default stockApi
