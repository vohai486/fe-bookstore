import { hideModalLogin, login } from '@/redux/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoginForm from '../LoginForm'

const Login = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    try {
      const user = await dispatch(login(values))
      const userLogin = unwrapResult(user)
      dispatch(hideModalLogin())
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  )
}

export default Login
