import InputField from '@/components/form-control/InputField'
import PasswordField from '@/components/form-control/PasswordField'
import { CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const LoginForm = ({ onSubmit }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Không được bỏ trống')
      .email('Email không hợp lệ'),
    password: yup
      .string()
      .min(6, 'Mật khẩu tối thiểu 6 kí tự')
      .required('Vui lòng nhập mật khẩu'),
  })
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
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
      <Typography variant="h1">Xin chào,</Typography>
      <p className="heading-sub">Nhập email và mật khẩu</p>
      <InputField
        form={form}
        name="email"
        placeholder="abc@gmail.com"
      />
      <div className="height-1rem"></div>
      <PasswordField
        form={form}
        name="password"
        placeholder="Mật khẩu"
      />
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
          'Đăng Nhập'
        )}
      </button>
    </form>
  )
}

export default LoginForm
