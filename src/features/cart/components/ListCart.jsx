import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useDispatch, useSelector } from 'react-redux'
import ItemCart from './ItemCart'
import {
  checkAllChecked,
  getListIdChecked,
  quantityProductOfCart,
} from '@/hooks/useSelector'
import cartApi from '@/api/axiosCart'
import { getCart, handItemCheck, setAllChecked } from '@/redux/cartSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const BoxMain = styled(Box)(({ theme }) => ({
  '.MuiFormControlLabel-root': {
    marginLeft: 0,
  },
  '.MuiButtonBase-root': {
    padding: 0,
    marginLeft: 0,
  },
  span: {
    fontSize: '0.875rem',
    marginRight: '.5rem',
  },
}))
const BoxHeading = styled(Paper)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '7.5fr 3.5fr 3fr 2.5fr .5fr',
  alignItems: 'center',
  fontSize: '0.875rem',
  color: theme.palette.back1.main,
  padding: '.5rem 1rem',
}))
const BoxList = styled(Paper)(({ theme }) => ({
  padding: '1.5rem 0',
  maxHeight: '500px',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}))
const ListCart = () => {
  const theme = useTheme()
  const isBreakpointDown780 = useMediaQuery(theme.breakpoints.down(780))
  const dispatch = useDispatch()
  const listCart = useSelector((state) => state.cart.listCart)
  const isAllChecked = useSelector(checkAllChecked)
  const listIdChecked = useSelector(getListIdChecked)
  const quantity = useSelector(quantityProductOfCart)
  const handleItemChecked = (check, id) => {
    dispatch(handItemCheck({ check, id }))
  }

  const handleAllChecked = () => {
    dispatch(setAllChecked(isAllChecked))
  }
  const handleRemoveItemChecked = async () => {
    if (listIdChecked.length === 0) return
    try {
      await cartApi.remove({
        bookIdList: listIdChecked,
      })
      const list = await dispatch(getCart())
      unwrapResult(list)
    } catch (error) {}
  }

  return (
    <BoxMain>
      {!isBreakpointDown780 && (
        <BoxHeading elevation={0}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleAllChecked}
                checked={isAllChecked || false}
              />
            }
            label={`Tất cả (${quantity} sản phẩm)`}
          ></FormControlLabel>
          <span>Đơn giá</span>
          <span>Số lượng</span>
          <span>Thành tiền</span>
          <span
            className="icon-trash"
            onClick={() => handleRemoveItemChecked()}
          >
            <DeleteOutlineOutlinedIcon />
          </span>
        </BoxHeading>
      )}

      <Box className="height-10px"></Box>
      <BoxList elevation={0}>
        {listCart?.length > 0 &&
          listCart.map((item) => (
            <Box key={item._id}>
              <ItemCart
                item={item}
                handleItemChecked={handleItemChecked}
              />
            </Box>
          ))}
      </BoxList>
      <Box className="height-10px"></Box>
    </BoxMain>
  )
}

export default ListCart
