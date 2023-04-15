import { createSelector } from '@reduxjs/toolkit'

const cartItemsSelector = (state) => state.cart.listCart
const listAddressSelector = (state) => state.user.listAddress
const listAdminNotify = (state) => state.notify.listNotifyAdmin
const listUserNotify = (state) => state.notify.listNotifyUser

export const quantityProductOfCart = createSelector(
  cartItemsSelector,
  (listCart) => listCart.length
)
export const checkAllChecked = createSelector(cartItemsSelector, (listCart) =>
  listCart.every((item) => item.checked)
)
export const getListIdChecked = createSelector(cartItemsSelector, (listCart) =>
  listCart.reduce((newarr, item) => {
    if (item.checked) {
      newarr.push(item.product._id)
    }
    return newarr
  }, [])
)
export const getListChecked = createSelector(cartItemsSelector, (listCart) =>
  listCart.filter((item) => item.checked)
)
export const calculatorTotalPrice = createSelector(
  cartItemsSelector,
  (listCart) =>
    listCart.reduce((sum, item) => {
      if (item.checked) {
        sum += +item.qty * item.product.price
      }
      return sum
    }, 0)
)
export const calculatorSavePrice = createSelector(
  cartItemsSelector,
  (listCart) =>
    listCart.reduce(
      (sum, item) => {
        if (item.checked) {
          sum += +item.qty * (item.product.original_price - item.product.price)
        }
        return sum
      },

      0
    )
)
export const getAddressDefault = createSelector(
  listAddressSelector,
  (listAddress) => listAddress.find((item) => item.default) || listAddress[0]
)

export const getCountUnRead = createSelector(
  listAdminNotify,
  (listAdmin) => listAdmin.filter((item) => !item.isRead).length
)
export const getCountUnReadUser = createSelector(
  listUserNotify,
  (listUser) => listUser.filter((item) => !item.isRead).length
)

// Count number of products in cart
// export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
//   cartItems.reduce((count, item) => count + item.quantity, 0)
// );

// Calculate total of cart
// export const cartTotalSelector = createSelector(cartItemsSelector, (cartItems) =>
//   cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
// );
