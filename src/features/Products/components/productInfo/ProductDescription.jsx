import { Paper, styled, Typography } from '@mui/material'
import React from 'react'
import DOMPurify from 'dompurify'

const BoxMain = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  color: theme.palette.back1.main,
}))
const ProductDescription = ({ description }) => {
  const safeDescription = DOMPurify.sanitize(description)

  return (
    <BoxMain elevation={0}>
      <Typography variant="h2">Mô tả sản phẩm</Typography>
      <div
        dangerouslySetInnerHTML={{
          __html: safeDescription,
        }}
      ></div>
    </BoxMain>
  )
}

export default ProductDescription
