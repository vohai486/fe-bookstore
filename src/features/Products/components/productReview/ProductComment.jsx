import {
  Avatar,
  Box,
  Button,
  Grid,
  Rating,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import { getImage, ratingReview, timeSince } from '@/utils/common'
import reviewApi from '@/api/axiosReview'
const BoxMain = styled(Box)(({ theme }) => ({
  padding: '2rem 3rem',
  h4: {
    fontSize: '1rem',
    color: theme.palette.back1.main,
  },
  '.review-comment__user-inner': {
    display: 'flex',
    fontSize: '0.875rem',
    alignItems: 'center',
    gap: '1rem',
  },
  '.review-comment__user-info': {
    marginTop: '1rem',
    span: {
      color: theme.palette.first.main,
    },
  },
  '.review-comment__user-info,.review-comment__seller,.review-comment__rating':
    {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
    },
  '.review-comment__seller': {
    margin: '.5rem 0 1rem 5px',

    color: theme.palette.green.main,
    fontWeight: 400,
    span: {
      width: '0.875rem',
      height: '0.875rem',
      background: theme.palette.green.main,
      borderRadius: '50%',
      position: 'relative',
      '&::before': {
        position: 'absolute',
        content: '""',
        transform: 'translate(-50%, -70%) rotate(-45deg)',
        height: '3px',
        width: '6px',
        left: '50%',
        top: '50%',
        borderLeft: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
      },
    },
  },
  '.review-comment__img': {
    margin: '.5rem 0',
    display: 'flex',
    gap: '0.75rem',
    '.review-comment__item': {
      borderRadius: '.5rem',
      width: '120px',
      height: '120px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'pointer',
    },
  },
  '.review-comment__btn': {
    marginTop: '1rem',
    display: 'flex',
    gap: '1rem',
    color: theme.palette.second.main,
    fontWeight: 500,
    '.btn-thank-reply, .btn-thank': {
      padding: '0.5rem 1rem',
    },
    '.btn-thank': {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
      border: `1px solid ${theme.palette.second.main}`,
      '&.active': {
        background: 'rgb(219, 238, 255)',
        borderColor: 'transparent',
      },
    },
  },
}))
const ProductComment = ({ comment = {} }) => {
  const [like, setLike] = useState(comment.is_liked || false)
  const [likeCount, setLikeCount] = useState(comment.likes_count || 0)
  const theme = useTheme()
  const userTime = timeSince(comment.user?.createdAt)
  const commentTime = timeSince(comment.createdAt)
  const handleLike = async () => {
    if (like) {
      setLike(false)
      setLikeCount(likeCount - 1)
      await reviewApi.unlikeReview(comment._id)
    } else {
      setLikeCount(likeCount + 1)
      setLike(true)
      await reviewApi.likeReview(comment._id)
    }
  }
  return (
    <BoxMain className="box-border">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            [theme.breakpoints.down(600)]: {
              marginBottom: '2rem',
            },
          }}
        >
          <Box className="review-comment__user-inner">
            <Avatar
              sx={{ width: 48, height: 48 }}
              src={comment.user.photo || ''}
            />
            <Box className="review-comment__info">
              <Typography variant="h4">{comment.user.fullName}</Typography>
              Đã tham gia {userTime.value} {userTime.unit}
            </Box>
          </Box>
          <Box className="review-comment__user-info">
            <RateReviewOutlinedIcon /> Đã viết:{' '}
            <span>{comment.user.countWrite} Đánh giá</span>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
        >
          <Box className="review-comment__rating">
            <Rating
              name="half-rating-read"
              defaultValue={comment.rating || 0}
              precision={0.5}
              readOnly
            />
            <Typography variant="h4">{ratingReview(comment.rating)}</Typography>
          </Box>
          <Box className="review-comment__seller">
            <span></span>
            Đã mua hàng
          </Box>
          <Box className="review-comment__content">{comment.text}</Box>
          <Box className="review-comment__img">
            {comment.images.map((item, i) => (
              <div
                key={i}
                className="review-comment__item"
                style={{
                  backgroundImage: `url(${getImage('reviews', item)})`,
                }}
                alt=""
              ></div>
            ))}
          </Box>

          <Box>
            Đánh giá vào {commentTime.value} {commentTime.unit} trước
          </Box>
          <Box className="review-comment__btn">
            <Button
              onClick={handleLike}
              className={`btn-thank ${like ? 'active' : ''}`}
            >
              {like ? <ThumbUpOffAltRoundedIcon /> : <ThumbUpOffAltIcon />}
              Hữu ích {likeCount > 0 && `(${likeCount})`}
            </Button>
            <Button className="btn-thank-reply">Bình luận</Button>
          </Box>
        </Grid>
      </Grid>
    </BoxMain>
  )
}

export default ProductComment
