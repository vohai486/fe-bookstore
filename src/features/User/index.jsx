import BreadcrumbComponent from '@/components/Breadcrumbs/Breadcrumbs'
import { getMe } from '@/redux/userSlice'
import { Box, Grid, Paper, styled } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar'
import EditUserPage from './pages/EditUserPage'
import OrderUserPage from './pages/OrderUserPage'
import NotifyUserPage from './pages/NotifyUserPage'

const BoxCotent = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: theme.palette.black.main,
  h2: {
    margin: '.25rem 0 .75rem',
  },
  [theme.breakpoints.down(600)]: {
    flexDirection: 'column',
  },
}))
const UserFeatures = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      const user = await dispatch(getMe())
      unwrapResult(user)
    })()
  }, [dispatch])
  return (
    <Box>
      <BreadcrumbComponent title="Thông tin người dùng" />
      <BoxCotent>
        <Sidebar className="sidebar"></Sidebar>
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/account"
              element={<EditUserPage></EditUserPage>}
            ></Route>
            <Route
              path="/order/*"
              element={<OrderUserPage></OrderUserPage>}
            ></Route>
            <Route
              path="/notify"
              element={<NotifyUserPage></NotifyUserPage>}
            ></Route>
          </Routes>
        </Box>
      </BoxCotent>
    </Box>
  )
}

export default UserFeatures
