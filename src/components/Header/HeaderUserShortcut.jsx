import {
  Badge,
  Box,
  Menu,
  MenuItem,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useDispatch, useSelector } from 'react-redux'
import {
  getListAddress,
  logout,
  setListAddressLogout,
  showModalLogin,
} from '@/redux/userSlice'
import useHover from '@/hooks/useHover'
import { getCountUnReadUser, quantityProductOfCart } from '@/hooks/useSelector'
import { getCart, setCartLogOut } from '@/redux/cartSlice'
import {
  getNotifyUser,
  markRead,
  setListNotifyUserLogout,
} from '@/redux/notifySlice'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import useClickOutSide from '@/hooks/useClickOutSide'
import { unwrapResult } from '@reduxjs/toolkit'
import { setListOrderMyLogout } from '@/redux/orderSlice'

const BoxWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
}))
const BoxItem = styled(Box)(({ theme }) => ({
  color: theme.palette.third.main,
  padding: '0.5rem 1rem',
  [theme.breakpoints.down(450)]: {
    padding: '.5rem',
  },
  display: 'flex',
  alignItems: 'center',
  borderRadius: '5px',
  cursor: 'pointer',
  gap: '0.5rem',
  fontSize: '14px',
  '&:hover': {
    zIndex: 5,
    backgroundColor: 'rgba(39, 39, 42, 0.12)',
  },
  '&.account-info': {
    position: 'relative',
    '.item-hover': {
      color: theme.palette.black3.main,
      width: '240px',
      padding: '0.625rem 0',
      position: 'absolute',
      top: '100%',
      right: 0,
      [theme.breakpoints.down(450)]: {
        right: '-150%',
      },
      ul: {
        li: {
          padding: '.5rem 1rem',

          '&:hover': {
            backgroundColor: theme.palette.white1.main,
          },
        },
      },
    },
  },
}))
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    color: 'white',
  },
}))
const HeaderUserShortcut = () => {
  const theme = useTheme()
  const loggedInUser = useSelector((state) => state.user.currentUser)
  const isShowModal = useSelector((state) => state.user.isShowModalLogin)
  const { show, setShow, nodeRef: boxRef } = useClickOutSide()
  const listNotifyUser = useSelector((state) => state.notify.listNotifyUser)
  const { hovered, nodeRef } = useHover()
  const isBreakpointDown940 = useMediaQuery(theme.breakpoints.down(940))
  const isBreakpointDown680 = useMediaQuery(theme.breakpoints.down(680))
  const navigate = useNavigate()
  const isloggedIn = !!loggedInUser._id
  const dispatch = useDispatch()

  const handleUserInfo = (event) => {
    if (!isloggedIn) {
      dispatch(showModalLogin())
    }
  }
  const handleCart = () => {
    if (!isloggedIn) {
      dispatch(showModalLogin())
    } else {
      navigate('/checkout/cart')
    }
  }
  const handleLogout = () => {
    navigate('/')
    dispatch(setListOrderMyLogout())
    dispatch(setListAddressLogout())
    dispatch(setCartLogOut())
    dispatch(logout())
    dispatch(setListNotifyUserLogout())
  }
  const handleToggleMark = async (id, isRead, url) => {
    try {
      navigate(url)
      if (!isRead) {
        const data = await dispatch(markRead({ id, type: 'user' }))
        unwrapResult(data)
      }
    } catch (error) {}
  }
  return (
    <BoxWrapper>
      <BoxItem
        onClick={() => {
          if (!isloggedIn) {
            dispatch(showModalLogin())
          } else {
            setShow(!show)
          }
        }}
        ref={boxRef}
        // sx={{ position: 'relative' }}
      >
        <StyledBadge
          badgeContent={+useSelector(getCountUnReadUser) || 0}
          color="badge"
        >
          <NotificationsOutlinedIcon />
        </StyledBadge>
        {!isBreakpointDown940 && <span>Thông báo</span>}

        {show && (
          <Paper
            sx={{
              position: 'absolute',
              width: '350px',
              right: '25%',
              padding: '.5rem 0',
              top: '100%',
              maxHeight: '400px',
              overflowY: 'scroll',
              zIndex: 3,
              [theme.breakpoints.down(940)]: {
                right: '10%',
              },
              [theme.breakpoints.down(680)]: {
                right: '30%',
              },
              [theme.breakpoints.down(600)]: {
                right: '15%',
              },
              [theme.breakpoints.down(500)]: {
                right: '5%',
              },
              [theme.breakpoints.down(400)]: {
                right: '0',
                width: '100%',
              },
            }}
            elevation={2}
          >
            {listNotifyUser.length > 0 &&
              listNotifyUser.map((item) => (
                <Box
                  sx={{
                    borderBottom: '1px solid #EFEFEF',
                    padding: '.5rem',
                    '&:hover': {
                      background: '#eee',
                    },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  key={item._id}
                  onClick={() =>
                    handleToggleMark(item._id, item.isRead, item.url)
                  }
                >
                  <Box>{item.text}</Box>
                  {!item.isRead && (
                    <Box
                      sx={{
                        color: '#0B74E5',
                      }}
                    >
                      <FiberManualRecordIcon />
                    </Box>
                  )}
                </Box>
              ))}
            {listNotifyUser.length === 0 && (
              <Box sx={{ padding: '.5rem' }}>Bạn chưa có tin nhắn nào</Box>
            )}
          </Paper>
        )}
      </BoxItem>
      <BoxItem
        onClick={(e) => handleUserInfo(e)}
        ref={nodeRef}
        className="account-info"
      >
        <InsertEmoticonOutlinedIcon />
        {!isBreakpointDown940 && <span>Tài Khoản</span>}
        {isloggedIn && hovered && (
          <Paper
            className="item-hover"
            elevation={2}
          >
            <ul>
              <NavLink to="/customer/account">
                <li>Thông tin tài khoản</li>
              </NavLink>
              <NavLink to="/customer/order">
                <li>Đơn hàng của tôi</li>
              </NavLink>

              <li onClick={() => handleLogout()}>Đăng xuất</li>
            </ul>
          </Paper>
        )}
      </BoxItem>
      <BoxItem onClick={(e) => handleCart()}>
        <StyledBadge
          badgeContent={+useSelector(quantityProductOfCart) || 0}
          color="badge"
        >
          <ShoppingCartOutlinedIcon />
        </StyledBadge>
        {!isBreakpointDown940 && <span>Giỏ hàng</span>}
      </BoxItem>
    </BoxWrapper>
  )
}

export default HeaderUserShortcut
