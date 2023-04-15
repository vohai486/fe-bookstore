import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Paper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ListCart from '../components/ListCart'
import SummaryCart from '../components/SummaryCart'
import ListAddress from '@/components/address/ListAddress'

const BoxMain = styled(Box)(({ theme }) => ({
  color: theme.palette.back1.main,
  '.main-title': {
    color: theme.palette.black.main,
    padding: '1.25rem 0',
    h2: {
      fontWeight: 500,
    },
  },
  '.icon-trash': {
    color: theme.palette.gray.main,
    '&:hover': {
      color: theme.palette.back1.main,
    },
  },
}))
const BoxNoCart = styled(Box)(({ theme }) => ({
  padding: '2rem 1rem',
  width: '100%',
  background: theme.palette.background.main,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '.empty-img': {
    width: '160px',
    marginBottom: '1rem',
  },
  p: {
    fontSize: '0.875rem',
    marginBottom: '2rem',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    border: 0,
    width: '200px',
    height: '36px',
    color: theme.palette.black.main,
    background: theme.palette.warning.main,
  },
}))

const CartPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsOpen(open)
  }
  const theme = useTheme()
  const isBreakpointDown1040 = useMediaQuery(theme.breakpoints.down(1040))
  const listCart = useSelector((state) => state.cart.listCart)
  const navigate = useNavigate()
  return (
    <BoxMain>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: '400px',
            padding: '.5rem',
            position: 'relative',
            [theme.breakpoints.down(420)]: {
              width: '350px',
            },
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '0',
              right: 0,
            }}
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>
          <ListAddress size="big" />
        </Box>
      </Drawer>
      <Box className="main-title">
        <Typography variant="h2">GIỎ HÀNG </Typography>
      </Box>
      {listCart?.length > 0 ? (
        <Grid container>
          <Grid
            item
            xs={12}
            md={!isBreakpointDown1040 ? 9 : 12}
            sx={{ paddingRight: isBreakpointDown1040 ? 0 : '1rem' }}
          >
            <ListCart></ListCart>
          </Grid>
          <Box className="height-10px"></Box>
          <Grid
            item
            xs={12}
            md={!isBreakpointDown1040 ? 3 : 12}
          >
            <SummaryCart toggleDrawer={toggleDrawer} />
          </Grid>
        </Grid>
      ) : (
        <BoxNoCart>
          <Box className="empty-img">
            <img
              src="/no-cart.png"
              alt=""
            ></img>
          </Box>
          <Typography>Không có sản phẩm nào trong giỏ hàng của bạn.</Typography>
          <button onClick={() => navigate('/')}>Tiếp tục mua sắm</button>
        </BoxNoCart>
      )}
    </BoxMain>
  )
}

export default CartPage
