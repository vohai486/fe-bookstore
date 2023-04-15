import { Paper, styled } from '@mui/material'
import React from 'react'

const Boxmain = styled(Paper)(({ theme }) => ({
  marginTop: '1rem',
  padding: '1rem 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.895rem',
  color: theme.palette.back1.main,
}))
const Footer = () => {
  return (
    <Boxmain
      elevation={0}
      className="box-border"
    >
      © 2023 All rights reserved. Designed by Unvab.
    </Boxmain>
  )
}

export default Footer
