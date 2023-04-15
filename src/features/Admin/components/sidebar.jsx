import { Box, Divider, Paper, styled } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const BoxMain = styled(Paper)(({ theme }) => ({
  width: '250px',
  '.sidebar-item': {
    borderBottom: `1px solid ${theme.palette.gray1.main}`,
    a: {
      display: 'block',
      padding: '.5rem 1rem',
      '&.active': {
        backgroundColor: theme.palette.white1.main,
      },
    },
  },
}))

const list = [
  { to: '/admin', label: 'Tồn kho' },
  { to: '/admin/stock-entries', label: 'Nhập hàng' },
  { to: '/admin/products', label: 'Sách' },
  { to: '/admin/orders', label: 'Đơn Hàng' },
  { to: '/admin/chat', label: 'Tin nhắn' },
  { to: '/admin/users', label: 'Người dùng' },
]

const Sidebar = () => {
  return (
    <BoxMain elevation={0}>
      {list.map((item) => (
        <Box
          className="sidebar-item"
          key={item.to}
        >
          <NavLink
            to={item.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.label}
          </NavLink>
        </Box>
      ))}
    </BoxMain>
  )
}

export default Sidebar
