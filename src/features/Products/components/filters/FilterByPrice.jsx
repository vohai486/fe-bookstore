import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Input,
  Rating,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
const BoxMain = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(900)]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '.5rem',
  },
}))
const BoxPrice = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
  alignItems: 'center',

  span: {
    width: '20px',
    height: '1px',
    fontSize: 0,
    background: 'rgb(154, 154, 154)',
    display: 'inline-block',
  },
  marginBottom: theme.spacing(2),
  '& + button': {
    fontSize: '0.75rem',
    fontWeight: 400,
    textTransform: 'capitalize',
  },
}))
const FilterByPrice = ({ onChange, price = '' }) => {
  const theme = useTheme()
  const [values, setValues] = useState({
    gte: '',
    lte: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    const result = value.replace(/\D/g, '')
    setValues({ ...values, [name]: result })
  }
  const handleSubmit = () => {
    console.log(1)
    const isvalid =
      +values.gte < 0 ||
      (!values.gte && !values.lte && +values.gte > +values.lte)
    if (isvalid || !onChange) return
    const result = `${values.gte},${values.lte}`
    onChange('price', result)
    setValues({ gte: '', lte: '' })
  }
  // useEffect(() => {
  //   const [gte, lte] = price.split(',')
  //   const formatGte = +gte?.toLocaleString('it-IT', {
  //     style: 'currency',
  //     currency: 'đ',
  //   })
  // }, [price])

  return (
    <BoxMain className="box-border box__filter">
      <Typography
        variant="h4"
        sx={{
          [theme.breakpoints.down(900)]: {
            textAlign: 'center',
          },
        }}
      >
        Giá
      </Typography>
      <span>Chọn khoảng giá</span>
      <BoxPrice>
        <TextField
          variant="standard"
          value={values.gte}
          name="gte"
          onChange={handleChange}
        />
        <span> - </span>
        <TextField
          variant="standard"
          value={values.lte}
          name="lte"
          onChange={handleChange}
        />
      </BoxPrice>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleSubmit}
        sx={{
          [theme.breakpoints.down(900)]: {
            width: '50%',
          },
        }}
      >
        Áp dụng
      </Button>
    </BoxMain>
  )
}

export default FilterByPrice
