import axiosClient from './axiosClient'
const chatApi = {
  create(params) {
    const url = 'api/v1/chat'
    return axiosClient.post(url, params)
  },
  getListUserChat() {
    const url = 'api/v1/chat'
    return axiosClient.get(url)
  },
  getMessages(id) {
    const url = `api/v1/chat/${id}/user`
    return axiosClient.get(url)
  },
  updateIsReadChat(id) {
    const url = `api/v1/chat/${id}`
    return axiosClient.patch(url)
  },
}
export default chatApi
