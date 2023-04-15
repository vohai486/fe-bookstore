import userApi from '@/api/axiosUser'
import { TableCell, styled, tableCellClasses } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmMsg from '../ConfirmMsg'

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

const UserItem = ({ item, setUser, setOpen, setPage, getUsers }) => {
  const [openConfirm, setOpenConfirm] = useState(false)

  const handleDelete = async () => {
    try {
      const res = await userApi.deleteUser(item._id)
      setPage((pre) => 0)
      toast.success('Xóa người dùng thành công')
      getUsers()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <ConfirmMsg
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Bạn muốn xóa người dùng này không?"
        handleDelete={handleDelete}
      />
      <StyledTableCell
        component="th"
        scope="row"
      >
        {item._id}
      </StyledTableCell>
      <StyledTableCell>{item.fullName}</StyledTableCell>
      <StyledTableCell>{item.email}</StyledTableCell>
      <StyledTableCell>{item.role}</StyledTableCell>
      <StyledTableCell>
        <button
          className="btn btn-update"
          onClick={() => {
            setOpen((pre) => true)
            setUser((pre) => ({ ...item }))
          }}
        >
          Sửa
        </button>
        <button
          className="btn btn-del"
          onClick={() => {
            setOpenConfirm(true)
          }}
        >
          Xóa
        </button>
      </StyledTableCell>
    </>
  )
}

export default UserItem
