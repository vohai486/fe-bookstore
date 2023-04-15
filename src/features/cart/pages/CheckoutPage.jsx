import {
  calculatorTotalPrice,
  getAddressDefault,
  getListChecked,
} from '@/hooks/useSelector'
import { formatPriceVND, getImage, handleSpecificAddress } from '@/utils/common'
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useNavigate } from 'react-router-dom'
import orderApi from '@/api/axiosOrder'
import { toast } from 'react-toastify'
import { getCart, updateCart } from '@/redux/cartSlice'
import { useSocket } from '@/contexts/socketContext'
import { createNotifyAdmin } from '@/redux/notifySlice'
import { unwrapResult } from '@reduxjs/toolkit'
import notifyApi from '@/api/axiosNotify'
import { loadScript } from '@paypal/paypal-js'
const BoxMain = styled(Box)(({ theme }) => ({
  color: theme.palette.back1.main,
  fontSize: '0.875rem',

  '.main-title': {
    h2: {
      color: theme.palette.black.main,
      padding: '1.25rem 0',
      fontWeight: 500,
    },
  },
  '.main-error': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '1rem 0',
    padding: '1rem',
    border: '1px solid rgb(255, 184, 188)',
    backgrounColor: 'rgb(255, 240, 241)',
    borderRadius: '.25rem',
    svg: {
      color: 'rgb(255, 184, 188)',
    },
  },
  h3: {
    color: theme.palette.first.main,
    fontSize: '1.125rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
  '.shipping': {
    padding: '1rem',
    color: theme.palette.first.main,

    '.shipping-method': {
      background: 'rgb(240, 248, 255)',
      width: '50%',
      [theme.breakpoints.down(650)]: {
        width: '70%',
      },
      [theme.breakpoints.down(500)]: {
        width: '100%',
      },
      borderRadius: '1rem',
      span: {
        fontSize: '0.875rem',
      },
      padding: '1rem',
    },
  },
  '.list-main': {
    padding: '1rem',
    '.box-1': {
      flex: 5,
    },
    '.box-2': {
      display: 'flex',
      justifyContent: 'center',
      flex: 3,
    },
    '.box-3': {
      display: 'flex',
      justifyContent: 'center',
      flex: 2,
    },
    '.box-4': {
      flex: 2,
      display: 'flex',
      justifyContent: 'center',
    },
    '.card-title': {
      '.box-1': {
        fontSize: '1.125rem',
        color: theme.palette.first.main,
        fontWeight: 500,
      },
      color: theme.palette.gray3.main,
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    '.list-card': {
      '.card-item': {
        padding: '.5rem 0',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(686)]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1rem',
        },
        color: theme.palette.first.main,
        '.box-image': {
          gap: '1rem',
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.third.main,
          '.card-name': {
            display: '-webkit-box',
            '-webkitBoxOrient': 'vertical',
            '-webkitLineClamp': '2',
            overflow: 'hidden',
          },

          img: {
            width: '3rem',
            height: '3rem',
            objectFit: 'cover',
          },
        },
      },
    },
  },
  '.payment-method': {
    color: theme.palette.first.main,
    padding: '1rem',
    '.payment-item': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  '.summary-address': {
    color: theme.palette.third.main,
    padding: '1rem',

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
  '.block-header': {
    marginBottom: '0.75rem',
    display: 'flex',
    alignsItem: 'center',
    justifyContent: 'space-between',
    h3: {
      marginBottom: 0,
      fontWeight: 400,
      fontSize: '1rem',
    },
    span: {
      color: theme.palette.blue1.main,
    },
  },
  '.summary-order': {
    color: theme.palette.black.main,
    padding: '1rem',
    '.more': {
      cursor: 'pointer',
      color: theme.palette.blue1.main,
    },
  },
  '.summary-details': {
    color: theme.palette.black.main,
    '&.hidden': {
      height: 0,
      overflow: 'hidden',
      transition: 'all 150ms cubic-bezier(0.1, 0.7, 0.6, 0.9)',
    },
    '.item': {
      fontSize: '0.75rem',
      padding: '.75rem 1rem',
      display: 'flex',
      justifyContent: 'space-betweem',
      '.item-info': {
        flex: 1,
        display: 'flex',
        '.item-info__qty': {
          width: '30px',
          fontWeight: 500,
        },
        '.item-info__name': {
          width: '150px',
          fontWeight: 300,
        },
      },
      '.item-price': {
        fontWeight: 500,
      },
    },
  },
  '.summary-price': {
    padding: '1rem 1rem 0',
    '.price-item': {
      marginBottom: '.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      '.summary-label': {
        color: theme.palette.third.main,
      },
      '.summary-value': {
        color: theme.palette.first.main,
      },
    },
    '.price-total': {
      padding: '1rem 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '.summary-label': {
        color: theme.palette.first.main,
      },
      '.summary-value': {
        fontSize: '1.25rem',
        fontWeight: 500,
        color: theme.palette.red1.main,
      },
    },
  },
  '.sumary-action': {
    padding: '0 16px 16px',
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
  },
}))
const CheckoutPage = ({}) => {
  const paypalContainer = useRef()
  const theme = useTheme()
  const isBreakpointDown1040 = useMediaQuery(theme.breakpoints.down(1040))
  const isBreakpointDown686 = useMediaQuery(theme.breakpoints.down(686))
  const [listService, setListService] = useState([])
  const [shippingPrice, setShippingPrice] = useState(0)
  const [hidden, setHidden] = useState(true)
  const [isPaid, setIsPaid] = useState(false)
  const [value, setValue] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const { socket } = useSocket()
  const loggedInUser = useSelector((state) => state.user.currentUser)
  const totalPrice = useSelector(calculatorTotalPrice)
  const addressDefault = useSelector(getAddressDefault)
  const listProductChecked = useSelector(getListChecked)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const totalProduct =
    listProductChecked?.length > 0 &&
    listProductChecked.reduce((sum, item) => sum + item.qty, 0)
  useEffect(() => {
    ;(async () => {
      if (!addressDefault?.codeDistrict) return
      const res = await fetch(
        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
        {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            token: 'c65a38bf-b468-11ed-b190-ea4934f9883e',
          },
          body: JSON.stringify({
            from_district: 1462,
            shop_id: 3836107,
            to_district: addressDefault.codeDistrict,
          }),
        }
      )
      const data = await res.json()
      if (data.data.length > 0) {
        setListService(data.data)
        setValue(data.data[0].service_id)
      }
    })()
  }, [addressDefault])
  useEffect(() => {
    ;(async () => {
      if (!value || !addressDefault?.codeDistrict) return
      const res = await fetch(
        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
        {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            token: 'c65a38bf-b468-11ed-b190-ea4934f9883e',
            ShopId: 3836107,
          },
          body: JSON.stringify({
            from_district: 1462,
            service_id: +value,
            service_type_id: null,
            to_district_id: +addressDefault.codeDistrict,
            to_ward_code: +addressDefault.codeWard,
            height: 15,
            length: 40,
            weight: 350 * +totalProduct,
            width: 20,
            insurance_value: 0,
            coupon: null,
          }),
        }
      )
      const data = await res.json()
      setShippingPrice(data.data?.total)
    })()
  }, [value, addressDefault])

  const handleOrder = async () => {
    const orderItems =
      listProductChecked?.length > 0 &&
      listProductChecked.map((item) => ({
        name: item.product.name,
        image: item.product.thumbnail_url,
        price: item.product.price,
        qty: item.qty,
        book: item.product._id,
      }))
    const shippingAddress = { ...addressDefault }
    delete shippingAddress.codeCity
    delete shippingAddress.codeDistrict
    delete shippingAddress.codeWard
    delete shippingAddress.shippingAddress
    try {
      const res = await orderApi.add({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice,
        totalPrice: totalPrice + shippingPrice,
        isPaid,
        paidAt: isPaid ? new Date() : '',
      })
      toast.success(
        `Đơn hàng ${res.data.data._id} đã được đặt thành công! Vui lòng chờ xác nhận!!`,
        { position: 'top-center', autoClose: 2000 }
      )
      const [notifyUser, notifyAdmin] = await Promise.all([
        notifyApi.add({
          user: loggedInUser._id,
          text: `Đơn hàng ${res.data.data._id} của bạn đã đặt thành công`,
          url: `/customer/order/${res.data.data._id}`,
        }),
        notifyApi.add({
          text: `Đơn hàng ${res.data.data._id} đã đặt thành công đang chờ xác nhận!!`,
          url: `/admin/orders/${res.data.data._id}`,
        }),
      ])
      socket && socket.emit('orderAdminNotify', notifyAdmin.data.data)
      navigate('/customer/order')
      dispatch(updateCart(orderItems))
    } catch (error) {}
  }

  const buttons = (price) => {
    return {
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: (price / 30000).toFixed(2),
              },
            },
          ],
        })
      },
      onApprove: function (data, actions) {
        // Thực hiện giao dịch PayPal
        return actions.order.capture().then(function (details) {
          console.log('success')
          setIsPaid(true)
          // Xử lý kết quả giao dịch thành công
        })
      },
    }
  }
  const loadPayPalScript = (price) => {
    loadScript({
      'client-id':
        'AWsQVzVsX8yAElKCrI6mu1Iqr3tfa1UWJ3M1RDbu5sL7P2TtxDUMszkCiRgFeCIhpFLJASaeRICGO06e',
    })
      .then((paypal) => {
        paypal.Buttons(buttons(price)).render('#paypal-container-element')
      })
      .catch((err) => {
        console.error('failed to load the PayPal JS SDK script', err)
      })
  }
  return (
    <BoxMain>
      {listProductChecked.length > 0 ? (
        <Box className="main-title">
          <Typography variant="h2">Checkout</Typography>
        </Box>
      ) : (
        <Box className="main-error">
          <ErrorOutlineIcon /> Giỏ hàng không có sản phẩm. Vui lòng thực hiện
          lại.
        </Box>
      )}

      <Grid container>
        <Grid
          item
          xs={12}
          md={!isBreakpointDown1040 ? 9 : 12}
          sx={{ paddingRight: isBreakpointDown1040 ? 0 : '1rem' }}
        >
          <Paper
            className="shipping"
            elevation={0}
          >
            <h3>Chọn hình thức giao hàng</h3>
            <Box className="shipping-method">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={(e) => {
                    if (isPaid) return
                    setValue(e.target.value)
                  }}
                  value={value}
                >
                  {listService.length > 0 &&
                    listService.map((item, i) => (
                      <FormControlLabel
                        key={item.service_id}
                        value={item.service_id}
                        control={<Radio />}
                        label={item.short_name}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </Paper>
          <Box className="height-10px"></Box>
          <Paper
            elevation={0}
            className="list-main"
          >
            <Box className="card-title">
              <Box className="box-1">Sản phẩm</Box>
              {!isBreakpointDown686 && (
                <>
                  <Box className="box-2">Đơn giá</Box>
                  <Box className="box-3">Số lượng</Box>
                  <Box className="box-4">Thành tiền</Box>
                </>
              )}
            </Box>
            <Box className="list-card">
              {listProductChecked?.length > 0 &&
                listProductChecked.map((item) => (
                  <Box
                    className="card-item"
                    key={item._id}
                  >
                    <Box className="box-1 box-image">
                      <img
                        src={getImage('books', item.product.thumbnail_url)}
                        alt=""
                      />
                      <span className="card-name">{item.product.name}</span>
                    </Box>
                    {isBreakpointDown686 && (
                      <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Box className="box-2">
                          {formatPriceVND(item.product.price)}
                        </Box>
                        <Box className="box-3">{item.qty} </Box>
                        <Box className="box-4">
                          {formatPriceVND(item.product.price * item.qty)}
                        </Box>
                      </Box>
                    )}
                    {!isBreakpointDown686 && (
                      <>
                        <Box className="box-2">
                          {formatPriceVND(item.product.price)}
                        </Box>
                        <Box className="box-3">{item.qty}</Box>
                        <Box className="box-4">
                          {formatPriceVND(item.product.price * item.qty)}
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
            </Box>
          </Paper>
          <Box className="height-10px"></Box>
          <Paper
            elevation={0}
            className="payment-method"
          >
            <h3>Chọn hình thức thanh toán</h3>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(e) => {
                  if (isPaid) return
                  if (
                    e.target.value === 'paypal' &&
                    totalPrice > 0 &&
                    listProductChecked.length > 0 &&
                    !isPaid
                  ) {
                    loadPayPalScript(totalPrice + shippingPrice)
                  }
                  setPaymentMethod(e.target.value)
                }}
                value={paymentMethod}
              >
                {[
                  {
                    value: 'cod',
                    label: 'Thanh toán tiền mặt khi nhận hàng',
                  },
                  {
                    value: 'paypal',
                    label: 'Thanh toán bằng Paypal',
                  },
                ].map((item, i) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={!isBreakpointDown1040 ? 3 : 12}
        >
          <Paper
            className="summary-address"
            elevation={0}
          >
            <Box className="block-header">
              <h3>Giao tới</h3>
              <span>Thay đổi</span>
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
            className="summary-order"
            elevation={0}
          >
            <Box className="block-header">
              <h3>Đơn hàng</h3>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/checkout/cart')}
              >
                Thay đổi
              </span>
            </Box>
            {totalProduct} sản phẩm.{' '}
            <span
              className="more"
              onClick={() => setHidden(!hidden)}
            >
              {' '}
              {hidden ? 'Mở rộng' : 'Thu gọn'}
            </span>
          </Paper>
          <Paper
            className={`summary-details box-border ${hidden ? 'hidden' : ''}`}
            elevation={0}
          >
            {listProductChecked?.length > 0 &&
              listProductChecked?.map((item) => (
                <Box
                  className="item"
                  key={item._id}
                >
                  <Box className="item-info">
                    <Box className="item-info__qty">{item.qty} x</Box>
                    <Box className="item-info__name">{item.product.name}</Box>
                  </Box>
                  <Box className="item-price">
                    {formatPriceVND(item.product.price * item.qty)}
                  </Box>
                </Box>
              ))}
          </Paper>
          <Paper
            className="summary-price box-border"
            elevation={0}
          >
            <Box className="price-item">
              <span className="summary-label">Tạm tính</span>
              <span className="summary-value">
                {formatPriceVND(totalPrice)}
              </span>
            </Box>
            <Box className="price-item">
              <span className="summary-label">Phí ship</span>
              <span className="summary-value">
                {shippingPrice > 0 && formatPriceVND(shippingPrice)}
              </span>
            </Box>
            <Box className="price-total box-border">
              <span className="summary-label">Tổng tiền</span>
              <span
                className="summary-value"
                style={{
                  textDecoration: isPaid ? 'line-through' : 'none',
                }}
              >
                {formatPriceVND(totalPrice + shippingPrice)}
              </span>
            </Box>
          </Paper>
          <Paper
            className="sumary-action"
            elevation={0}
          >
            {(paymentMethod === 'cod' || isPaid) && (
              <button
                className={totalPrice === 0 ? 'disabled' : ''}
                onClick={() => {
                  if (totalPrice === 0) return
                  handleOrder()
                }}
              >
                Đặt hàng
              </button>
            )}
            {paymentMethod === 'paypal' && !isPaid && (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  ref={paypalContainer}
                  id="paypal-container-element"
                ></div>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </BoxMain>
  )
}

export default CheckoutPage
