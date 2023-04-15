import { Box, Skeleton, styled } from '@mui/material'
import React from 'react'
const BoxSkeleton = styled(Box)(({ theme }) => ({
  padding: '0 1rem',
  '.title-big': {
    height: '28px',
    width: '60%',
    marginBottom: '.5rem',
  },
  '.title-small': {
    height: '28px',
    width: '90%',
  },
}))
const TitleSkeleton = () => {
  return (
    <BoxSkeleton>
      <Skeleton
        animation="wave"
        variant="rectangular"
        className="title-big"
      ></Skeleton>
      <Skeleton
        animation="wave"
        variant="rectangular"
        className="title-small"
      ></Skeleton>
    </BoxSkeleton>
  )
}

export default TitleSkeleton
