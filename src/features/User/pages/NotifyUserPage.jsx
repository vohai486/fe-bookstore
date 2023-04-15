import { markRead } from '@/redux/notifySlice'
import { Box, styled, Typography, useTheme } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
const BoxMain = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
}))
const NotifyUserPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()
  const listNotifyUser = useSelector((state) => state.notify.listNotifyUser)
  return (
    <BoxMain>
      <Typography variant="h2">Thông báo của tôi</Typography>
      {listNotifyUser.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            height: '400px',
            flexDirection: 'column',
            a: {
              padding: '.5rem 1rem',
              borderRadius: '.25rem',
              color: theme.palette.back1.main,
              background: theme.palette.warning.main,
            },
          }}
        >
          Bạn chưa có thông báo
          <NavLink to="/">Tiếp tục mua sắm</NavLink>
        </Box>
      )}

      {listNotifyUser.length > 0 && (
        <Box
          sx={{
            maxHeight: '500px',
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {listNotifyUser.map((item) => (
            <Box
              key={item._id}
              onClick={async () => {
                if (!item.isRead) {
                  const data = await dispatch(
                    markRead({ id: item._id, type: 'user' })
                  )
                  unwrapResult(data)
                }
                navigate(item.url)
              }}
              sx={{
                cursor: 'pointer',
                marginBottom: '1rem',
                padding: '1rem 2rem',
                border: `1px solid ${theme.palette.white2.main}`,
                '&:hover': {
                  background: theme.palette.white2.main,
                },
                background: !item.isRead && theme.palette.white2.main,
              }}
            >
              {item.text}
            </Box>
          ))}
        </Box>
      )}
    </BoxMain>
  )
}

export default NotifyUserPage
