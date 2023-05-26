import { Box, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import { STATIC_HOST } from '@/constants/common'
import { formatPrice, generateNameId, getImage } from '@/utils/common'
import { Link, useNavigate } from 'react-router-dom'
const Product = ({ data = {} }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Paper
      elevation={0}
      sx={{
        color: theme.palette.first.main,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 20px',
        },
        cursor: 'pointer',
        img: {
          // pointerEvents: "none",
        },
      }}
    >
      <Link to={`/${generateNameId(data.name, data._id)}`}>
        <img
          // src={`${STATIC_HOST}/img/books/${data?.thumbnail_url}`}
          src={getImage('books', data?.thumbnail_url)}
          alt={data?.name}
        />
        <Box sx={{ padding: `${theme.spacing(2)} ${theme.spacing(3)}` }}>
          <Typography
            sx={{
              lineHeight: '1rem',
              minHeight: '32px',
              display: '-webkit-box',
              '-webkitBoxOrient': 'vertical',
              '-webkitLineClamp': '2',
              overflow: 'hidden',
            }}
            variant="h3"
          >
            {data.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.third.main,
              fontWeight: 400,
              lineHeight: '1rem',
              gap: theme.spacing(1),
              height: '1rem',
            }}
          >
            {!!data.rating_average && (
              <>
                {data.rating_average}{' '}
                <StarIcon
                  color="warning1"
                  fontSize="inherit"
                ></StarIcon>{' '}
                |
              </>
            )}
            {!!data.quantity_sold && <> Đã bán {data.quantity_sold}</>}
          </Box>

          <Box
            sx={{
              color: theme.palette.red1.main,
              span: {
                fontSize: '1rem',
                fontWeight: 500,
                marginRight: theme.spacing(2),
              },
            }}
          >
            <span
              style={{
                color: !!data.discount_rate
                  ? 'unset'
                  : theme.palette.first.main,
              }}
            >
              {formatPrice(data.price)} <sup>₫</sup>
            </span>
            {data.discount_rate ? `-${data.discount_rate}%` : ''}
          </Box>
        </Box>
      </Link>
    </Paper>
  )
}

export default Product
