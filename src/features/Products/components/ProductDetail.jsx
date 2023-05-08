import bookApi from '@/api/axiosBook'
import BreadcrumbComponent from '@/components/Breadcrumbs/Breadcrumbs'
import { Box, Grid, Paper, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddToCartForm from './productInfo/AddToCartForm'
import ProductDescription from './productInfo/ProductDescription'
import ProductInfo from './productInfo/ProductInfo'
import ProductSpecifications from './productInfo/ProductSpecifications'
import ProductThumnail from './productInfo/ProductThumnail'

const ProductDetail = ({ bookId }) => {
  const theme = useTheme()
  const isBreakpointDown768 = useMediaQuery(theme.breakpoints.down(768))
  const isBreakpointDown900 = useMediaQuery(theme.breakpoints.down(900))
  const [book, setBook] = useState({})
  useEffect(() => {
    ;(async () => {
      try {
        const res = await bookApi.get(bookId)
        setBook(res.data.data)
      } catch (error) {
        console.log(error.response?.data?.msg)
      }
    })()
  }, [bookId])
  return (
    <>
      <BreadcrumbComponent title={book?.name} />
      <Paper
        elevation={0}
        sx={{
          padding: '1rem',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: theme.palette.back1.main,
        }}
      >
        <Grid
          container
          columnSpacing={6}
        >
          <Grid
            item
            container
            xs={isBreakpointDown768 ? 12 : 6}
            md={5}
            alignItems="center"
          >
            <ProductThumnail
              images={book?.images}
              thumbnail_url={book?.thumbnail_url}
            />
          </Grid>
          <Grid
            item
            xs={isBreakpointDown768 ? 12 : 6}
            md={7}
            sx={{ borderLeft: '1px solid rgb(242, 242, 242)' }}
          >
            <ProductInfo
              author={book?.author}
              name={book?.name}
              rating={book?.rating_average}
              quantity_sold={book?.quantity_sold}
              review_count={book?.review_count}
              price={book?.price}
              original_price={book?.original_price}
              discount={book?.discount_rate}
            />
            <AddToCartForm
              id={book?._id}
              countInStock={book?.countInStock}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        columnSpacing={5}
        sx={{ marginBottom: '1rem' }}
      >
        <Grid
          item
          xs={12}
          md={9}
        >
          <ProductSpecifications
            company={book.company}
            publisher={book.publisher}
            size={book.size}
            pages={book.pages}
            publishingYear={book.publishingYear}
            cover={book.cover}
          ></ProductSpecifications>
          <ProductDescription description={book.description} />
        </Grid>
        {!isBreakpointDown900 && (
          <Grid
            item
            xs={3}
            sx={{ paddingTop: '2rem' }}
          >
            <img
              src="https://salt.tikicdn.com/cache/w1080/ts/tka/05/93/32/094f0409e55463d82485bafd4bcb7a04.png"
              alt=""
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default ProductDetail
