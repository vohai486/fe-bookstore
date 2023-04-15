import { Box } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedUser = ({ isloggedIn, children }) => {
  console.log('isloggedIn', isloggedIn)
  if (!isloggedIn) {
    console.log('chưa login')
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }
  return children
}

const ProtectedAdmin = ({ isloggedIn, isAdmin, children }) => {
  console.log(!isloggedIn || isAdmin !== 'admin')
  if (!isloggedIn || isAdmin !== 'admin') {
    return <Box>Dành cho Admin</Box>
  }
  return children
}

export { ProtectedUser, ProtectedAdmin }
