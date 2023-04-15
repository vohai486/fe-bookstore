import React, { useEffect } from 'react'
import { Box, Grid, styled, Paper, useTheme } from '@mui/material'
import ProductListReview from '../components/ProductListReview'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail'

const BoxMain = styled(Box)(({ theme }) => ({
  h2: {
    color: theme.palette.black.main,
    lineHeight: '2rem',
    marginBottom: '.5rem',
  },
  color: theme.palette.back1.main,
  fontSize: '0.875rem',
}))
const ProductDetailsPage = () => {
  const theme = useTheme()
  const param = useParams()

  return (
    <BoxMain>
      <ProductDetail bookId={param.id} />
      <ProductListReview bookId={param.id} />
    </BoxMain>
  )
}

export default ProductDetailsPage
