import {
  Box,
  Grid,
  Paper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import orderApi from '@/api/axiosOrder'
import { formatPriceVND, getImage, handleSpecificAddress } from '@/utils/common'
import dayjs from 'dayjs'

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
  fontSize: '0.875rem',
  color: theme.palette.back1.main,
  h3: {
    fontSize: '1rem',
    marginBottom: '.5rem',
  },
  table: {
    color: theme.palette.back1.main,
    width: '100%',
    'td,th': {
      padding: '.5rem 1.25rem',
    },
    thead: {
      th: {
        color: theme.palette.gray.main,
        fontSize: '15px',
        fontWeight: 300,
        width: '10%',
        textAlign: 'left',
        '&:first-of-type': {
          width: '50%',
        },
        '&:last-of-type': {
          width: '10%',
          textAlign: 'right',
        },
      },
    },

    td: {
      textAlign: 'left',
      '&:last-of-type': {
        textAlign: 'right',
      },
      '&.td-image': {
        div: {
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          img: {
            width: '40px',
            height: '40px',
            objectFit: 'cover',
          },
        },
      },
    },
    tfoot: {
      'tr:first-of-type': {
        td: {
          paddingTop: '2rem',
        },
      },
      td: {
        textAlign: 'right',
      },
    },
  },
}))

const OrderDetails = () => {
  const theme = useTheme()
  const isBreakpointDown945 = useMediaQuery(theme.breakpoints.down(945))

  const [order, setOrder] = useState({})
  const id = useParams().id
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
  return (
    <BoxMain>
      <Typography variant="h2">
        Chi tiết đơn hàng {order._id?.toString()} - {handleStatus(order.status)}
      </Typography>
      <Box sx={{ textAlign: 'right', marginBottom: '1rem' }}>
        Ngày đặt hàng : {dayjs(order.createdAt).format('MM/DD/YYYY - h:mm A')}
      </Box>
      {!!order.isPaid && (
        <Box sx={{ textAlign: 'right', marginBottom: '1rem' }}>
          Thanh toán lúc : {dayjs(order.paidAt).format('MM/DD/YYYY - h:mm A')}
        </Box>
      )}
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          // xs={12}
          container
          spacing={4}
          sx={{ overflow: 'hidden' }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography variant="h3">Địa chỉ người nhận</Typography>
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
                <strong>Điện thoại: </strong>
                {order.shippingAddress?.phoneNumber}
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography variant="h3">Hình thức thanh toán</Typography>
            <Paper
              sx={{ padding: 3, height: '100%' }}
              elevation={0}
            >
              {order.paymentMethod === 'cod'
                ? 'Thanh toán khi nhận hàng'
                : 'Thanh toán qua Paypal'}
            </Paper>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Paper elevation={0}>
            {!isBreakpointDown945 && (
              <table>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems?.map((item) => (
                    <tr key={item._id}>
                      <td className="td-image">
                        <Box>
                          <img
                            src={getImage('books', item.image)}
                            alt=""
                          />
                          {item.name}
                        </Box>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td>{formatPriceVND(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>Tạm tính</td>
                    <td>{formatPriceVND(totalPrice)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>Phí vận chuyển</td>
                    <td>{formatPriceVND(order.shippingPrice)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>Tổng cộng</td>
                    <td>{formatPriceVND(order.totalPrice)}</td>
                  </tr>
                </tfoot>
              </table>
            )}
            {order.orderItems?.map((item) => (
              <Box
                key={item._id}
                sx={{
                  padding: '1rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    img: {
                      width: '40px',
                      height: '40px',
                    },
                  }}
                >
                  <img
                    src={getImage('books', item.image)}
                    alt=""
                  />
                  <Box>
                    <Box> {item.name}</Box>
                    <Box>
                      <span>x{item.qty}</span>
                      <span style={{ marginLeft: '.5rem' }}>
                        {formatPriceVND(item.price)}
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Paper>
          <Box className="height-10px"></Box>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Box>Tạm tính</Box>
            <Box>{formatPriceVND(order.itemsPrice)}</Box>
          </Paper>
          <Box className="height-10px"></Box>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Box>Phí vận chuyển</Box>
            <Box>{formatPriceVND(order.shippingPrice)}</Box>
          </Paper>
          <Box className="height-10px"></Box>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Box>Thành tiền</Box>
            <Box>{formatPriceVND(order.totalPrice)}</Box>
          </Paper>
        </Grid>
      </Grid>
    </BoxMain>
  )
}

export default OrderDetails
