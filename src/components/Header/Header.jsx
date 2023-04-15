import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  styled,
  Box,
  useMediaQuery,
  useTheme,
  Paper,
  Badge,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import HeaderUserShortcut from './HeaderUserShortcut'
import HeaderSearch from './HeaderSearch'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/userSlice'
import useClickOutSide from '@/hooks/useClickOutSide'

const AppbarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: '0px 1px 1px rgb(0 0 0 / 12%)',
  height: '3.5rem',
  position: 'relative',
}))
const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '3rem',
  [theme.breakpoints.down(900)]: {
    gap: '1rem',
  },
  [theme.breakpoints.down(680)]: {
    justifyContent: 'space-between',
    gap: 0,
  },
}))
const BoxLogo = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  img: {
    height: '2.5rem',
  },
  [theme.breakpoints.down(680)]: {
    flexGrow: 1,
  },
}))
const BoxAdmin = styled(Box)(({ theme }) => ({
  color: theme.palette.third.main,
  padding: '0.5rem 1rem',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '5px',
  cursor: 'pointer',
  gap: '0.5rem',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: 'rgba(39, 39, 42, 0.12)',
  },
}))
const Header = () => {
  const theme = useTheme()
  const { show, setShow, nodeRef } = useClickOutSide()
  const isBreakpointDown680 = useMediaQuery(theme.breakpoints.down(680))
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.currentUser)
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <AppbarStyled
      position="static"
      color="background"
    >
      <BoxContainer className={'container'}>
        <BoxLogo>
          <Link to="/">
            <img
              src="/sv_header_login.png"
              alt=""
            />
          </Link>
        </BoxLogo>
        {isBreakpointDown680 && <Box></Box>}
        {!isBreakpointDown680 && <HeaderSearch></HeaderSearch>}
        {loggedInUser?.role === 'admin' && (
          <>
            <BoxAdmin>
              <NavLink to="/admin">Admin</NavLink>
            </BoxAdmin>
            <BoxAdmin onClick={() => handleLogout()}>Đăng xuất</BoxAdmin>
          </>
        )}
        {loggedInUser?.role !== 'admin' && (
          <HeaderUserShortcut></HeaderUserShortcut>
        )}

        {isBreakpointDown680 && (
          <IconButton onClick={() => setShow(!show)}>
            <MenuIcon></MenuIcon>
          </IconButton>
        )}
      </BoxContainer>

      {show && (
        <Paper
          elevation={3}
          className="search-box"
          sx={{
            position: 'absolute',
            top: '110%',
            width: '100%',
            border: 'none',
            padding: '1rem',
            zIndex: '3',
          }}
          onClick={() => setShow(true)}
        >
          <HeaderSearch></HeaderSearch>
        </Paper>
      )}
    </AppbarStyled>
  )
}

export default Header
