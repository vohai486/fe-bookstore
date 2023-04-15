import { Box, Paper, styled, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderItem from './orderItem'
import { getListOrderMy } from '@/redux/orderSlice'
const BoxMain = styled(Box)(({ theme }) => ({
  '.info-title': {
    color: theme.palette.gray2.main,
    fontSize: '1rem',
  },
  fontSize: '0.875rem',
  '.nav-tab': {
    display: 'flex',
    cursor: 'pointer',
    flexWrap: 'wrap',
    justifyContent: 'center',

    div: {
      color: theme.palette.third.main,
      padding: '0.75rem 0',
      textAlign: 'center',
      // width: '20%',
      minWidth: '150px',

      '&.active': {
        color: theme.palette.blue2.main,
        borderBottom: `1px solid ${theme.palette.blue2.main}`,
      },
    },
  },
  '.list-order': {
    maxHeight: '700px',
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))
const ListOrder = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState(1)
  const listOrders = useSelector((state) => state.order.listOrderMy)
  const filterListOrders = listOrders.filter((item) => {
    if (status !== 1) {
      return item.status === status
    }
    return true
  })
  useEffect(() => {
    ;(async () => {
      const list = await dispatch(getListOrderMy())
      unwrapResult(list)
    })()
  }, [])
  return (
    <BoxMain>
      <Typography variant="h2">Đơn hàng của tôi</Typography>
      <Paper
        className="nav-tab"
        elevation={0}
      >
        <Box
          className={status === 1 ? 'active' : ''}
          onClick={() => {
            setStatus(1)
          }}
        >
          Tất cả đơn
        </Box>
        <Box
          className={status === 2 ? 'active' : ''}
          onClick={() => {
            setStatus(2)
          }}
        >
          Đang xử lý
        </Box>
        <Box
          className={status === 3 ? 'active' : ''}
          onClick={() => {
            setStatus(3)
          }}
        >
          Đang vận chuyển
        </Box>
        <Box
          className={status === 4 ? 'active' : ''}
          onClick={() => {
            setStatus(4)
          }}
        >
          Đã giao
        </Box>
        <Box
          className={status === 5 ? 'active' : ''}
          onClick={() => {
            setStatus(5)
          }}
        >
          Đã hủy
        </Box>
      </Paper>
      <Box className="height-10px"></Box>
      <Box className={`list-order`}>
        {filterListOrders.length > 0 &&
          filterListOrders.map((item) => (
            <Box key={item._id}>
              <OrderItem item={item}></OrderItem>
            </Box>
          ))}
      </Box>
    </BoxMain>
  )
}

export default ListOrder
