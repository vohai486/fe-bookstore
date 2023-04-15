import React from 'react'
import { Box, styled, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputStyled = styled(TextField)(({ theme }) => ({
  width: '100%',
  // MuiInput-root
  '.MuiInput-underline': {
    '&:before': {
      borderBottom: '1px solid rgb(224, 224, 224)',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'rgb(224, 224, 224)',
      borderWidth: '1px',
    },
  },
  '.MuiOutlinedInput-root': {
    fieldset: {
      borderColor: 'rgb(224, 224, 224)',
    },
    '&:hover fieldset': {
      border: '1px solid',
      borderColor: 'rgb(224, 224, 224)',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid',
      borderColor: '#1976d2',
    },
    '&.Mui-error fieldset': {
      border: '2px solid',
      borderColor: '#d32f2f',
    },
  },
  input: {
    fontSize: '0.875rem',
    color: theme.palette.back1.main,
  },
}))
const InputField = ({
  form,
  name,
  placeholder,
  variant = 'standard',
  type = 'text',
  disabled = false,
}) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <Box sx={{ width: '100%', position: 'relative' }}>
          <InputStyled
            disabled={disabled}
            onBlur={onBlur}
            value={type === 'number' ? +value : value}
            onChange={(e) => {
              onChange(
                type === 'number' ? +e.target.value || 0 : e.target.value
              )
            }}
            className="input-field"
            variant={variant}
            placeholder={placeholder}
            error={invalid}
            helperText={error?.message}
            type={type}
            // variant="outlined"
            // type="email"
            sx={{
              input: {
                padding: '.625rem 0.75rem .625rem 0',
                paddingLeft: variant === 'standard' ? 0 : '.75rem',
              },
            }}
          />
        </Box>
      )}
    ></Controller>
  )
}

export default InputField
