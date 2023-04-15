import { Box, Grid, Paper, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import FmdBadIcon from '@mui/icons-material/FmdBad'
import Product from './Product'
const BoxNotFound = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
  '.box-notfound': {
    display: 'flex',
    gap: theme.spacing(2),
    padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
    border: `1px solid ${theme.palette.warning.main}`,
    color: theme.palette.warning1.main,
    backgroundColor: 'rgb(240, 248, 255)',
    alignItems: 'center',
  },
}))
const BoxMain = styled(Box)(({ theme }) => ({}))
const ProductList = ({ data }) => {
  return (
    <Box sx={{ fontSize: '0.75rem' }}>
      {data.length === 0 ? (
        <BoxNotFound>
          <Box className="box-notfound">
            <FmdBadIcon />
            Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
          </Box>
        </BoxNotFound>
      ) : (
        <BoxMain>
          <Grid
            container
            spacing={2}
          >
            {data.map((item) => (
              <Grid
                item
                xs={6}
                sm={3}
                lg={12 / 5}
                key={item._id}
              >
                <Product data={item} />
              </Grid>
            ))}
          </Grid>
        </BoxMain>
      )}
    </Box>
  )
}

export default ProductList
