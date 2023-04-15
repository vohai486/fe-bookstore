import {
  Avatar,
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import RedeemIcon from '@mui/icons-material/Redeem'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getImage } from '@/utils/common'
const BoxSidebar = styled(Box)(({ theme }) => ({
  maxWidth: '250px',
  flexShrink: 0,
  marginRight: '1rem',
  p: {
    fontSize: '13px',
  },
  [theme.breakpoints.down(600)]: {
    display: 'flex',
    flexDirection: 'column',
    // width: '100%',
    maxWidth: '100%',
  },
  '.account-info': {
    paddingLeft: '7px',
    color: theme.palette.black2.main,
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    marginBottom: '0.75rem',
    '.info': {
      fontSize: '1rem',
    },
  },
  '.account-option': {
    color: theme.palette.gray2.main,
    fontWeight: 300,
    fontSize: '13px',
    svg: {
      color: theme.palette.gray3.main,
    },
    a: {
      '&.active': {
        backgroundColor: theme.palette.white1.main,
      },
      gap: '1.5rem',
      padding: '7px 12px',
      display: 'flex',
      alignItems: 'center',
    },
    [theme.breakpoints.down(600)]: {
      display: 'flex',
      marginBottom: '1rem',
      // justifyContent: 'center',
    },
  },
}))
const Sidebar = () => {
  const theme = useTheme()
  const isBreakpointDown1078 = useMediaQuery(theme.breakpoints.down(1078))
  const isBreakpointDown600 = useMediaQuery(theme.breakpoints.down(600))

  const user = useSelector((state) => state.user.currentUser)
  return (
    <BoxSidebar>
      <Box className="account-info">
        <Avatar
          src={user.avatar ? getImage('users', user.avatar) : ''}
        ></Avatar>
        {!isBreakpointDown1078 && (
          <Box>
            <Typography>Tài khoản của</Typography>
            <Typography className="info">{user.fullName}</Typography>
          </Box>
        )}
        {isBreakpointDown600 && (
          <Typography
            className="info"
            sx={{ marginLeft: '.5rem' }}
          >
            {user.fullName}
          </Typography>
        )}
      </Box>
      <ul className="account-option">
        {[
          {
            to: '/customer/account',
            label: 'Thông tin tài khoản',
            icon: <PersonIcon />,
          },
          {
            to: '/customer/notify',
            label: 'Thông báo của tôi',
            icon: <NotificationsIcon />,
          },
          {
            to: '/customer/order',
            label: 'Quản lý đơn hàng',
            icon: <RedeemIcon />,
          },
        ].map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.icon}
              {!isBreakpointDown1078 && <Typography> {item.label} </Typography>}
            </NavLink>
          </li>
        ))}
      </ul>
    </BoxSidebar>
  )
}

export default Sidebar
