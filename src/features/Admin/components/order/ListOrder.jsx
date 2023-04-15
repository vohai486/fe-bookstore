import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
  tableCellClasses,
  Tabs,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect } from 'react'
import orderApi from '@/api/axiosOrder'
import useDebounce from '@/hooks/useDebounce'
import queryString from 'query-string'
import React, { useMemo, useState } from 'react'
import OrderItem from './OrderItem'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '@/redux/orderSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSocket } from '@/contexts/socketContext'
import { createNotifyUser } from '@/redux/notifySlice'
import notifyApi from '@/api/axiosNotify'
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
const BoxMain = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  '.input-search': {
    marginBottom: '1rem',
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
  '.nav': {
    marginBottom: '1rem',
  },
  '.table': {
    overflow: 'auto',
    table: {
      minWidth: '1200px',
      thead: {
        th: {
          width: 'calc(100% / 7)',
        },
      },
      tbody: {},
    },
  },
}))
const list = [
  { status: 1, label: 'Tất cả' },
  { status: 2, label: 'Đang chờ xử lý' },
  { status: 3, label: 'Đang vận chuyển' },
  { status: 4, label: 'Đã giao' },
  { status: 5, label: 'Đã hủy' },
]

const ListOrder = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    return {
      ...params,
    }
  }, [location.search])
  const loggedInUser = useSelector((state) => state.user.currentUser)

  const listOrders = useSelector((state) => state.order.listOrders)
  const [pagination, setPagination] = useState({
    page: 1,
    length: 10,
    totalPages: 0,
  })
  const { socket } = useSocket()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search, 500, setPage)
  const [limit, setLimit] = useState(10)
  useEffect(() => {
    ;(async () => {
      const res = await dispatch(
        getOrders({
          page: page + 1,
          limit,
          status: +queryParams['status'] || 1,
        })
      )
      const data = unwrapResult(res)
      setPagination(data.pagination)
    })()
  }, [page, limit, queryParams])

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value)
    setPage(1)
  }
  const handleCancel = async (id) => {
    try {
      const res = await orderApi.cancel(id)
      const { user, _id } = res.data.data
      if (!res) {
        return
      }
      toast.success('Hủy đơn hàng thành công', {
        position: 'top-center',
        autoClose: 1000,
      })
      const notify = await notifyApi.add({
        user,
        text: `Đơn hàng ${_id} của bạn đã bị hủy`,
        url: `/customer/order/${_id}`,
      })
      !!socket &&
        socket.emit('orderUserNotify', {
          notify: notify.data.data,
          data: res.data.data,
        })
    } catch (error) {}
  }
  return (
    <BoxMain>
      <Box className="input-search">
        <SearchIcon />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm đơn hàng"
        ></input>
        <button>Tìm kiếm</button>
      </Box>
      <Box className="nav">
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          value={+queryParams['status'] || 1}
          onChange={(e, value) => {
            setPage(0)
            setSearchParams({ status: value })
          }}
        >
          {list.map((item) => (
            <Tab
              key={item.status}
              label={item.label}
              value={item.status}
            />
          ))}
        </Tabs>
      </Box>
      <Box className="table">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Mã đơn hàng</StyledTableCell>
                <StyledTableCell>Tình Trạng</StyledTableCell>
                <StyledTableCell>Tên người nhận</StyledTableCell>
                <StyledTableCell>Địa chỉ</StyledTableCell>
                <StyledTableCell>Điện thoại</StyledTableCell>
                <StyledTableCell>Ngày tạo</StyledTableCell>
                <StyledTableCell>Quản lý đơn hàng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrders.length > 0 &&
                listOrders.map((item) => (
                  <StyledTableRow key={item._id}>
                    <OrderItem
                      item={item}
                      handleCancel={handleCancel}
                    />
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          {pagination.totalPages > 1 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={pagination.length}
              rowsPerPage={limit}
              page={!page || page <= 0 ? 0 : page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Box>
    </BoxMain>
  )
}

export default ListOrder
