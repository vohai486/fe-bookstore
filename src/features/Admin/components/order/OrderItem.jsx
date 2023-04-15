import { handleSpecificAddress } from '@/utils/common'
import { Box, TableCell, styled, tableCellClasses } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
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
const OrderItem = ({ item, handleCancel }) => {
  const navigate = useNavigate()
  // onClick={() => navigate(`/admin/orders/${item._id}`)}
  return (
    <>
      <StyledTableCell
        component="th"
        scope="row"
      >
        {item._id}
      </StyledTableCell>
      <StyledTableCell>{handleStatus(item.status)}</StyledTableCell>
      <StyledTableCell>{item?.shippingAddress?.fullName}</StyledTableCell>
      <StyledTableCell>
        {handleSpecificAddress(
          item.shippingAddress?.street,
          item.shippingAddress?.ward,
          item.shippingAddress?.district,
          item.shippingAddress?.city
        )}
      </StyledTableCell>
      <StyledTableCell>{item.shippingAddress?.phoneNumber}</StyledTableCell>
      <StyledTableCell>
        {dayjs(item.createdAt).format('MM/DD/YYYY - h:mm A')}
      </StyledTableCell>
      <StyledTableCell>
        <Box sx={{ cursor: 'pointer' }}>
          <NavLink to={`/admin/orders/${item._id}`}>Xem đơn hàng </NavLink>{' '}
          {item.status === 2 && (
            <>
              ||
              <span
                style={{ textDecoration: 'underline' }}
                onClick={() => handleCancel(item._id)}
              >
                {' '}
                Xóa
              </span>
            </>
          )}
        </Box>
      </StyledTableCell>
    </>
  )
}

export default OrderItem
