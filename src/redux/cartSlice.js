import cartApi from '@/api/axiosCart'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
const initialState = {
  listCart: [],
}

export const getCart = createAsyncThunk('user/getCart', async () => {
  const res = await cartApi.get()
  return res.data.data || []
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartLogOut(state, action) {
      state.listCart = []
    },
    setAllChecked(state, action) {
      state.listCart.map((item) => (item.checked = !action.payload))
    },
    handItemCheck(state, action) {
      const { check, id } = action.payload
      state.listCart.map((item) => {
        if (item._id === id) {
          item.checked = check
        }
        return item
      })
    },
    updateCart(state, action) {
      action.payload.length > 0 &&
        action.payload.forEach((item) => {
          const idx = state.listCart.findIndex(
            (itemBook) => item._id.toString() === itemBook.book.toString()
          )
          if (idx > -1) {
            state.listCart.splice(idx, 1)
          }
        })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        const prev = current(state).listCart
        state.listCart = action.payload.map((item) => ({
          ...item,
          checked: prev.find((ele) => ele._id === item._id)?.checked || false,
        }))
      })
      .addCase(getCart.rejected, (state, action) => {
        state.listCart = []
      })
  },
})

export const { setAllChecked, setCartLogOut, handItemCheck, updateCart } =
  cartSlice.actions
export default cartSlice.reducer
