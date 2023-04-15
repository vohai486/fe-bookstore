import { Box, Paper, styled, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import stockApi from '@/api/axiosStock'
import dayjs from 'dayjs'
import { formatPriceVND } from '@/utils/common'
import ModalStockEntries from '../components/stock-entries/ModalStockEntries'

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

  '.table': {
    marginTop: '2rem',
    overflow: 'auto',
    table: {
      minWidth: '800px',
    },
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '.btn': {
    padding: '4px 16px',
    border: 'none',
    '&.btn-del': {
      color: theme.palette.background.main,
      background: theme.palette.red1.main,
    },
    '&.btn-update': {
      color: theme.palette.back1.main,
      background: theme.palette.warning.main,
    },
  },
}))
const StockEntriesPage = () => {
  const [currentItem, setCurrentItem] = useState({})
  const [open, setOpen] = React.useState(false)
  const [listInput, setListInput] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = useState(10)
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
  const getInputs = async () => {
    try {
      const res = await stockApi.getStatsEntries({
        page: page + 1,
        limit,
        //   q: encodeURIComponent(debounced.length === 0 ? '' : debounced),
      })
      setPagination({
        ...res.data.data.pagination,
      })
      setListInput(res.data.data.list)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getInputs()
  }, [page, limit])
  return (
    <BoxMain elevation={0}>
      {open && (
        <ModalStockEntries
          open={open}
          setOpen={setOpen}
          getInputs={getInputs}
          item={currentItem}
          setCurrentItem={setCurrentItem}
        />
      )}
      <Box className="heading">
        Nhập hàng
        <button
          onClick={() => {
            setOpen(true)
          }}
        >
          {' '}
          <AddCircleIcon /> Nhập hàng
        </button>
      </Box>
      <Box className="table">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Ngày nhập</StyledTableCell>
                <StyledTableCell>Tên</StyledTableCell>
                <StyledTableCell>Số lượng</StyledTableCell>
                <StyledTableCell>Số tiền</StyledTableCell>
                <StyledTableCell>Thành tiền</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listInput.length > 0 &&
                listInput.map((item) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    >
                      {dayjs(item.createdAt).format('DD/MM/YYYY')}
                    </StyledTableCell>
                    <StyledTableCell>{item.book.name}</StyledTableCell>

                    <StyledTableCell>{item.qty}</StyledTableCell>
                    <StyledTableCell>
                      {formatPriceVND(item.price)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatPriceVND(item.qty * item.price)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '.5rem',
                        }}
                      >
                        <button
                          className="btn btn-update"
                          onClick={() => {
                            setCurrentItem(() => ({ ...item }))
                            setOpen(true)
                          }}
                        >
                          Sửa
                        </button>
                        <button className="btn btn-del">Xóa</button>
                      </Box>
                    </StyledTableCell>
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

export default StockEntriesPage
