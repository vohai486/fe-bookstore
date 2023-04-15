import categoriesApi from '@/api/axiosCategory'
import { formatPrice } from '@/utils/common'
import {
  Box,
  Chip,
  Skeleton,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const BoxMain = styled(Box)(({ theme }) => ({
  color: theme.palette.back1.main,
  fontSize: '0.875rem',
  h2: {
    color: theme.palette.first.main,
  },
  li: {
    cursor: 'pointer',
  },
  '.filter-sort': {
    display: 'flex',
    flexWrap: 'wrap',
    justifyCotent: 'center',
    li: {
      padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
      '&:hover, &.active': {
        color: theme.palette.blue1.main,
        fontWeight: 500,
        position: 'relative',
        '::after': {
          position: 'absolute',
          display: 'block',
          content: '""',
          width: '40px',
          left: '50%',
          height: '4px',
          backgroundColor: theme.palette.blue1.main,
          borderRadius: '8px',
          textAlign: 'center',
          transform: 'translateX(-50%)',
        },
      },
    },
  },
  '.MuiChip-root': {
    fontSize: '0.875rem',
    fontWeight: 400,
    backgroundColor: 'rgb(240, 248, 255)',
    color: theme.palette.second.main,
    borderColor: theme.palette.second.main,
    '&:hover': {
      svg: {
        color: theme.palette.blue1.main,
      },
    },
    svg: {
      color: 'inherit',
    },
  },
  '.filter-view': {
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
  },
}))

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => {
      return 'hardback'
    },
    onDelete: (filters) => 'hardback',
    isVisible: (filters) =>
      (filters['book_cover'] || '').split(',').includes('hardback'),
    params: 'book_cover',
  },
  {
    id: 2,
    getLabel: (filters) => {
      return 'paperback'
    },
    onDelete: (filters) => 'paperback',
    isVisible: (filters) =>
      (filters['book_cover'] || '').split(',').includes('paperback'),
    params: 'book_cover',
  },
  {
    id: 3,
    getLabel: (filters) => {
      return 'folder'
    },
    onDelete: (filters) => 'folder',
    isVisible: (filters) =>
      (filters['book_cover'] || '').split(',').includes('folder'),
    params: 'book_cover',
  },
  {
    id: 4,
    getLabel: (filters) => {
      const [gte, lte] = (filters['price'] || '').split(',')
      return `Từ ${formatPrice(gte)} đến ${formatPrice(lte)}`
    },
    onDelete: (filters) => {
      const [gte, lte] = filters['price'].split(',')
      return `${gte},${lte}`
    },
    isVisible: (filters) => filters['price'],
    params: 'price',
  },
  {
    id: 5,
    getLabel: (filters) => {
      return `từ ${filters['rating']} sao`
    },
    onDelete: (filters) => {
      return filters['rating']
    },
    isVisible: (filters) => filters['rating'],
    params: 'rating',
  },
]

const arrOption = [
  {
    name: 'Phổ Biến',
    id: 1,
    value: '',
  },
  {
    name: 'Bán Chạy',
    id: 2,
    value: 'top_seller',
  },
  {
    name: 'Hàng Mới',
    id: 3,
    value: 'newest',
  },
  {
    name: 'Giá Thấp Đến Cao',
    id: 4,
    value: 'price_asc',
  },
  {
    name: 'Giá Cao Đến Thấp',
    id: 5,
    value: 'price_desc',
  },
]

const FilterView = ({
  filters,
  handleFilterChange,
  setFilterViews,
  filterViews = [],
  listCategory,
}) => {
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])
  const visibleFiltersCategory = useMemo(() => {
    return listCategory.find(
      (item) => +item.categoryId === +filters['category']
    )
  }, [filters, listCategory])

  return (
    <BoxMain>
      <Typography
        paddingLeft={'1rem'}
        variant="h2"
        sx={{
          [theme.breakpoints.down(900)]: {
            textAlign: 'center',
          },
        }}
      >
        {'Nhà Sách'}
      </Typography>
      <ul className="filter-sort">
        {arrOption.map((item) => (
          <li
            key={item.id}
            className={(filters['sort'] || '') === item.value ? 'active' : ''}
            onClick={() => handleFilterChange('sort', item.value)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <ul className="filter-view box-border ">
        {visibleFiltersCategory && (
          <Chip
            label={visibleFiltersCategory.name}
            variant="outlined"
            onDelete={() => {
              handleFilterChange(
                'category',
                visibleFiltersCategory.categoryId.toString()
              )
            }}
          />
        )}
        {filterViews.length > 0 &&
          filterViews.map((item) => (
            <li key={item?._id}>
              <Chip
                label={item?.name}
                variant="outlined"
                onDelete={() => {
                  handleFilterChange(item.params, item._id.toString())
                }}
              />
            </li>
          ))}

        {visibleFilters.length > 0 &&
          visibleFilters.map((item) => (
            <li key={item?.id}>
              <Chip
                label={item?.getLabel(filters)}
                variant="outlined"
                onDelete={() => {
                  handleFilterChange(item.params, item?.onDelete(filters))
                }}
              />
            </li>
          ))}
        {(filterViews.length > 0 ||
          visibleFilters.length > 0 ||
          visibleFiltersCategory) && (
          <Typography
            variant="h4"
            color="blue1.main"
            onClick={() => {
              setSearchParams({})
              setFilterViews((prev) => [])
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                fontWeight: 300,
              },
            }}
          >
            Xóa tất cả
          </Typography>
        )}
      </ul>
    </BoxMain>
  )
}
export default FilterView
