import chatApi from '@/api/axiosChat'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
const initialState = {
  messages: [],
  listUserChat: [],
  messagesAdmin: [],
}

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (payload) => {
    const res = await chatApi.getMessages(payload)
    return res.data.data
  }
)
export const getMessagesAdmin = createAsyncThunk(
  'chat/getMessagesAdmin',
  async (payload) => {
    const res = await chatApi.getMessages(payload)
    return res.data.data
  }
)
export const createMessage = createAsyncThunk(
  'chat/createMessage',
  async (payload) => {
    const { data, type } = payload
    const res = await chatApi.create(data)
    return {
      data: res.data.data,
      type,
    }
  }
)
export const getListUserChat = createAsyncThunk(
  'chat/getListUserChat',
  async () => {
    const res = await chatApi.getListUserChat()
    return res.data.data
  }
)
export const markReadChatAdmin = createAsyncThunk(
  'chat/markReadChatAdmin',
  async (id) => {
    const res = await chatApi.updateIsReadChat(id)
    return res.data.data
  }
)
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { type, data } = action.payload
      console.log({ type, data })
      if (type === 'admin') {
        state.messages = [data, ...state.messages]
      } else {
        state.messagesAdmin = [data, ...state.messagesAdmin]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        const { type, data } = action.payload
        if (type === 'user') {
          state.messages = [data, ...state.messages]
        } else {
          state.messagesAdmin = [data, ...state.messagesAdmin]
        }
      })
      .addCase(getListUserChat.fulfilled, (state, action) => {
        state.listUserChat = action.payload
      })
      .addCase(getMessagesAdmin.fulfilled, (state, action) => {
        state.messagesAdmin = action.payload
      })
      .addCase(markReadChatAdmin.fulfilled, (state, action) => {
        const index = state.listUserChat.findIndex(
          (item) => item.chatId === action.payload?._id
        )
        if (index > -1) {
          state.listUserChat[index] = {
            ...state.listUserChat[index],
            isRead: true,
          }
        }
      })
  },
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer
