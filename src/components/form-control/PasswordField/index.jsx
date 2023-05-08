import React, { useState } from 'react'
import { Box, styled, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

const BoxMain = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  '.input-field': {
    width: '100%',
    '.MuiInput-root': {
      '&:before': {
        borderBottom: '1px solid rgb(224, 224, 224)',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'rgb(224, 224, 224)',
        borderWidth: '1px',
      },
    },
    input: {
      fontSize: '0.875rem',
      color: theme.palette.back1.main,
    },
  },
  '.box-toggle': {
    fontWeight: 300,
    position: 'absolute',
    right: 0,
    bottom: '10%',
    fontSize: '0.875rem',
    color: theme.palette.blue2.main,
    cursor: 'pointer',
  },
}))
const PasswordField = ({ form, name, placeholder }) => {
  const [show, setShow] = useState(false)
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <Box sx={{ width: '100%' }}>
          <BoxMain>
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              value={value}
              placeholder={placeholder}
              className="input-field"
              variant="standard"
              type={show ? 'text' : 'password'}
              error={invalid}
            ></TextField>
            <Box
              className="box-toggle"
              onClick={() => setShow(!show)}
            >
              {show ? 'Ẩn' : 'Hiện'}
            </Box>
          </BoxMain>
          <Box
            sx={{
              height: '1.25rem',
            }}
          >
            {invalid && (
              <Typography
                sx={{ fontSize: '0.875rem' }}
                color="red1.main"
              >
                {error?.message}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    ></Controller>
  )
}

export default PasswordField
