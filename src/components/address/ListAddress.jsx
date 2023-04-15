import { Box, styled, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import AddressItem from './AddressItem'
import AddAddress from './AddAddress'
import { useSelector } from 'react-redux'

const BoxMain = styled(Box)(({ theme }) => ({
  padding: '1rem 1rem 1rem 1.5rem',
  [theme.breakpoints.down(831)]: {
    padding: '1rem 0',
  },
  marginBottom: '1rem',
  overflow: 'hidden',
  '.info-title': {
    display: 'inline-block',
    marginBottom: '1rem',
  },
  '.list-address': {
    maxHeight: '100%',
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '.add-address': {
    backgroundColor: theme.palette.background.main,
    border: '1px dashed rgb(216, 216, 216)',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    color: theme.palette.blue1.main,
    svg: {
      color: theme.palette.gray.main,
    },
  },
}))
const ListAddress = (size = 'small') => {
  const theme = useTheme()
  const listAddress = useSelector((state) => state.user.listAddress)
  return (
    <BoxMain
      className="info-right"
      sx={{
        height: size === 'small' ? '600px' : '900px',
      }}
    >
      <span className="info-title">Sổ địa chỉ</span>
      <Box className="list-address">
        <AddAddress />
        {listAddress.length > 0 &&
          listAddress.map((address) => (
            <Box key={address._id}>
              <AddressItem item={address}></AddressItem>
            </Box>
          ))}
      </Box>
    </BoxMain>
  )
}

export default ListAddress
