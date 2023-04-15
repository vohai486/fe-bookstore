import { Box, Grid, styled, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import DetailsChat from '../components/chat/DetailsChat'
import SiderbarChat from '../components/chat/SiderbarChat'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getListUserChat } from '@/redux/chatSlice'
import { unwrapResult } from '@reduxjs/toolkit'
const BoxMain = styled(Box)(({ theme }) => ({
  fontSize: '.875rem',
  color: theme.palette.black.main,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'center',
}))
const ChatAdminPage = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      const list = await dispatch(getListUserChat())
      unwrapResult(list)
    })()
  }, [dispatch])

  return (
    <BoxMain>
      <Grid
        spacing={4}
        container
        sx={{
          width: '850px',
          height: '700px',
        }}
      >
        <Grid
          item
          xs={4}
          sx={{ height: '100%' }}
        >
          <SiderbarChat />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ height: '100%' }}
        >
          <Routes>
            <Route
              path="/:id"
              element={<DetailsChat />}
            ></Route>
          </Routes>
        </Grid>
      </Grid>
    </BoxMain>
  )
}

export default ChatAdminPage
