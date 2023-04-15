import { Breadcrumbs, Typography, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const BreadcrumbsStyled = styled(Breadcrumbs)(({ theme }) => ({
  padding: '1rem 0',
  '.MuiBreadcrumbs-li': {
    fontSize: '0.875rem',
    a: {
      color: theme.palette.third.main,
    },
  },
}))
const BreadcrumbComponent = ({ title }) => {
  return (
    <BreadcrumbsStyled aria-label="breadcrumb">
      <Link
        underline="hover"
        color="inherit"
        href="/"
      >
        Trang chủ
      </Link>
      <Typography
        color="first.main"
        fontSize="inherit"
      >
        {title}
      </Typography>
    </BreadcrumbsStyled>
  )
}

export default BreadcrumbComponent
