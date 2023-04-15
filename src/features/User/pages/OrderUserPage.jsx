import { Box, Paper, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import OrderDetails from '../components/orderUser/OrderDetails'
import ListOrder from '../components/orderUser/ListOrder'
const BoxMain = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
}))
const OrderUserPage = () => {
  return (
    <BoxMain>
      <Routes>
        <Route
          index
          element={<ListOrder />}
        ></Route>
        <Route
          path="/:id"
          element={<OrderDetails></OrderDetails>}
        ></Route>
      </Routes>
    </BoxMain>
  )
}

export default OrderUserPage
