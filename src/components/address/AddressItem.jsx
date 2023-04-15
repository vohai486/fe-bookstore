import { Box, Paper, styled } from '@mui/material'
import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FormAddress from './FormAddress'
import { handleSpecificAddress } from '@/utils/common'
import useAccordion from '@/hooks/useAccordion'
const BoxMain = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  marginBottom: '.85rem',
  color: theme.palette.black.main,
  fontSize: '13px',
  right: {
    marginLeft: 'auto',
  },
  '.address, .phone': {
    span: {
      color: theme.palette.gray.main,
    },
  },
  '.name': {
    marginBottom: '.5rem',
    textTransform: 'uppercase',
    display: 'flex',
    '.address-default': {
      fontSize: '0.75rem',
      marginLeft: '.75rem',
      display: 'flex',
      alignItems: 'center',
      textTransform: 'none',
      gap: '.25rem',
      color: theme.palette.green.main,
      svg: {
        fontSize: '.875rem',
      },
    },
  },
  '.action': {
    marginTop: '.5rem',
    '.btn': {
      padding: '.5rem 1rem',
      border: 'none',
      '&.btn-edit': {
        backgroundColor: theme.palette.background.main,
        color: theme.palette.blue2.main,
      },
      '&.btn-delete': {
        backgroundColor: theme.palette.background1.main,
        color: theme.palette.red2.main,
      },
    },
  },

  '.accordion': {
    transition: 'all 10s',
  },
}))

const AddressItem = ({ item, key }) => {
  const { show, setShow, nodeRef } = useAccordion()
  return (
    <Box key={key}>
      <BoxMain
        elevation={0}
        ref={nodeRef}
      >
        <Box className="name">
          {item.fullName}
          {item.default && (
            <Box className="address-default">
              <CheckCircleOutlineIcon />
              Địa chỉ mặc định
            </Box>
          )}
        </Box>
        <Box className="address">
          <span>Địa chỉ: </span>
          {handleSpecificAddress(
            item.street,
            item.ward,
            item.district,
            item.city
          )}
        </Box>
        <Box className="phone">
          <span>Điện thoại: </span>
          {item.phoneNumber}
        </Box>
      </BoxMain>
      {show && (
        <Paper elevation={0}>
          <FormAddress
            setShow={setShow}
            address={item}
            typeSubmit="update"
          />
        </Paper>
      )}
    </Box>
  )
}

export default AddressItem
