import reviewApi from '@/api/axiosReview'
import {
  Box,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Rating,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductComment from './productReview/ProductComment'
import VerifiedIcon from '@mui/icons-material/Verified'
import IconCommentEmpty from '@/assets/icons/iconCommentEmpty'

const BoxMain = styled(Paper)(({ theme }) => ({
  color: theme.palette.third.main,
  padding: '1rem',
  '.customer-reviews': {
    marginBottom: '2rem',
    padding: '0 3rem',
    '.review-title': {
      color: theme.palette.back1.main,
    },

    '.review__rating-inner': {
      display: 'flex',
      alignItems: 'center',
      '.review-rating__stars': {
        marginLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    '.review__rating-level': {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '0.675rem',
      '.review__rating-item': {
        display: 'flex',
        alignItems: 'center',
        gap: '.5rem',
        '.MuiLinearProgress-root': {
          flexShrink: 0,
        },
      },
    },
    '.filter-review': {
      padding: '3rem 0 2rem',
      color: theme.palette.back1.main,
      fontWeight: 400,
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
    },
  },
  '.customer-reviews-empty': {
    display: 'flex',
    justifyCotent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: 140,
  height: 6,
  borderRadius: 4,
}))
const ProductListReview = ({ bookId }) => {
  const theme = useTheme()
  const [avgRating, setAvgRating] = useState([])
  const [listComment, setListComment] = useState([])
  const [listRating, setListRating] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await reviewApi.getListReviewOfBook(bookId)
        const { avgRating, data, rating } = res.data
        setAvgRating(avgRating)
        setListComment(data)
        setListRating(rating)
      } catch (error) {
        console.log(error.response?.data?.msg)
      }
    })()
  }, [bookId])
  const totalCountRating = listRating.reduce(
    (total, item) => total + item?.count,
    0
  )

  return (
    <BoxMain elevation={0}>
      <Typography variant="h2">Đánh Giá - Nhận Xét Từ Khách Hàng</Typography>
      {avgRating.length === 0 && (
        <Box className="customer-reviews-empty">
          <IconCommentEmpty></IconCommentEmpty>
          Chưa có đánh giá nào cho sản phẩm này
        </Box>
      )}
      {avgRating.length > 0 && (
        <>
          <Box className="customer-reviews">
            {/* <Grid container>
              <Grid
                item
                xs={8}
              > */}
            <Box className="review__rating-inner">
              <Typography
                variant="price"
                className="review-title"
              >
                {avgRating[0]?.avg}
              </Typography>
              <Box className="review-rating__stars">
                <Rating
                  name="half-rating-read"
                  value={avgRating[0]?.avg || 0}
                  precision={0.5}
                  readOnly
                />
                {avgRating[0]?.count} nhận xét
              </Box>
            </Box>
            <Box className="review__rating-level">
              {[5, 4, 3, 2, 1].map((item, index) => {
                const countRating = listRating.find(
                  (rating) => rating._id === item
                )?.count
                return (
                  <Box
                    key={index}
                    className="review__rating-item"
                  >
                    <Rating
                      sx={{ fontSize: '0.875rem' }}
                      name="half-rating-read"
                      defaultValue={item}
                      readOnly
                    />
                    <BorderLinearProgress
                      sx={{
                        backgroundColor: theme.palette.background1.main,
                        span: {
                          backgroundColor: theme.palette.third.main,
                        },
                      }}
                      variant="determinate"
                      value={(countRating / totalCountRating) * 100 || 0}
                    />
                    {countRating}
                  </Box>
                )
              })}
            </Box>
            {/* </Grid>
            </Grid> */}
          </Box>
          {listComment.length > 0 &&
            listComment.map((item, i) => (
              <div key={item._id || i}>
                <ProductComment comment={item} />
              </div>
            ))}
        </>
      )}
    </BoxMain>
  )
}

export default ProductListReview
