import * as React from 'react'

import { Autocomplete, Stack, TextField, styled, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'

const SelectStyled = styled('select')(({ theme }) => ({
  width: '100%',
  fontSize: '0.875rem',
  color: theme.palette.back1.main,
  borderColor: 'rgb(224, 224, 224)',
  padding: '0.5rem',
  borderRadius: '.25rem',
}))

const SelectField = ({
  form,
  name,
  placeholder,
  arr = [],
  type = 1,
  setFiled = () => {},
}) => {
  const theme = useTheme()
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <SelectStyled
          placeholder={placeholder}
          onBlur={onBlur}
          value={value}
          onChange={(e) => {
            if (setFiled) {
              setFiled(
                e.target.options[e.target.selectedIndex].getAttribute('code')
              )
            }
            onChange(e.target.value)
          }}
          style={{
            borderColor: error ? theme.palette.red3.main : '',
            borderWidth: error ? '2px' : '1px',
          }}
        >
          <option value="">{placeholder}</option>
          {arr.length > 0 &&
            arr.map((item, i) => (
              <option
                key={i}
                value={
                  type === 1 ? item : type === 2 ? item._id : item.categoryId
                }
                code={item._id}
              >
                {type === 1
                  ? item
                  : item.name?.length > 45
                  ? `${item.name.slice(0, 39)}...`
                  : item.name}
              </option>
            ))}
        </SelectStyled>
      )}
    ></Controller>
  )
}

export default SelectField
