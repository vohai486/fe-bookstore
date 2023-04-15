import React from 'react'
import { Box, styled, Typography } from '@mui/material'

const BoxFilter = styled(Box)(({ theme }) => ({
  ul: {
    li: {
      cursor: 'pointer',
      marginBottom: theme.spacing(3),
      '&.active': {
        color: theme.palette.second.main,
        fontWeight: 500,
      },
    },
  },
  [theme.breakpoints.down(900)]: {
    h4: {
      textAlign: 'center',
    },
    padding: '1rem 0',
    ul: {
      justifyContent: 'center',
      display: 'flex',
      width: '100%',
      gap: '1rem',
      flexWrap: 'wrap',
      li: {
        marginBottom: 0,
      },
    },
  },
}))
const FilterByCategory = ({ onChange, listCategory, category }) => {
  return (
    <BoxFilter className="box__filter">
      <Typography variant="h4">Danh mục Sản Phẩm</Typography>
      <ul>
        {listCategory.length > 0 &&
          listCategory.map((item) => (
            <li
              className={`${+category === +item.categoryId ? 'active' : ''}`}
              key={item._id}
              onClick={() => {
                onChange('category', item.categoryId)
              }}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </BoxFilter>
  )
}

export default FilterByCategory
