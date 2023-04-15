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
import { useForm } from 'react-hook-form'
import PickerDate from '../components/form-control/PickerDate/Index'

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
  },

  '.table': {
    marginTop: '1rem',
    overflow: 'auto',
    table: {
      minWidth: '1000px',
    },
  },
  '.date': {
    marginTop: '1rem',
    display: 'flex',
    gap: '1rem',
    '.item': {
      gap: '.5rem',
      display: 'flex',
      alignItems: 'center',
    },
    '.btn': {
      marginLeft: '2rem',
      button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '.25rem',
        fontSize: '.875rem',
        width: '176px',
        height: '100%',
        color: theme.palette.background.main,
        background: theme.palette.second.main,
      },
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
      marginLeft: '.5rem',
    },
    '&.btn-update': {
      color: theme.palette.back1.main,
      background: theme.palette.warning.main,
    },
  },
}))
const InventoryAdminPage = () => {
  const [currentItem, setCurrentItem] = useState({})
  const [open, setOpen] = React.useState(false)
  const [listProductInventory, setListProductInventory] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = useState(10)

  //   const handleChangePage = (e, newPage) => {
  //     setPage(newPage)
  //   }
  //   const handleChangeRowsPerPage = (event) => {
  //     setLimit(+event.target.value)
  //     setPage(1)
  //   }
  const form = useForm({
    defaultValues: {
      start: '',
      end: '',
    },
    mode: 'onChange',
  })
  const getInventory = async (params) => {
    try {
      const res = await stockApi.getInventory(params)

      setListProductInventory(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getInventory()
  }, [])
  const handleSubmit = (values) => {
    getInventory(values)
  }
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
        Danh mục hàng hóa và nhập xuất tồn
        {/* <button
          onClick={() => {
            setOpen(true)
          }}
        >
          {' '}
          <AddCircleIcon /> Nhập hàng
        </button> */}
      </Box>
      <form
        className="date"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Box className="item">
          Từ
          <PickerDate
            form={form}
            name="start"
          />
        </Box>
        <Box className="item">
          Đến
          <PickerDate
            form={form}
            name="end"
          />
        </Box>
        <Box className="btn">
          <button>Tìm kiếm</button>
        </Box>
      </form>
      <Box className="table">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Tên hàng</StyledTableCell>
                <StyledTableCell>Giá nhập</StyledTableCell>
                <StyledTableCell>Giá xuất</StyledTableCell>
                <StyledTableCell>Tồn đầu</StyledTableCell>
                <StyledTableCell>Nhập</StyledTableCell>
                <StyledTableCell>Xuất</StyledTableCell>
                <StyledTableCell>Tồn cuối</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProductInventory.length > 0 &&
                listProductInventory.map((item) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    >
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatPriceVND(item.priceImport)}
                    </StyledTableCell>

                    <StyledTableCell>
                      {formatPriceVND(item.priceExport)}
                    </StyledTableCell>
                    <StyledTableCell>{item.openingStock}</StyledTableCell>
                    <StyledTableCell>{item.qtyImport}</StyledTableCell>
                    <StyledTableCell>{item.qtyExport}</StyledTableCell>
                    <StyledTableCell>{item.endingStock}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </BoxMain>
  )
}

export default InventoryAdminPage
