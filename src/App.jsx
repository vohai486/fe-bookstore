import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Routes, Route, useLocation } from 'react-router-dom'
import ModalAuth from './components/modal/ModalAuth'
import { ProtectedAdmin, ProtectedUser } from './components/protected/Protected'
import AdminFeatures from './features/Admin'
import CartFeatures from './features/cart'
import ProductFeature from './features/Products'
import UserFeatures from './features/User'
import LayoutApp from './layout/LayoutApp'
import { SocketProvider } from './contexts/socketContext'
import SocketClient from './SocketClient'
import { useEffect } from 'react'
import { getCart } from './redux/cartSlice'
import { getNotifyUser } from './redux/notifySlice'
import { getListAddress } from './redux/userSlice'

function App() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.currentUser)
  const isShowModal = useSelector((state) => state.user.isShowModalLogin)
  const isloggedIn = !!loggedInUser._id
  useEffect(() => {
    if (isloggedIn && loggedInUser.role !== 'admin') {
      dispatch(getCart())
    }
  }, [dispatch, loggedInUser])
  useEffect(() => {
    if (isloggedIn && loggedInUser.role !== 'admin') {
      dispatch(getNotifyUser())
    }
  }, [dispatch, loggedInUser])
  useEffect(() => {
    if (isloggedIn && loggedInUser.role !== 'admin') {
      dispatch(getListAddress())
    }
  }, [dispatch, loggedInUser])
  return (
    <SocketProvider user={loggedInUser}>
      <div className="App">
        {isloggedIn && <SocketClient></SocketClient>}
        {!isloggedIn && <ModalAuth open={isShowModal} />}
        <Outlet />
        <Routes>
          <Route
            path="/*"
            element={
              <LayoutApp>
                <ProductFeature></ProductFeature>
              </LayoutApp>
            }
          ></Route>
          <Route
            path="/customer/*"
            element={
              <ProtectedUser isloggedIn={isloggedIn}>
                <LayoutApp>
                  <UserFeatures></UserFeatures>
                </LayoutApp>
              </ProtectedUser>
            }
          ></Route>
          <Route
            path="/checkout/*"
            element={
              <ProtectedUser isloggedIn={isloggedIn}>
                <LayoutApp>
                  <CartFeatures></CartFeatures>
                </LayoutApp>
              </ProtectedUser>
            }
          ></Route>
          <Route
            path="/admin/*"
            element={
              <ProtectedAdmin
                isloggedIn={isloggedIn}
                isAdmin={loggedInUser.role}
              >
                <AdminFeatures />
              </ProtectedAdmin>
            }
          ></Route>
        </Routes>
      </div>
    </SocketProvider>
  )
}

export default App
