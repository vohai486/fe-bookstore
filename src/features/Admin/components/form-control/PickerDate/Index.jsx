import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box, styled } from '@mui/material'
import { Controller } from 'react-hook-form'

const BoxMain = styled(Box)(({ theme }) => ({
  width: '100%',
  '.MuiFormControl-root': {
    width: '100%',
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
      // "&.Mui-error fieldset": {
      //   border: "2px solid",
      //   borderColor: "#d32f2f",
      // },
      input: {
        color: theme.palette.black.main,
        fontSize: '0.875rem',
        padding: '0.5rem 0.75rem',
      },
    },
  },
}))
const PickerDate = ({ name, form, type = 'all' }) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <BoxMain>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat={type === 'all' ? 'dd-MM-yyyy' : 'yyyy'}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              views={type === 'all' ? ['year', 'month', 'day'] : ['year']}
            />
          </LocalizationProvider>
        </BoxMain>
      )}
    />
  )
}

export default PickerDate
