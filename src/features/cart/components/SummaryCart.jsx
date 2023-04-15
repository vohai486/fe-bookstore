import {
  calculatorSavePrice,
  calculatorTotalPrice,
  getAddressDefault,
} from '@/hooks/useSelector'
import { formatPriceVND, handleSpecificAddress } from '@/utils/common'
import { Box, Drawer, Paper, styled } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BoxMain = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
  '.summary-address': {
    color: theme.palette.third.main,
    padding: '1rem',
    '.block-header': {
      marginBottom: '0.75rem',
      display: 'flex',
      alignsItem: 'center',
      justifyContent: 'space-between',
      h3: {
        fontWeight: 400,
      },
      span: {
        color: theme.palette.blue1.main,
      },
    },
    '.customer-info': {
      color: theme.palette.first.main,
      fontWeight: 600,
    },
    '.address': {
      '.address-type': {
        fontWeight: 500,
        fontSize: '0.75rem',
        padding: '.5rem 0',
        marginRight: '.5rem',
        borderRadius: '1rem',
        height: '1rem',
        backgrounColor: theme.palette.green.main,
        color: theme.palette.green.main,
      },
    },
  },
  '.summary-price': {
    '.prices': {
      padding: '1rem 1.25rem',
      '.price-item': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: theme.palette.black2.main,
        // marginBottom: "0.75rem",
        fontWeight: 300,
      },
    },
    '.prices-total': {
      padding: '1rem 1.25rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '.price-text': {
        color: theme.palette.first.main,
      },
      '.price-value': {
        color: theme.palette.red1.main,
        fontSize: '1.25rem',
      },
    },
  },
  button: {
    width: '100%',
    height: '44px',
    color: theme.palette.background.main,
    backgroundColor: theme.palette.red1.main,
    border: 0,
    borderRadius: '.25rem',
    '&.disabled': {
      opacity: 0.8,
      cursor: 'not-allowed',
    },
  },
}))
const SummaryCart = ({ toggleDrawer }) => {
  const totalPrice = useSelector(calculatorTotalPrice)
  const savePrice = useSelector(calculatorSavePrice)
  const addressDefault = useSelector(getAddressDefault)
  const navigate = useNavigate()
  return (
    <BoxMain>
      <Paper
        className="summary-address"
        elevation={0}
      >
        <Box className="block-header">
          <h3>Giao tới</h3>
          <span
            style={{ cursor: 'pointer' }}
            onClick={toggleDrawer(true)}
          >
            Thay đổi
          </span>
        </Box>
        {addressDefault?.fullName && (
          <Box className="customer-info">
            {addressDefault?.fullName} | {addressDefault?.phoneNumber}
          </Box>
        )}

        <Box className="address">
          <span className="address-type">
            {addressDefault?.delivery_address_type_name &&
              (addressDefault?.delivery_address_type_name === 'home'
                ? 'Nhà'
                : 'Công ty')}
          </span>
          {handleSpecificAddress(
            addressDefault?.street,
            addressDefault?.ward,
            addressDefault?.district,
            addressDefault?.city
          )}
        </Box>
      </Paper>
      <Box className="height-10px"></Box>
      <Paper
        className="summary-price"
        elevation={0}
      >
        <Box className="prices">
          {/* <Box className="price-item">
            <span className="price-text">Tạm tính</span>
            <span className="price-value">36.80</span>
          </Box> */}
          <Box className="price-item">
            <span className="price-text">Tiết kiệm</span>
            <span className="price-value">{formatPriceVND(savePrice)}</span>
          </Box>
        </Box>
        <Box className="box-border prices-total">
          <span className="price-text">Tổng tiền</span>
          <span className="price-value">{formatPriceVND(totalPrice)}</span>
        </Box>
      </Paper>
      <Box className="height-10px"></Box>
      <button
        onClick={() => {
          if (totalPrice === 0 || !addressDefault?._id) {
            return
          }
          navigate('/checkout/payment')
        }}
        className={totalPrice === 0 || !addressDefault?._id ? 'disabled' : ''}
      >
        Đặt hàng
      </button>
    </BoxMain>
  )
}

export default SummaryCart
