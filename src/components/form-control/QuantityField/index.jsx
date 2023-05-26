import { Box, Button, IconButton, styled, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Height } from '@mui/icons-material'
import { Controller } from 'react-hook-form'
const BoxForm = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  '.quantity-item': {
    padding: 0,
    border: `1px solid rgb(236, 236, 236)`,
    color: theme.palette.gray.main,
    '&.quantity-input': {
      textAlign: 'center',
      width: '3rem',
      height: '100%',
      color: theme.palette.black.main,
      '&.quantity-input-small': {
        width: '2rem',
      },
    },
    '&.quantity-error': {
      borderWidth: '2px',
      borderColor: theme.palette.red2.main,
    },
  },
  '.text-error': {
    color: theme.palette.red2.main,
    fontSize: '0.75rem',
    fontWeight: 400,
  },
}))
const QuantityField = ({ form, name, title, size = 'big', onUpdate }) => {
  return (
    <Box>
      {title && (
        <Typography
          color="black.main"
          sx={{ marginBottom: '.5rem' }}
        >
          {title}
        </Typography>
      )}
      <Controller
        name={name}
        control={form.control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, error },
        }) => (
          <BoxForm
            sx={{
              display: size === 'big' ? 'flex' : 'block',
              height: size === 'big' ? '2rem' : '1.5rem',
            }}
          >
            <Button
              onClick={(e) => {
                if (+value <= 1) onChange(1)
                else {
                  onChange(+value - 1)
                  if (!!error?.message) {
                    return
                  }

                  onUpdate && !error && onUpdate(+value - 1)
                }
              }}
              className="quantity-item"
              sx={{
                height: size === 'big' ? '2rem' : '1.5rem',
                minWidth: size === 'big' ? '2rem' : '1.5rem',
              }}
            >
              <RemoveIcon />
            </Button>
            <input
              value={value}
              onBlur={(e) => {
                onUpdate && !error && onUpdate(+e.target.value)
              }}
              onChange={(e) => {
                if (e.target.value === 0) {
                  onChange(1)
                } else if (+e.target.value <= 0) {
                  onChange(1)
                } else {
                  onChange(+e.target.value)
                }
              }}
              name={name}
              className={`quantity-item quantity-input ${
                invalid ? 'quantity-error' : ''
              }`}
              type="number"
            ></input>
            <Button
              onClick={(e) => {
                onChange(+value + 1)
                if (!!error?.message) {
                  return
                }
                onUpdate && !error && onUpdate(+value + 1)
              }}
              className="quantity-item"
              sx={{
                height: size === 'big' ? '2rem' : '1.5rem',
                minWidth: size === 'big' ? '2rem' : '1.5rem',
              }}
            >
              <AddIcon />
            </Button>

            {error && (
              <Box
                sx={{
                  padding: '1rem',
                  position: 'relative',
                  zIndex: 6,
                  background: '#fff',
                }}
              >
                <Typography
                  className="text-error"
                  sx={{
                    marginLeft: size === 'big' ? '.5rem' : 0,
                  }}
                >
                  {error.message}
                </Typography>
              </Box>
            )}
          </BoxForm>
        )}
      />
    </Box>
  )
}

export default QuantityField
