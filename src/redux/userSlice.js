import orderApi from '@/api/axiosOrder'
import userApi from '@/api/axiosUser'
import { StorageKeys } from '@/constants/common'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  isShowModalLogin: false,
  listAddress: [],
}
export const register = createAsyncThunk('user/register', async (payload) => {
  const res = await userApi.register(payload)
  localStorage.setItem(StorageKeys.TOKEN, res.token)
  localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data.data))
  return res.data.data
})
export const login = createAsyncThunk('user/login', async (payload) => {
  const res = await userApi.login(payload)
  localStorage.setItem(StorageKeys.TOKEN, res.token)
  localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data.data))
  return res.data.data || {}
})
export const getMe = createAsyncThunk('user/getMe', async () => {
  const res = await userApi.getMe()
  localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data.data))
  return res.data.data || {}
})
export const updateMe = createAsyncThunk('user/updateMe', async (payload) => {
  let res = {}
  if (payload.hasOwnProperty('photo')) {
    res = await userApi.updateMeImg(payload.photo)
  } else {
    res = await userApi.updateMe(payload)
  }
  // const res = await userApi.updateMe();
  if (res) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data.data))
    return res.data.data
  }
  return {}
})
export const getListAddress = createAsyncThunk(
  'user/getListAddress',
  async () => {
    const res = await userApi.getListAddressUser()
    return res.data.data
  }
)
export const addAddress = createAsyncThunk(
  'user/addAddress',
  async (payload) => {
    const res = await userApi.addAddress(payload)
    return res.data.data
  }
)
export const removeAddress = createAsyncThunk(
  'user/removeAddress',
  async (payload) => {
    const res = await userApi.removeAddress(payload)
    return res.data.data
  }
)
export const updateAddress = createAsyncThunk(
  'user/updateAddress',
  async (payload) => {
    const res = await userApi.upadteAddress(payload._id, payload.data)
    return res.data.data
  }
)

const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setListAddressLogout: (state) => {
      state.listAddress = []
    },
    showModalLogin: (state) => {
      state.isShowModalLogin = true
    },
    hideModalLogin: (state) => {
      state.isShowModalLogin = false
    },
    logout: (state) => {
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.TOKEN)
      state.currentUser = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(register.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        if (Object.keys(action.payload || {}).length !== 0) {
          state.currentUser = action.payload
        }
      })
      .addCase(getListAddress.fulfilled, (state, action) => {
        state.listAddress = action.payload || []
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        if (!!action.payload) {
          state.listAddress = action.payload
        }
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        if (!!action.payload) {
          state.listAddress = action.payload
        }
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        if (!!action.payload) {
          state.listAddress = action.payload
        }
      })
  },
})

export const { showModalLogin, logout, hideModalLogin, setListAddressLogout } =
  productSlice.actions
export default productSlice.reducer
