import { Box, Skeleton, styled, useTheme } from '@mui/material'
import React from 'react'
import FilterByCategory from './filters/FilterByCategory'
import FilterByEvaluate from './filters/FilterByEvaluate'
import FilterByPrice from './filters/FilterByPrice'

const ProductFilter = ({ filters, handleFilterChange, listCategory }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        fontSize: '0.75rem',
        h4: {
          paddingBottom: theme.spacing(3),
          color: theme.palette.black.main,
        },
        color: theme.palette.first.main,
      }}
    >
      <FilterByCategory
        category={filters.category || ''}
        onChange={handleFilterChange}
        listCategory={listCategory}
      />
      <FilterByEvaluate
        rating={filters?.rating || ''}
        onChange={handleFilterChange}
      />
      <FilterByPrice
        onChange={handleFilterChange}
        price={filters?.price}
      />
    </Box>
  )
}

export default ProductFilter
