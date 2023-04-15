import { Paper, styled, Table, Typography } from '@mui/material'
import React from 'react'

const BoxMain = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  marginBottom: '1rem',
  color: theme.palette.back1.main,
  table: {
    width: '100%',
    borderSpacing: 0,
    tr: {
      width: '100%',
      '&:nth-child(even)': {
        backgroundColor: theme.palette.background1.main,
      },
      td: {
        padding: '10px 15px',
      },
      'td:first-of-type': {
        fontWeight: 500,
        color: '#4F4F4F',
        width: '220px',
        backgroundColor: theme.palette.gray1.main,
      },
    },
  },
}))
const ProductSpecifications = ({
  company,
  publisher,
  size,
  pages,
  publishingYear,
  cover,
}) => {
  return (
    <BoxMain elevation={0}>
      <Typography variant="h2">Thông Tin Chi Tiết</Typography>
      <table>
        <tbody>
          {!!company && (
            <tr>
              <td>Công ty phát hành</td>
              <td>{company}</td>
            </tr>
          )}
          {!!publishingYear && (
            <tr>
              <td>Năm xuất bản</td>
              <td>{publishingYear}</td>
            </tr>
          )}
          {!!size && (
            <tr>
              <td>Kích thước</td>
              <td>{size}</td>
            </tr>
          )}
          {!!cover && (
            <tr>
              <td>Loại bìa</td>
              <td>{cover}</td>
            </tr>
          )}
          {!!pages && (
            <tr>
              <td>Số Trang</td>
              <td>{pages}</td>
            </tr>
          )}
          {!!publisher && (
            <tr>
              <td>Nhà xuất bản</td>
              <td>{publisher}</td>
            </tr>
          )}
        </tbody>
      </table>
    </BoxMain>
  )
}

export default ProductSpecifications
