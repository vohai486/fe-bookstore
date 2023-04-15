import bookApi from '@/api/axiosBook'
import categoriesApi from '@/api/axiosCategory'
import BreadcrumbComponent from '@/components/Breadcrumbs/Breadcrumbs'
import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Pagination,
  Paper,
  Skeleton,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import queryString from 'query-string'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import FilterView from '../components/FilterView'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList'
import ProductSkeleton from '../components/ProductSkeleton'
const BoxMain = styled(Box)(({ theme }) => ({
  color: theme.palette.first.main,
}))
const BoxPagination = styled(Box)(({ theme }) => ({
  margin: '5rem 0 1rem',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const ProductListPage = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [filterViews, setFilterViews] = useState([])
  const [productList, setProductList] = useState([])
  const [listCategory, setLisCategory] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 20,
  })
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    return {
      ...params,
    }
  }, [location.search])
  useEffect(() => {
    // dispatch(setQueryParam({ ...queryParams }));
    ;(async () => {
      try {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        })
        setLoading(true)
        const res = await bookApi.getAll({
          ...queryParams,
          fields: '-description',
        })
        const { data, pagination } = res.data
        setProductList(data)
        setPagination(pagination)
        setLoading(false)
      } catch (error) {}
      setLoading(false)
    })()
  }, [queryParams])

  useEffect(() => {
    ;(async () => {
      const res = await categoriesApi.getCategory()
      setLisCategory(res.data.data)
    })()
  }, [])

  const handleOnChangePagination = (e, page) => {
    setSearchParams({
      ...queryParams,
      page,
    })
  }

  const handleFilterChange = (name, value) => {
    const newFilter = {}
    newFilter[name] = value
    const keyFilter = Object.keys(newFilter)[0]
    const cloneParam = { ...queryParams }
    if (cloneParam.page) {
      delete cloneParam['page']
    }
    if (keyFilter === 'category' && +cloneParam[name] !== +value) {
      setSearchParams({ category: newFilter[keyFilter] })
    }
    if (queryParams[keyFilter] === newFilter[keyFilter]) {
      delete cloneParam[keyFilter]
      setSearchParams({ ...cloneParam })
    } else {
      if (newFilter[keyFilter] === '') {
        delete cloneParam[keyFilter]
        setSearchParams({ ...cloneParam })
      } else {
        setSearchParams({ ...cloneParam, ...newFilter })
      }
    }
  }

  return (
    <BoxMain>
      <BreadcrumbComponent title="Nhà Sách" />
      <Grid
        container
        columnSpacing={2}
      >
        <Grid
          item
          sm={12}
          md={2.4}
          lg={2}
        >
          <Paper elevation={0}>
            <ProductFilter
              listCategory={listCategory}
              filters={queryParams}
              loading={loading}
              handleFilterChange={handleFilterChange}
            ></ProductFilter>
          </Paper>
        </Grid>
        <Grid
          item
          sm={12}
          md={9.6}
          lg={10}
        >
          <Paper
            elevation={0}
            sx={{
              padding: `${theme.spacing(3)}  0`,
              marginBottom: theme.spacing(2),
            }}
          >
            <FilterView
              handleFilterChange={handleFilterChange}
              filterViews={filterViews}
              loading={loading}
              filters={queryParams}
              setFilterViews={setFilterViews}
              listCategory={listCategory}
            ></FilterView>
          </Paper>
          {loading ? (
            <ProductSkeleton length={15} />
          ) : (
            <ProductList data={productList} />
          )}

          {pagination.totalPages > 1 && (
            <BoxPagination>
              {loading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ width: '30%', height: 25 }}
                ></Skeleton>
              ) : (
                <Pagination
                  color="primary"
                  sx={{ color: '#fff' }}
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handleOnChangePagination}
                ></Pagination>
              )}
            </BoxPagination>
          )}
        </Grid>
      </Grid>
    </BoxMain>
  )
}

export default ProductListPage
