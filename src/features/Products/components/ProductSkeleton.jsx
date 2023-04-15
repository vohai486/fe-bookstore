import { Box, Grid, Paper, Skeleton } from '@mui/material'
import React from 'react'

const ProductSkeleton = ({ length }) => {
  return (
    <Paper sx={{ padding: '25px' }}>
      <Grid
        container
        spacing={8}
      >
        {Array.from(new Array(length)).map((item, id) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={12 / 5}
            key={id}
          >
            <Box>
              <Skeleton
                sx={{ height: 200, marginBottom: '.5rem' }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton
                sx={{ height: 10, marginBottom: '.5rem' }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton
                sx={{ height: 10, width: '75%', marginBottom: '.5rem' }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton
                sx={{ height: 10, width: '55%', marginBottom: '.5rem' }}
                animation="wave"
                variant="rectangular"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default ProductSkeleton
