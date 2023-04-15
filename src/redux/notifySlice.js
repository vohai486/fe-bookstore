import cartApi from '@/api/axiosCart'
import notifyApi from '@/api/axiosNotify'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
const initialState = {
  listNotifyAdmin: [],
  listNotifyUser: [],
}

export const createNotifyAdmin = createAsyncThunk(
  'notify/addNotify',
  async (payload) => {
    const res = await notifyApi.add(payload)
    return res.data.data
  }
)
export const getNotifyAdmin = createAsyncThunk('notify/getNotify', async () => {
  const res = await notifyApi.getAdmin()
  return res.data.data
})

export const createNotifyUser = createAsyncThunk(
  'notify/addNotifyUser',
  async (payload) => {
    const res = await notifyApi.add(payload)
    return res.data.data
  }
)
export const getNotifyUser = createAsyncThunk(
  'notify/getNotifyUser',
  async (payload) => {
    const res = await notifyApi.getUser(payload)
    return res.data.data
  }
)

export const markRead = createAsyncThunk('notify/markRead', async (payload) => {
  const { id, type } = payload
  const res = await notifyApi.markRead(id, { type })
  return {
    data: res.data.data,
    type,
  }
})

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    addNotifyAdmin: (state, action) => {
      console.log(action.payload)
      state.listNotifyAdmin = [action.payload, ...state.listNotifyAdmin]
    },
    addNotifyUser: (state, action) => {
      console.log(action.payload)
      state.listNotifyUser = [action.payload, ...state.listNotifyUser]
    },
    setListNotifyUserLogout: (state, action) => {
      state.listNotifyUser = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNotifyAdmin.fulfilled, (state, action) => {
        state.listNotifyAdmin = [...state.listNotifyAdmin, action.payload]
      })
      .addCase(getNotifyAdmin.fulfilled, (state, action) => {
        state.listNotifyAdmin = action.payload
      })
      .addCase(createNotifyUser.fulfilled, (state, action) => {
        state.listNotifyUser = [...state.listNotifyUser, action.payload]
      })
      .addCase(getNotifyUser.fulfilled, (state, action) => {
        state.listNotifyUser = action.payload
      })
      .addCase(getNotifyUser.rejected, (state, action) => {
        state.listNotifyUser = []
      })
      .addCase(markRead.fulfilled, (state, action) => {
        const { type, data } = action.payload
        const index = (
          type === 'admin' ? state.listNotifyAdmin : state.listNotifyUser
        ).findIndex((item) => item._id === data._id)
        if (index > -1) {
          ;(type === 'admin' ? state.listNotifyAdmin : state.listNotifyUser)[
            index
          ] = data
        }
      })
  },
})

export const { addNotifyAdmin, setListNotifyUserLogout, addNotifyUser } =
  notifySlice.actions
export default notifySlice.reducer
