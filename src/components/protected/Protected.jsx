import { Box } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedUser = ({ isloggedIn, children }) => {
  if (!isloggedIn) {
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
  if (!isloggedIn || isAdmin !== 'admin') {
    return <Box>Dành cho Admin</Box>
  }
  return children
}

export { ProtectedUser, ProtectedAdmin }
