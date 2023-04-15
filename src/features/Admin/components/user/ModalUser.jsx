import { Close } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  styled,
  Typography,
  Zoom,
} from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '../form-control/InputField'
import SelectField from '../form-control/SelectField'
import userApi from '@/api/axiosUser'
import { toast } from 'react-toastify'
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
    alignItems: 'center',
    '.MuiDialog-paper': {
      color: theme.palette.back1.main,
      padding: 0,
      display: 'flex',
      fontSize: '0.875rem',
      minWidth: '400px',
      '.MuiFormHelperText-root': {
        marginBottom: 0,
      },
      p: {
        marginBottom: '16px',
      },
      '.item': {
        marginBottom: '16px',
      },
      '.btn': {
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
}))

const ModalUser = ({ open, item, setOpen, setUser, getUsers, setPage }) => {
  const schema = yup.object().shape({
    fullName: !!item?._id && yup.string().required('Không được bỏ trống'),
    email: yup
      .string()
      .required('Không được bỏ trống')
      .email('Email không hợp lệ'),
    password:
      !item?._id &&
      yup
        .string()
        .min(6, 'Mật khẩu tối thiểu 6 kí tự')
        .required('Vui lòng nhập mật khẩu'),
    firstName: !item?._id && yup.string().required('Không được bỏ trống'),
    lastName: !item?._id && yup.string().required('Không được bỏ trống'),
    passwordConfirm:
      !item?._id &&
      yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau'),
  })
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      fullName: item.fullName || '',
      email: item.email || '',
      role: item.role || '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const handleSubmit = async (values) => {
    const clone = { ...values }
    for (const key in values) {
      if (!values[key]) {
        delete clone[key]
      }
    }
    if (!item._id) {
      try {
        const res = await userApi.register(clone)
        console.log(res.data.data)
        setOpen(false)
        setPage((pre) => 0)
        toast.success('Thêm người dùng thành công')
        getUsers()
      } catch (error) {
        toast.error(error.message, {
          position: 'top-center',
        })
      }
    } else {
      try {
        const res = await userApi.updateUser(clone, item._id)
        setOpen(false)
        setPage((pre) => 0)
        toast.success('Cập nhập người dùng thành công')
        getUsers()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <ModalStyled
      TransitionComponent={Transition}
      open={open}
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Typography>
          {!!item?._id ? 'Cập nhập Người Dùng' : 'Thêm Người dùng'}
        </Typography>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {!!item?._id ? (
            <Box className="item">
              Nhập Họ tên:
              <InputField
                form={form}
                name="fullName"
                variant="outlined"
              ></InputField>
            </Box>
          ) : (
            <>
              <Box className="item">
                Nhập họ:
                <InputField
                  form={form}
                  name="firstName"
                  variant="outlined"
                ></InputField>
              </Box>
              <Box className="item">
                Nhập tên:
                <InputField
                  form={form}
                  name="lastName"
                  variant="outlined"
                ></InputField>
              </Box>
            </>
          )}
          <Box className="item">
            Nhập Email:
            <InputField
              form={form}
              type="email"
              name="email"
              variant="outlined"
              disabled={item?._id ? true : false}
            ></InputField>
          </Box>
          {!item?._id && (
            <>
              <Box className="item">
                Nhập mật khẩu:
                <InputField
                  form={form}
                  type="password"
                  name="password"
                  variant="outlined"
                ></InputField>
              </Box>
              <Box className="item">
                Xác nhận mật khẩu:
                <InputField
                  form={form}
                  type="password"
                  name="passwordConfirm"
                  variant="outlined"
                ></InputField>
              </Box>
            </>
          )}
          <Box className="item">
            Phân quyền:
            <SelectField
              form={form}
              name="role"
              arr={['user', 'admin']}
            ></SelectField>
          </Box>
          <Box className="btn">
            <button>{!!item?._id ? 'Cập nhập' : 'Thêm'}</button>
          </Box>
        </form>
      </DialogContent>
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
          setUser({})
        }}
      >
        <Close sx={{ width: '25px', height: '25px' }} />
      </IconButton>
    </ModalStyled>
  )
}

export default ModalUser
