import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import cartReducer from './cartSlice'
import notifyReducer from './notifySlice'
import orderReducer from './orderSlice'
import chatReducer from './chatSlice'

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
  notify: notifyReducer,
  order: orderReducer,
  chat: chatReducer,
}
const store = configureStore({
  reducer: rootReducer,
})

export default store
