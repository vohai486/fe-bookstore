import { formatPriceVND } from '@/utils/common'
import { Box, Paper, Rating, styled, Typography, useTheme } from '@mui/material'
const BoxSpecifications = styled(Box)(({ theme }) => ({
  h4: {
    paddingTop: '1rem',
    fontWeight: 300,
    span: {
      color: theme.palette.blue2.main,
    },
  },
  h1: {
    margin: '.25rem 0',
  },
  '.bellow-title': {
    display: 'flex',
    gap: '.5rem',
    alignItems: 'center',
    fontSize: '.935rem',
    color: theme.palette.gray.main,
    marginBottom: '1rem',
  },
  '.product-price': {
    borderRadius: '1rem',
    marginBottom: '1rem',
    padding: '.75rem',
    background: theme.palette.background1.main,
    color: theme.palette.red1.main,
    gap: '.75rem',
    display: 'flex',
    alignItems: 'flex-end',
    h4: {
      fontWeight: 500,
    },
    '.price-current': {
      color: theme.palette.third.main,
      textDecoration: 'line-through',
      alignItems: 'center',
    },
  },
}))
const ProductInfo = ({
  author,
  name,
  rating,
  quantity_sold,
  review_count,
  price,
  original_price,
  discount,
}) => {
  const theme = useTheme()
  return (
    <BoxSpecifications>
      <Typography variant="h4">
        Tác giả: <span>{author}</span>
      </Typography>
      <Typography variant="h1">{name}</Typography>
      <Box className="bellow-title">
        {!!rating && (
          <Rating
            value={rating}
            precision={0.5}
            readOnly
            size="small"
          />
        )}
        {!!review_count && <span>({review_count} đánh giá) | </span>}
        {!!quantity_sold && <span>Đã bán {quantity_sold}</span>}
      </Box>
      <Box className="product-price">
        <Typography
          variant="price"
          sx={{
            color: !!discount ? 'unser' : theme.palette.first.main,
          }}
        >
          {' '}
          {formatPriceVND(price)}{' '}
        </Typography>
        {!!discount && (
          <>
            <span className="price-current">
              {formatPriceVND(original_price)}
            </span>
            <Typography variant="h4"> -{discount}% </Typography>
          </>
        )}
      </Box>
    </BoxSpecifications>
  )
}

export default ProductInfo
