import orderApi from '@/api/axiosOrder'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
const initialState = {
  listOrders: [],
  listOrderMy: [],
}

export const getOrders = createAsyncThunk('order/getOrder', async (payload) => {
  const res = await orderApi.getAll(payload)
  return res.data
})

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (payload) => {
    const res = await orderApi.getDetail(payload)
    return res.data.data
  }
)
export const getListOrderMy = createAsyncThunk(
  'order/getListOrderMy',
  async () => {
    const res = await orderApi.get()
    return res.data.data
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.listOrders = [action.payload, ...state.listOrders].splice(0, 10)
    },
    setListOrderMyLogout: (state) => {
      state.listOrderMy = []
    },
    updateListOrderMy: (state, action) => {
      const id = action.payload._id.toString()
      const idx = state.listOrderMy.findIndex(
        (order, index) => order._id.toString() === id
      )
      if (idx > -1) {
        state.listOrderMy[idx] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.listOrders = action.payload.data
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const idx = state.listOrders.findIndex(
          (item) => item._id.toString() === action.payload._id.toString()
        )
        if (idx > -1) {
          state.listOrders[idx] = action.payload
        }
      })
      .addCase(getListOrderMy.fulfilled, (state, action) => {
        state.listOrderMy = action.payload
      })
  },
})

export const { addOrder, setListOrderMyLogout, updateListOrderMy } =
  orderSlice.actions
export default orderSlice.reducer
