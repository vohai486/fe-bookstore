import axiosClient from './axiosClient'
const bookApi = {
  getAll(params) {
    const url = 'api/v1/books'
    return axiosClient.get(url, { params })
  },
  get(id) {
    const url = `api/v1/books/${id}`
    return axiosClient.get(url)
  },
  searchBook(params) {
    const url = 'api/v1/books/search'
    return axiosClient.get(url, { params })
  },
  createBook(values) {
    const data = new FormData()
    for (const key in values) {
      if (!!values[key]) {
        data.append(key, values[key])
      }
    }
    return axiosClient.post('api/v1/books', data)
  },
  updateBook(values, id) {
    const data = new FormData()
    for (const key in values) {
      if (!!values[key]) {
        data.append(key, values[key])
      }
    }
    return axiosClient.patch(`api/v1/books/${id}`, data)
  },
  deleteBook(id) {
    return axiosClient.delete(`api/v1/books/${id}`)
  },
}
export default bookApi
