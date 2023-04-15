import { Route, Routes } from 'react-router-dom'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

const CartFeatures = () => {
  return (
    <Routes>
      <Route
        path="/cart"
        element={<CartPage />}
      ></Route>
      <Route
        path="/payment"
        element={<CheckoutPage />}
      ></Route>
    </Routes>
  )
}

export default CartFeatures
