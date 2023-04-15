import { Box, Rating, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
const BoxFilter = styled(Box)(({ theme }) => ({
  color: '#242424',
  fontWeight: 400,
  li: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    paddingBottom: '5px',
    marginBottom: 0,
    gap: '5px',
  },
  [theme.breakpoints.down(900)]: {
    h4: {
      textAlign: 'center',
    },
    padding: '1rem 0',
    ul: {
      justifyContent: 'center',
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
  },
}))
const FilterByEvaluate = ({ rating, onChange }) => {
  const [arrayRating, setArrayRating] = useState([5, 4, 3, 2, 1])
  useEffect(() => {
    if (!rating) {
      setArrayRating([5, 4, 3, 2, 1])
    } else {
      setArrayRating(() => [...new Set([+rating, 5, 4, 3, 2, 1])])
    }
  }, [rating])

  return (
    <BoxFilter className="box-border box__filter">
      <Typography variant="h4">Đánh giá</Typography>
      <ul>
        {arrayRating.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              onChange('rating', item)
            }}
          >
            <Rating
              size="small"
              name="read-only"
              value={item}
              readOnly
            />
            <span>trở lên</span>
          </li>
        ))}
      </ul>
    </BoxFilter>
  )
}

export default FilterByEvaluate
