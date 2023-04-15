import Login from '@/features/Auth/components/Login'
import Register from '@/features/Auth/components/Register'
import { Close } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Modal,
  styled,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideModalLogin } from '@/redux/userSlice'
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom
      timeout={500}
      ref={ref}
      {...props}
    />
  )
})
const ModalStyled = styled(DialogContent)(({ theme }) => ({
  color: theme.palette.back1.main,
  padding: 0,
  display: 'flex',
  fontSize: '0.875rem',
  [theme.breakpoints.down(600)]: {
    fontSize: '1rem',
  },
  '.modal-login-left': {
    width: '500px',
    padding: '40px 45px 24px',
    [theme.breakpoints.down(600)]: {
      padding: '1rem 1.5rem',
    },
    h1: {
      fontWeight: 500,
      marginBottom: '0.5rem',
    },
    '.heading-sub': {
      fontSize: '0.875rem',
      marginBottom: '.25rem',
    },
    '.btn-submit': {
      margin: '2rem 0',
      width: '100%',
      border: '1px solid transparent',
      borderRadius: '.25rem',
      padding: '13px 0',
      color: theme.palette.background.main,
      background: theme.palette.red1.main,
      fontWeight: 400,
    },
    '.create-account': {
      cursor: 'pointer',
      color: theme.palette.gray.main,
      span: {
        color: theme.palette.blue2.main,
      },
    },
  },
  '.modal-login-right': {
    width: '300px',
    [theme.breakpoints.down(900)]: {
      display: 'none',
    },
    background:
      'linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      width: '203px',
      height: '203px',
    },
  },
}))
const STATUS = {
  LOGIN: 'login',
  REGISTER: 'register',
}
const ModalAuth = ({ open }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [status, setStatus] = useState(STATUS.LOGIN)
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
      // sx={{
      //   [theme.breakpoints.down(900)]: {
      //     width: '500px',
      //   },
      // }}
    >
      <ModalStyled>
        <Box className="modal-login-left">
          {status === STATUS.REGISTER && (
            <ArrowBackIosNewIcon
              onClick={() => setStatus(STATUS.LOGIN)}
              sx={{ marginBottom: '.5rem' }}
            />
          )}
          {status === STATUS.LOGIN && <Login />}
          {status === STATUS.REGISTER && (
            <Register onClose={() => setStatus(STATUS.LOGIN)} />
          )}
          {status === STATUS.LOGIN && (
            <p
              className="create-account"
              onClick={() => setStatus(STATUS.REGISTER)}
            >
              Chưa có tài khoản? <span>Tạo tài khoản</span>
            </p>
          )}
        </Box>
        <Box className="modal-login-right">
          <img
            src="/login.png"
            alt=""
          />
        </Box>
      </ModalStyled>
      <IconButton
        sx={{
          position: 'absolute',
          right: '0',
          top: '0',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
          },
        }}
        onClick={() => {
          setStatus(STATUS.LOGIN)
          dispatch(hideModalLogin())
        }}
      >
        <Close sx={{ width: '25px', height: '25px' }} />
      </IconButton>
    </Dialog>
  )
}

export default ModalAuth
