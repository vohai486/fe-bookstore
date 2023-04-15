import { getImage } from '@/utils/common'
import { Box, Grid, styled, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const BoxThumnail = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '408px',
}))
const BoxReviewImage = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.75rem',
  '.item': {
    '&.active': {
      border: `1px solid ${theme.palette.blue1.main}`,
      borderRadius: '2px',
    },
    width: '4rem',
  },
}))
const ProductThumnail = ({ images = [], thumbnail_url }) => {
  const theme = useTheme()
  const isBreakpointDown600 = useMediaQuery(theme.breakpoints.down(600))
  return (
    <>
      <Grid
        item
        xs={2}
      >
        <BoxReviewImage>
          <Box className="item active">
            <img
              src={getImage('books', thumbnail_url)}
              alt=""
            />
          </Box>
        </BoxReviewImage>
      </Grid>

      <Grid
        item
        xs={10}
      >
        <BoxThumnail>
          <img
            src={getImage('books', thumbnail_url)}
            alt=""
          />
        </BoxThumnail>
      </Grid>
    </>
  )
}

export default ProductThumnail
