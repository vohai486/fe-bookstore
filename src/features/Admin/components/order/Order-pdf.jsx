import { Box, Typography } from '@mui/material'
import { useReactToPrint } from 'react-to-print'
import React, { useRef } from 'react'
import { formatPriceVND, handleSpecificAddress } from '@/utils/common'
import dayjs from 'dayjs'

const OrderPDF = ({ order }) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      <Box
        sx={{
          textAlign: 'right',
          marginBottom: '1rem',
          button: {
            border: 'none',
            color: '#333',
            background: '#fdd835',
            padding: '.5rem 1rem',
          },
        }}
      >
        <button onClick={handlePrint}>In hóa đơn</button>
      </Box>
      <Box
        sx={{
          display: 'none',
        }}
      >
        <Box
          ref={componentRef}
          sx={{
            color: '#333',
            fontWeight: 500,
            padding: '2rem 1rem',
            fontSize: '.875rem',
            width: '600px',
            margin: '2rem auto',
            border: '1px dashed',
            table: {
              width: '100%',
              border: '1px solid black',
              borderCollapse: 'collapse',
              th: {
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: '.5rem',
                '&.name': {
                  width: '50%',
                },
              },
              td: {
                border: '1px solid black',
                borderCollapse: 'collapse',
                textAlign: 'center',
                padding: '.5rem',
                '&.name': {
                  textAlign: 'left',
                },
              },
            },
          }}
        >
          <Box
            sx={{
              fontSize: '20px',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            Hóa đơn bán hàng
          </Box>
          <Box
            sx={{
              textAlign: 'right',
              marginBottom: '.5rem',
            }}
          >
            Ngày đặt: {dayjs(order.createdAt).format('MM/DD/YYYY - h:mm A')}
          </Box>
          <Box
            sx={{
              textAlign: 'left',
              marginBottom: '.5rem',
            }}
          >
            Tên Khách hàng: {order.shippingAddress?.fullName}
          </Box>
          <Box
            sx={{
              textAlign: 'left',
              marginBottom: '1rem',
            }}
          >
            Địa chỉ:{' '}
            {handleSpecificAddress(
              order.shippingAddress?.street,
              order.shippingAddress?.ward,
              order.shippingAddress?.district,
              order.shippingAddress?.city
            )}
          </Box>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th className="name">Tên sản phẩm</th>
                <th>SL</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td className="name">{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{formatPriceVND(item.price)}</td>
                  <td>{formatPriceVND(item.price * item.qty)}</td>
                </tr>
              ))}

              <tr>
                <td colSpan={4}>Phí ship</td>
                <td>{formatPriceVND(order.shippingPrice)}</td>
              </tr>
              <tr>
                <td colSpan={4}>Tổng cộng</td>
                <td>{formatPriceVND(order.totalPrice)}</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  )
}

export default OrderPDF
