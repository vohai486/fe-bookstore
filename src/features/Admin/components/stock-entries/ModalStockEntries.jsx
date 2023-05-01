import { Close } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  styled,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '../form-control/InputField'
import SelectField from '../form-control/SelectField'
import userApi from '@/api/axiosUser'
import { toast } from 'react-toastify'
import bookApi from '@/api/axiosBook'
import stockApi from '@/api/axiosStock'
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom
      timeout={500}
      ref={ref}
      {...props}
    />
  )
})
const ModalStyled = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-container': {
    '.MuiDialog-paper': {
      minWidth: '400px',
      color: theme.palette.back1.main,
      fontSize: '0.875rem',
      '.heading': {
        padding: '1rem 1.5rem',
        p: {
          fontSize: '1.25rem',
        },
      },

      '.form': {
        padding: '0 24px 20px',
        '.btn': {
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          button: {
            border: 'none',
            width: '200px',
            height: '36px',
            background: theme.palette.blue1.main,
            color: theme.palette.background.main,
          },
        },
      },
    },
  },
}))

const ModalStockEntries = ({
  open,
  item,
  setOpen,
  setCurrentItem,
  getInputs,
}) => {
  const controller = new AbortController()

  const theme = useTheme()
  const schema = yup.object().shape({
    qty: yup.number().min(1, 'Phải lớn hơn 0').required('Không được bỏ trống'),
    price: yup
      .number()
      .min(1, 'Phải lớn hơn 0')
      .required('Không được bỏ trống'),
    book: yup.string().required('Không được bỏ trống'),
  })
  const form = useForm({
    defaultValues: {
      qty: item?.qty || 0,
      price: item?.price || 0,
      book: item?.book?._id || '',
      supplier: item?.supplier || '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const handleSubmit = async (values) => {
    try {
      if (!!item._id) {
        const res = await stockApi.updateImport(item._id, values)
        toast.success('Cập nhập hàng thành công')
      } else {
        const res = await stockApi.createImport({ list: [values] })
        toast.success('Nhập hàng thành công')
      }
      setOpen(false)
      getInputs()
      setCurrentItem({})
    } catch (error) {}
  }
  const [listBook, setListBook] = useState()
  useEffect(() => {
    ;(async () => {
      try {
        setTimeout(() => {
          controller.abort()
        }, 5000)
        const res = await bookApi.getAll(
          { limit: 100, fields: 'name' },
          controller.signal
        )
        setListBook(res.data.data)
      } catch (error) {}
    })()
  }, [])
  return (
    <ModalStyled
      TransitionComponent={Transition}
      open={open}
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box className="heading">
        <Typography>Nhập hàng</Typography>
      </Box>
      <form
        className="form"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <SelectField
          form={form}
          arr={listBook}
          type={2}
          name="book"
        ></SelectField>
        {form.formState.errors['book'] && (
          <Box
            sx={{
              color: theme.palette.red3.main,
            }}
          >
            Vui lòng chọn
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: '20px', margin: '1rem 0' }}>
          <Box>
            <Box>Số lượng</Box>
            <InputField
              form={form}
              type="number"
              name="qty"
              variant="outlined"
            ></InputField>
          </Box>
          <Box>
            <Box>Giá tiền</Box>
            <InputField
              form={form}
              type="number"
              name="price"
              variant="outlined"
            ></InputField>
          </Box>
        </Box>
        <Box>Nhà cung cấp</Box>
        <InputField
          form={form}
          type="text"
          name="supplier"
          variant="outlined"
        ></InputField>
        <Box className="btn">
          <button> {!!item._id ? 'Cập nhập' : 'Nhập hàng'}</button>
        </Box>
      </form>
      <IconButton
        sx={{
          position: 'absolute',
          right: '0',
          top: '0',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
          },
        }}
        onClick={() => {
          setOpen(false)
          setCurrentItem({})
        }}
      >
        <Close sx={{ width: '25px', height: '25px' }} />
      </IconButton>
    </ModalStyled>
  )
}

export default ModalStockEntries
