import { Box, Drawer, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/sidebar'
import OrderAdminPage from './pages/OrderAdminPage'
import ProductsAdminPage from './pages/ProductsAdminPage'
import HeaderAdmin from './components/header'
import UsersAdminPage from './pages/UsersAdminPage'
import { useDispatch } from 'react-redux'
import { getNotifyAdmin } from '@/redux/notifySlice'
import { unwrapResult } from '@reduxjs/toolkit'
import ChatAdminPage from './pages/ChatAdminPage'
import StockEntriesPage from './pages/StockEntriesPage'
import InventoryAdminPage from './pages/InventoryAdminPage'

const AdminFeatures = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsOpen(open)
  }
  useEffect(() => {
    ;(async () => {
      const list = await dispatch(getNotifyAdmin())
      unwrapResult(list)
    })()
  }, [dispatch])
  return (
    <>
      <HeaderAdmin toggleDrawer={toggleDrawer} />
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Sidebar />
      </Drawer>

      <Routes>
        <Route
          path="/orders/*"
          element={<OrderAdminPage />}
        ></Route>
        <Route
          path="/products"
          element={<ProductsAdminPage />}
        ></Route>
        <Route
          path="/users"
          element={<UsersAdminPage />}
        ></Route>
        <Route
          path="/chat/*"
          element={<ChatAdminPage />}
        ></Route>
        <Route
          path="/stock-entries"
          element={<StockEntriesPage />}
        ></Route>
        <Route
          index
          element={<InventoryAdminPage />}
        ></Route>
      </Routes>
    </>
  )
}

export default AdminFeatures
