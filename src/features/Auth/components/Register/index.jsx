import { hideModalLogin, register } from '@/redux/userSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import RegisterForm from '../RegisterForm'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'

const Register = ({ onClose }) => {
  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    try {
      const user = await dispatch(register(values))
      unwrapResult(user)
      onClose()
      dispatch(hideModalLogin())
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  )
}

export default Register
