import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import useDebounce from '@/hooks/useDebounce'
import userApi from '@/api/axiosUser'
import UserItem from '../components/user/UserItem'
import ModalUser from '../components/user/ModalUser'

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
      minWidth: '900px',
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
const UserAdminPage = () => {
  const [open, setOpen] = useState(false)
  const [listUser, setListUser] = useState([])
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)
  const debounced = useDebounce(search, 500, setPage)
  const [user, setUser] = useState({})
  const [pagination, setPagination] = useState({
    page: 1,
    length: 10,
  })
  const getUsers = async () => {
    const res = await userApi.getAll({
      page: page + 1,
      limit,
      q: encodeURIComponent(debounced.length === 0 ? '' : debounced),
    })
    setPagination({
      ...res.data.pagination,
    })
    setListUser(res.data.data)
  }
  useEffect(() => {
    getUsers()
  }, [page, limit, debounced])
  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value)
    setPage(1)
  }
  return (
    <BoxMain elevation={0}>
      {open && (
        <ModalUser
          open={open}
          setOpen={setOpen}
          item={user}
          setUser={setUser}
          getUsers={getUsers}
          setPage={setPage}
        />
      )}
      <Box className="heading">
        Danh sách Người dùng
        <button
          onClick={() => {
            setOpen(true)
          }}
        >
          {' '}
          <AddCircleIcon /> Thêm Người dùng
        </button>
      </Box>
      <Box className="input-search">
        <SearchIcon />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm người dùng"
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
                <StyledTableCell>Mã người dùng</StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phân quyền</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listUser.length > 0 &&
                listUser.map((item) => (
                  <StyledTableRow key={item._id}>
                    <UserItem
                      item={item}
                      setUser={setUser}
                      setOpen={setOpen}
                      getUsers={getUsers}
                      setPage={setPage}
                    />
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

export default UserAdminPage
