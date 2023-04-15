import orderApi from '@/api/axiosOrder'
import { useSocket } from '@/contexts/socketContext'
import { createNotifyUser } from '@/redux/notifySlice'
import { formatPriceVND, handleSpecificAddress } from '@/utils/common'
import { Box, Grid, Paper, Typography, styled } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import OrderPDF from './Order-pdf'
import notifyApi from '@/api/axiosNotify'
const handleStatus = (status) => {
  if (status === 2) {
    return 'Đang chờ xác nhận'
  }
  if (status === 3) {
    return 'Đang vận chuyển'
  }
  if (status === 4) {
    return 'Giao hàng thành công'
  }
  if (status === 5) {
    return 'Đã hủy'
  }
}
const BoxMain = styled(Box)(({ theme }) => ({
  padding: '1rem 2rem',
  h2: {
    marginBottom: '.5rem',
  },
  '.order-product': {
    display: 'grid',
    gridTemplateColumns: '5fr 1fr 3fr 1fr',
    borderBottom: `1px solid ${theme.palette.white1.main}`,
    '.item': {
      padding: '1rem .5rem',
      textAlign: 'left',
      '&.right': {
        textAlign: 'right',
      },
      '&.price': {
        padding: '0 .5rem',
      },
      '.btn': {
        padding: '.5rem 1rem',
        border: 'none',
        borderRadius: '.25rem',
        '&.btn-success': {
          backgroundColor: theme.palette.green.main,
          color: theme.palette.background.main,
        },
        '&.btn-confirm': {
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.back1.main,
        },
      },
    },
  },
  '.order-price': {},
}))
const OrderDetails = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const [order, setOrder] = useState({})
  const { socket } = useSocket()
  useEffect(() => {
    ;(async () => {
      const res = await orderApi.getDetail(id)
      setOrder(res.data.data)
    })()
  }, [id])
  const totalPrice = order.orderItems?.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const handleUpdate = async () => {
    try {
      let res = null
      if (order.status === 2) {
        res = await orderApi.updateStatus(order._id, {
          status: order.status + 1,
        })
      } else {
        res = await orderApi.delivered(order._id)
      }
      toast.success('Cập nhập trạng thái thành công')
      const { user, _id } = res.data.data
      if (!res) {
        return
      }
      const notify = await notifyApi.add({
        user,
        text: `Đơn hàng ${_id} của bạn ${
          order.status === 2
            ? 'đã được xác nhận và đang trên đường vận chuyển'
            : 'đã hoàn thành. Bạn hãy đánh giá sản phẩm nhé!!'
        }`,
        url: `/customer/order/${_id}`,
      })
      socket &&
        socket.emit('orderUserNotify', {
          notify: notify.data.data,
          data: res.data.data,
        })
      setOrder(res.data.data)
    } catch (error) {}
  }

  return (
    <BoxMain>
      <Box sx={{ textAlign: 'center', margin: '1rem 0', fontSize: '1.5rem' }}>
        Chi tiết đơn hàng {order._id?.toString()} - {handleStatus(order.status)}
      </Box>
      <OrderPDF order={order} />
      <Box sx={{ textAlign: 'right', marginBottom: '1rem' }}>
        Ngày đặt hàng : {dayjs(order.createdAt).format('MM/DD/YYYY - h:mm A')}
      </Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={5}
        >
          <Typography variant="h2">Địa chỉ người nhận</Typography>
          <Paper
            sx={{ padding: 3 }}
            elevation={0}
          >
            <Box>
              <strong>Tên người nhận: </strong>
              {order.shippingAddress?.fullName}
            </Box>
            <Box>
              <strong>Địa chỉ: </strong>
              {handleSpecificAddress(
                order.shippingAddress?.street,
                order.shippingAddress?.ward,
                order.shippingAddress?.district,
                order.shippingAddress?.city
              )}
            </Box>
            <Box>
              {' '}
              <strong>Điện thoại: </strong> {order.shippingAddress?.phoneNumber}
            </Box>
          </Paper>
          <Box className="height-1rem"></Box>
          <Typography variant="h2">Hình thức thanh toán</Typography>
          <Paper
            sx={{ padding: 3 }}
            elevation={0}
          >
            Thanh toán khi nhận hàng
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
        >
          <Typography variant="h2">Sản phẩm</Typography>
          <Paper elevation={0}>
            <Box className="order-product">
              <Box className="item">Sản phẩm</Box>
              <Box className="item">Giá</Box>
              <Box className="item">Số lượng</Box>
              <Box className="item right">Tạm tính</Box>
            </Box>
            {order.orderItems?.map((item) => (
              <Box
                key={item._id}
                className="order-product"
              >
                <Box className="item">{item.name}</Box>
                <Box className="item">{item.price}</Box>
                <Box className="item">{item.qty}</Box>
                <Box className="item right">
                  {formatPriceVND(item.price * item.qty)}
                </Box>
              </Box>
            ))}
            <Box
              className="order-product"
              sx={{ paddingTop: '1rem' }}
            >
              <Box className="item"></Box>
              <Box className="item"></Box>
              <Box className="item price">Tạm tính</Box>
              <Box className="item price right">
                {formatPriceVND(totalPrice)}
              </Box>
              <Box className="item"></Box>
              <Box className="item"></Box>
              <Box className="item price">Phí vận chuyển</Box>
              <Box className="item price right">
                {formatPriceVND(order.shippingPrice)}
              </Box>
              <Box className="item">
                {(order.status === 2 || order.status === 3) && (
                  <button
                    className={`btn  ${
                      order.status === 2 ? 'btn-confirm' : 'btn-success'
                    }`}
                    onClick={() => handleUpdate()}
                  >
                    {order.status === 2
                      ? 'Xác nhận đơn hàng'
                      : 'Giao hàng thành công'}
                  </button>
                )}
              </Box>
              <Box className="item"></Box>
              <Box className="item price">Tổng cộng</Box>
              <Box className="item price right">
                {formatPriceVND(order.totalPrice)}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </BoxMain>
  )
}

export default OrderDetails
