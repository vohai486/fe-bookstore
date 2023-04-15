import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import FormAddress from './FormAddress'
import useAccordion from '@/hooks/useAccordion'

const AddAddress = () => {
  const { show, setShow, nodeRef } = useAccordion()
  return (
    <Box
      sx={{
        marginBottom: '.85rem',
      }}
    >
      <Box
        className="add-address"
        ref={nodeRef}
      >
        <AddOutlinedIcon></AddOutlinedIcon>
        Thêm địa chỉ mới
      </Box>
      {show && (
        <Paper elevation={0}>
          <FormAddress setShow={setShow} />
        </Paper>
      )}
    </Box>
  )
}

export default AddAddress
