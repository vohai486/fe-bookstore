import { getImage } from '@/utils/common'
import {
  Box,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
} from '@mui/material'
import React from 'react'
import ModalProduct from './ModalProduct'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const ProductItem = ({ item }) => {
  return (
    <>
      <StyledTableCell
        component="th"
        scope="row"
      >
        {item.name}
      </StyledTableCell>
      <StyledTableCell>{item.author}</StyledTableCell>
      <StyledTableCell>
        <img
          src={getImage('books', item.thumbnail_url)}
          alt=""
        />
      </StyledTableCell>
      <StyledTableCell>{item?.publishingYear}</StyledTableCell>
      <StyledTableCell>{item.publisher}</StyledTableCell>
      <StyledTableCell>{item.category?.name}</StyledTableCell>
    </>
  )
}

export default ProductItem
