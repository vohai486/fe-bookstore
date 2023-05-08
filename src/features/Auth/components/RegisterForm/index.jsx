import InputField from '@/components/form-control/InputField'
import PasswordField from '@/components/form-control/PasswordField'
import { CircularProgress, Box, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const RegisterForm = ({ onSubmit }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Không được bỏ trống')
      .email('Email không hợp lệ'),
    password: yup
      .string()
      .min(6, 'Mật khẩu tối thiểu 6 kí tự')
      .required('Vui lòng nhập mật khẩu'),
    firstName: yup.string().required('Không được bỏ trống'),
    lastName: yup.string().required('Không được bỏ trống'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau'),
  })
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values)
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Typography variant="h1">Tạo tài khoản</Typography>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <InputField
          form={form}
          name="firstName"
          placeholder="Họ"
        />
        <InputField
          form={form}
          name="lastName"
          placeholder="Tên"
        />
      </Box>
      <InputField
        form={form}
        name="email"
        type="email"
        placeholder="Email"
      />
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <PasswordField
          form={form}
          name="password"
          placeholder="Mật khẩu"
        />
        <PasswordField
          form={form}
          name="passwordConfirm"
          placeholder="Xác nhận"
        />
      </Box>
      <button
        type="submit"
        className="btn-submit"
      >
        {form.formState.isSubmitting ? (
          <CircularProgress
            size={20}
            thickness={5}
            color="background1"
          />
        ) : (
          'Đăng Kí'
        )}
      </button>
    </form>
  )
}

export default RegisterForm
