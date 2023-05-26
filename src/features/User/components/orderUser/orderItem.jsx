import { Box, Paper, styled } from '@mui/material'
import React, { useState } from 'react'
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined'
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined'
import { formatPriceVND, generateNameId, getImage } from '@/utils/common'
import { useNavigate } from 'react-router-dom'
import ModalReview from '@/components/modal/ModalReview'
import orderApi from '@/api/axiosOrder'
import ConfirmMsg from '@/components/ConfirmMsg'
import { useDispatch } from 'react-redux'
import { useSocket } from '@/contexts/socketContext'
import { toast } from 'react-toastify'
import notifyApi from '@/api/axiosNotify'
import { getListOrderMy, updateListOrderMy } from '@/redux/orderSlice'
const BoxMain = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  marginBottom: '1.25rem',
  color: theme.palette.third.main,
  fontSize: '0.875rem',
  '.heading': {
    paddingBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '.25rem',
    svg: {
      fontSize: '1rem',
    },
  },
  '.product': {
    padding: '0.75rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(486)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '.detail': {
      display: 'flex',
      gap: '.5rem',
      alignItems: 'center',
      '.detail-image': {
        position: 'relative',
        width: '5rem',
        height: '5rem',
        border: '0.5px solid rgb(238, 238, 238)',
        borderRadius: '.25rem',
        img: {
          height: '100%',
          objectFit: 'cover',
        },
        '.detail-qty': {
          fontSize: '0.75rem',
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '1.5rem',
          height: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(235, 235, 240)',
          borderTopLeftRadius: '.625rem',
        },
      },
      h3: {
        fontSize: '13px',
        color: theme.palette.black.main,
        fontWeight: 300,
      },
    },
    '.price': {
      color: theme.palette.first.main,
      width: '120px',
      textAlign: 'right',
    },
  },
  '.price': {
    paddingTop: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '.price-total': {
      marginBottom: '.5rem',
      fontSize: '1rem',
      '.price-value': {
        marginLeft: '.5rem',
        color: theme.palette.first.main,
      },
    },
    '.price-action': {
      '.btn': {
        padding: '.5rem .75rem',
        fontWeight: 400,
        color: theme.palette.blue1.main,
        border: `1px solid ${theme.palette.blue1.main}`,
        backgroundColor: theme.palette.background.main,
        borderRadius: '.25rem',
        '&.btn-buy': {
          margin: '0 .5rem',
        },
        '&.btn-show': {
          [theme.breakpoints.down(445)]: {
            marginTop: '1rem',
          },
        },
        '&.btn-cancel': {
          backgroundColor: theme.palette.warning.main,
          borderColor: theme.palette.warning.main,
          color: theme.palette.black.main,
        },
      },
    },
  },
}))
const handleStatus = (status) => {
  if (status === 2) {
    return (
      <>
        <HourglassEmptyOutlinedIcon></HourglassEmptyOutlinedIcon>
        Đang chờ xác nhận
      </>
    )
  }
  if (status === 3) {
    return (
      <>
        <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
        Đang vận chuyển
      </>
    )
  }
  if (status === 4) {
    return (
      <>
        <TwoWheelerOutlinedIcon></TwoWheelerOutlinedIcon>
        Giao hàng thành công
      </>
    )
  }
  if (status === 5) {
    return (
      <>
        <DoNotDisturbAltOutlinedIcon></DoNotDisturbAltOutlinedIcon>
        Đã hủy
      </>
    )
  }
}
const OrderItem = ({ item }) => {
  console.log(item)
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [openMsg, setOpenMsg] = useState(false)
  const handleCancel = async () => {
    try {
      const res = await orderApi.cancel(item._id)
      const { _id } = res.data.data
      toast.success('Hủy đơn hàng thành công', {
        position: 'top-center',
        autoClose: 2000,
      })
      setOpenMsg(false)
      const notify = await notifyApi.add({
        text: `Người dùng đã hủy đơn hàng ${_id} !!`,
        url: `/admin/orders/${_id}`,
      })
      socket && socket.emit('orderAdminNotify', notify.data.data)
      dispatch(updateListOrderMy(res.data.data))
    } catch (error) {}
  }
  return (
    <BoxMain elevation={0}>
      <Box className="heading">{handleStatus(item.status)}</Box>
      {item.orderItems.map((ele) => (
        <Box
          className="product box-border"
          key={ele._id}
        >
          <Box className="detail">
            <Box className="detail-image">
              <img
                src={getImage('books', ele.image)}
                alt=""
              ></img>
              <Box className="detail-qty">x{ele.qty}</Box>
            </Box>
            <h3
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/${generateNameId(ele.name, ele.book)}`)}
            >
              {ele.name}
            </h3>
          </Box>
          <Box className="price">{formatPriceVND(ele.price)}</Box>
        </Box>
      ))}

      <Box className="price box-border">
        <Box className="price-total">
          <span className="price-label">Tổng tiền: </span>
          <span className="price-value">{formatPriceVND(item.totalPrice)}</span>
        </Box>
        <Box className="price-action">
          {item.status === 2 && !item.isPaid && (
            <button
              className="btn btn-cancel"
              onClick={() => setOpenMsg(true)}
            >
              Hủy đơn hàng
            </button>
          )}
          {item.status === 4 && (
            <button
              className="btn btn-buy"
              onClick={() => setIsOpen(true)}
            >
              Viết đánh giá
            </button>
          )}

          <button
            className="btn btn-buy"
            onClick={() => navigate(`/`)}
          >
            Mua lại
          </button>
          <button
            className="btn btn-show"
            onClick={() => navigate(`/customer/order/${item._id}`)}
          >
            Xem chi tiết
          </button>
        </Box>
      </Box>
      <ModalReview
        open={isOpen}
        setOpen={setIsOpen}
        list={item.orderItems}
      />
      <ConfirmMsg
        handleDelete={handleCancel}
        title="Bạn muốn hủy đơn hàng không?"
        open={openMsg}
        setOpen={setOpenMsg}
        titleButton={'Hủy đơn hàng'}
      ></ConfirmMsg>
    </BoxMain>
  )
}

export default OrderItem
