import QuantityField from '@/components/form-control/QuantityField'
import { Box, Button, styled, useTheme } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import cartApi from '@/api/axiosCart'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getCart } from '@/redux/cartSlice'
import { showModalLogin } from '@/redux/userSlice'
const BoxMain = styled('form')(({ theme }) => ({
  padding: '1rem 0',
  '.btn-add-to-cart': {
    marginTop: '1rem',
    color: theme.palette.background.main,
    backgroundColor: theme.palette.red2.main,
    width: '300px',
    [theme.breakpoints.down(400)]: {
      width: '100%',
    },
    fontSize: '.875rem',
    height: '3rem',
    borderRadius: '.25rem',
    textTransform: 'unset',
    '&:hover': {
      backgroundColor: theme.palette.red2.main,
      opacity: '.8',
    },
  },
}))
const AddToCartForm = ({ countInStock, id }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.currentUser)
  const isloggedIn = !!loggedInUser._id

  const schema = yup.object().shape({
    qty: yup
      .number()
      .min(1, 'Minimum value is 1')
      .max(
        countInStock || 0,
        countInStock > 0
          ? `Số lượng còn lại của sản phẩm là ${countInStock || 0}`
          : 'Đã hết hàng'
      ),
  })
  const form = useForm({
    defaultValues: {
      qty: 1,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const handleOnSubmit = async (values) => {
    if (!isloggedIn) {
      dispatch(showModalLogin())
    } else {
      values.bookId = id
      try {
        const res = await cartApi.add(values)
        toast.success('Thêm vào giỏ hàng thành công', {
          position: 'top-center',
          autoClose: 1000,
        })
        const list = await dispatch(getCart())
        unwrapResult(list)
      } catch (error) {}
    }
  }

  return (
    <BoxMain
      onSubmit={form.handleSubmit(handleOnSubmit)}
      className="box-border"
    >
      {countInStock === 0 && (
        <Box
          sx={{
            color: theme.palette.red2.main,
          }}
        >
          Đã hết hàng
        </Box>
      )}
      {countInStock !== 0 && (
        <>
          <QuantityField
            name="qty"
            form={form}
            title="Số lượng"
          />
          <Box sx={{ marginTop: '1rem' }}>Còn lại ({countInStock})</Box>
          <Button
            type="submit"
            className="btn-add-to-cart"
            disabled={
              form.formState.errors['qty'] && form.formState.errors.qty?.message
            }
          >
            Chọn Mua
          </Button>
        </>
      )}
    </BoxMain>
  )
}

export default AddToCartForm
