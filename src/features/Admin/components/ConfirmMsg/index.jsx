import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, styled, Typography, Zoom } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { useDispatch } from 'react-redux'
import { updateMe } from '@/redux/userSlice'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom
      timeout={500}
      ref={ref}
      {...props}
    />
  )
})
const ModalStyled = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-container': {
    alignItems: 'center',
    '.MuiDialog-paper': {
      color: theme.palette.first.main,
      margin: '5rem',
      minWidth: '400px',
      borderRadius: '1.25rem',
      fontSize: '0.875rem',
      '.MuiDialogContent-root': {
        padding: '20px 20px 0',
        svg: {
          color: theme.palette.blue1.main,
        },
        p: {
          fontWeight: 500,
        },
        h4: {
          fontWeight: 300,
        },
      },
      '.MuiDialogActions-root': {
        '.btn': {
          padding: '.5rem 1rem',
          border: '1px solid',
          borderRadius: '.25rem',
          '&.btn-cancel': {
            backgroundColor: theme.palette.background.main,
            color: theme.palette.blue1.main,
            borderColor: theme.palette.blue1.main,
          },
          '&.btn-confirm': {
            backgroundColor: theme.palette.blue1.main,
            color: theme.palette.background.main,
            borderColor: theme.palette.background.main,
          },
        },
      },
    },
  },
}))
const ConfirmMsg = ({
  open,
  setOpen,
  title,
  subTitle = '',
  handleDelete,
  titleButton = 'Xóa bỏ',
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ModalStyled
      className="hai"
      TransitionComponent={Transition}
      open={open}
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Box sx={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}>
          <ErrorOutlineOutlinedIcon />
          <Box>
            <Typography>{title}</Typography>
            <Typography variant="h4">{subTitle}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <button
          className="btn btn-cancel"
          onClick={handleClose}
        >
          Hủy
        </button>
        <button
          className="btn btn-confirm"
          onClick={() => {
            setOpen(false)
            handleDelete()
          }}
        >
          {titleButton}
        </button>
      </DialogActions>
    </ModalStyled>
  )
}

export default ConfirmMsg
