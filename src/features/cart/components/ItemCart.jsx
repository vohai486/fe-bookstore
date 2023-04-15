import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import QuantityField from '@/components/form-control/QuantityField'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice, formatPriceVND, getImage } from '@/utils/common'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import cartApi from '@/api/axiosCart'
import { getCart } from '@/redux/cartSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { NavLink } from 'react-router-dom'
const BoxMain = styled(Box)(({ theme }) => ({
  padding: '0 1rem',
  display: 'grid',
  cursor: 'pointer',
  marginBottom: '1rem',
  alignItems: 'center',
  gridTemplateColumns: '7.5fr 3.5fr 3fr 2.5fr .5fr',
  [theme.breakpoints.down(567)]: {
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  [theme.breakpoints.down(780)]: {
    gridTemplateColumns: '7fr 3fr',
  },

  color: theme.palette.back1.main,
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  span: {
    fontSize: '13px',
  },
  '.cart-image': {
    display: 'flex',
    alignItems: 'center',
    img: {
      width: '5rem',
      height: '5rem',
      objectFit: 'cover',
      marginRight: '1rem',
    },
  },
  '.cart-price': {
    '.price-real': {
      fontWeight: 500,
    },
    '.price-discount': {
      fontSize: '11px',
      color: theme.palette.gray.main,
      textDecoration: 'line-through',
    },
  },
  '.cart-name': {
    display: '-webkit-box',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': '3',
    overflow: 'hidden',
    marginRight: '1rem',
    '&:hover': {
      color: theme.palette.blue1.main,
    },
  },
  '.final-price': {
    fontWeight: 500,
    color: theme.palette.red1.main,
  },
}))

const ItemCart = ({ item, handleItemChecked }) => {
  const theme = useTheme()
  const isBreakpointDown780 = useMediaQuery(theme.breakpoints.down(780))
  const dispatch = useDispatch()
  const onUpdate = async (value) => {
    try {
      await cartApi.update({
        qty: value,
        bookId: item.product._id,
      })
      const list = dispatch(getCart())
      unwrapResult(list)
    } catch (error) {}
  }
  const schema = yup.object().shape({
    qty: yup
      .number()
      .min(1, 'Minimum value is 1')
      .max(
        item.product.countInStock || 0,
        item.product.countInStock > 0
          ? `Số lượng còn lại của sản phẩm là ${item.product.countInStock || 0}`
          : 'Đã hết hàng'
      ),
  })
  const form = useForm({
    defaultValues: {
      qty: item.qty,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const handleDeleteItem = async (value) => {
    try {
      await cartApi.remove({
        bookIdList: [value],
      })
      const list = await dispatch(getCart())
      unwrapResult(list)
    } catch (error) {}
  }
  return (
    <BoxMain
      className="cart-item"
      key={item._id}
    >
      <Box className="cart-image">
        <Checkbox
          checked={item.checked}
          onChange={(e) => handleItemChecked(e.target.checked, item._id)}
        />
        <img
          src={getImage('books', item.product.thumbnail_url)}
          alt=""
        />
        <span className="cart-name">
          <NavLink to={`/${item.product._id}`}>{item.product.name}</NavLink>{' '}
        </span>
      </Box>
      {isBreakpointDown780 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            [theme.breakpoints.down(452)]: {
              flexDirection: 'column',
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
              [theme.breakpoints.down(567)]: {
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              },
            }}
          >
            <Box
              className="cart-price"
              sx={{
                [theme.breakpoints.down(404)]: {
                  display: 'flex',
                  flexDirection: 'column',
                },
              }}
            >
              <span className="price-real">
                {formatPriceVND(item.product.price)}
              </span>
              <span className="price-discount">
                {item.product.price !== item.product.original_price &&
                  formatPriceVND(item.product.original_price)}
              </span>
            </Box>
            <QuantityField
              form={form}
              name="qty"
              size="small"
              onUpdate={onUpdate}
            />
            <span className="final-price">
              {formatPriceVND(item.product.price * form.getValues('qty'))}
            </span>
          </Box>
          <span
            className="icon-trash"
            onClick={() => handleDeleteItem(item.product._id)}
          >
            <DeleteOutlineOutlinedIcon />
          </span>
        </Box>
      )}
      {!isBreakpointDown780 && (
        <>
          <Box className="cart-price">
            <span className="price-real">
              {formatPriceVND(item.product.price)}
            </span>
            <span className="price-discount">
              {item.product.price !== item.product.original_price &&
                formatPriceVND(item.product.original_price)}
            </span>
          </Box>
          <QuantityField
            form={form}
            name="qty"
            size="small"
            onUpdate={onUpdate}
          />
          <span className="final-price">
            {formatPriceVND(item.product.price * form.getValues('qty'))}
          </span>
          <span
            className="icon-trash"
            onClick={() => handleDeleteItem(item.product._id)}
          >
            <DeleteOutlineOutlinedIcon />
          </span>
        </>
      )}
    </BoxMain>
  )
}

export default ItemCart
