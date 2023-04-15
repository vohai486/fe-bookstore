import { Box, Paper, styled, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import bookApi from '@/api/axiosBook'
import SearchIcon from '@mui/icons-material/Search'
import useDebounce from '@/hooks/useDebounce'
import ProductItem from '../components/product/ProductItem'
import ModalProduct from '../components/product/ModalProduct'

const BoxMain = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  svg: {
    fontSize: '1rem',
  },
  fontSize: '.875rem',

  color: theme.palette.black.main,
  '.heading': {
    fontSize: '1.25rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '.25rem',
      fontSize: '.875rem',
      width: '176px',
      height: '40px',
      color: theme.palette.background.main,
      background: theme.palette.second.main,
    },
  },
  '.input-search': {
    margin: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid rgb(221, 221, 227)',
    fontSize: '14px',
    borderRadius: '8px',
    paddingLeft: '1rem',
    input: {
      flex: 1,
      height: '20px',
      border: 'none',
      '&:focus': {
        border: 'none',
      },
    },
    button: {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      width: '92px',
      height: '38px',
      border: 'none',
      background: theme.palette.second.main,
      color: theme.palette.background.main,
    },
  },
  '.table': {
    overflow: 'auto',
    table: {
      minWidth: '1000px',
      thead: {
        th: {
          width: '15%',
          '&.th-name': {
            width: '30%',
          },
          '&.th-img': {
            width: '10%',
          },
        },
      },
      tbody: {
        td: {
          img: {
            width: '100%',
            height: '100%',
          },
        },
      },
    },
  },
}))
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const ProductsAdminPage = () => {
  const [currentItem, setCurrentItem] = useState({})
  const [open, setOpen] = React.useState(false)
  const [listBook, setListBook] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = useState(10)
  const debounced = useDebounce(search, 500, setPage)
  const [pagination, setPagination] = useState({
    page: 1,
    length: 10,
  })
  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value)
    setPage(1)
  }
  const getProducts = async () => {
    const res = await bookApi.getAll({
      page: page + 1,
      limit,
      sort: 'newest',
      q: encodeURIComponent(debounced.length === 0 ? '' : debounced),
    })
    setPagination({
      ...res.data.pagination,
    })
    setListBook(res.data.data)
  }
  useEffect(() => {
    getProducts()
  }, [page, limit, debounced])
  return (
    <BoxMain elevation={0}>
      {open && (
        <ModalProduct
          getProducts={getProducts}
          setCurrentItem={setCurrentItem}
          open={open}
          setOpen={setOpen}
          item={currentItem}
          page={page}
          setListBook={setListBook}
        />
      )}
      <Box className="heading">
        Danh sách Sách
        <button
          onClick={() => {
            console.log(1)
            setOpen(true)
          }}
        >
          {' '}
          <AddCircleIcon /> Thêm Sách
        </button>
      </Box>
      <Box className="input-search">
        <SearchIcon />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm sách"
        ></input>
        <button>Tìm kiếm</button>
      </Box>
      <Box className="table">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell className="th-name">Tên</StyledTableCell>
                <StyledTableCell>Tác giả</StyledTableCell>
                <StyledTableCell className="th-img">Hình ảnh</StyledTableCell>
                <StyledTableCell>Năm phát hành</StyledTableCell>
                <StyledTableCell>Nhà xuất bản</StyledTableCell>
                <StyledTableCell>Thể loại</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listBook.length > 0 &&
                listBook.map((item) => (
                  <StyledTableRow
                    key={item.name}
                    onClick={() => {
                      setCurrentItem(item)
                      setOpen(true)
                    }}
                  >
                    <ProductItem item={item} />
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pagination.length}
          rowsPerPage={limit}
          page={!page || page <= 0 ? 0 : page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </BoxMain>
  )
}

export default ProductsAdminPage
