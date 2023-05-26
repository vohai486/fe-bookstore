import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  styled,
  TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React, { useRef, useState } from 'react'
import InputField from '@/components/form-control/InputField'
import PickerDate from '@/components/form-control/PickerDate/Index'
import dayjs from 'dayjs'
import RadioField from '@/components/form-control/RadioField'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import useClickOutSide from '@/hooks/useClickOutSide'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ConfirmMsg from '@/components/ConfirmMsg'
import ModalImage from '@/components/modal/ModalImage'
import { useDispatch, useSelector } from 'react-redux'
import { getImage } from '@/utils/common'
import { updateMe } from '@/redux/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
const BoxMain = styled('form')(({ theme }) => ({
  padding: '1rem 1.5rem 1rem 1rem',
  fontSize: '0.875rem',
  height: '100%',
  '.form-avatar': {
    marginTop: '1rem',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '.avatar-view': {
      position: 'relative',
    },
    '.avatar-option': {
      padding: '.5rem 0',
      position: 'absolute',
      top: 'calc(100% + .5rem)',
      zIndex: 2,
      li: {
        color: theme.palette.black.main,
        svg: {
          color: theme.palette.gray3.main,
        },
        padding: '.5rem 1.25rem',
        display: 'flex',
        gap: '.5rem',
        '&:hover': {
          backgroundColor: theme.palette.white1.main,
        },
      },
    },
    '.btn-edit': {
      position: 'absolute',
      bottom: '.675rem',
      right: '-.25rem',
      width: '1rem',
      height: '1rem',
      backgroundColor: theme.palette.gray2.main,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      svg: {
        color: theme.palette.background.main,
        fontSize: '0.875rem',
      },
    },
  },
  '.form-control': {
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'center',
    '.input-label': {
      width: '5rem',
      minWidth: '5rem',
      fontSize: '0.875rem',
    },
  },
  '.form-submit': {
    display: 'flex',
    justifyContent: 'center',
    button: {
      width: '176px',
      height: '40px',
      color: theme.palette.background.main,
      backgroundColor: theme.palette.blue1.main,
      border: 'none',
    },
  },
}))
const FormInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const handleDeleteAvatar = async () => {
    const user = await dispatch(updateMe({ photo: '' }))
    toast.success('Xóa ảnh đại diện thành công')
    unwrapResult(user)
    setShowConfirm(false)
  }
  const form = useForm({
    defaultValues: {
      fullName: user.fullName || '',
      nickName: user.nickName || '',
      birthday: dayjs(new Date(user.birthday)) || '',
      gender: user.gender || '',
    },
    mode: 'onChange',
  })
  const handleUpdateUser = async (values) => {
    const clone = { ...values }

    if (dayjs(clone.birthday, 'DD-MM-YYYY', true).isValid()) {
      clone.birthday = clone.birthday.$d?.toString()
    } else {
      delete clone.birthday
    }
    const user = await dispatch(updateMe(clone))
    unwrapResult(user)
    toast.success('Cập nhập thông tin thành công')
  }
  const inputRef = useRef()
  const { show, setShow, nodeRef } = useClickOutSide('btn-edit')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModalImage, setShowModalImage] = useState(false)
  const [isImage, setIsImage] = useState(true)
  const handleModal = () => {
    if (!!user.avatar) {
      setShow(!show)
    } else {
      setIsImage(false)
      setShowModalImage(!showModalImage)
    }
  }
  return (
    <BoxMain onSubmit={form.handleSubmit(handleUpdateUser)}>
      <span className="info-title">Thông tin cá nhân</span>
      <Box className="form-avatar">
        <Box
          className="avatar-view"
          ref={nodeRef}
        >
          <Avatar
            sx={{ width: 100, height: 100 }}
            onClick={() => handleModal()}
            src={user.avatar ? getImage('users', user.avatar) : ''}
          />
          <div
            className="btn-edit"
            onClick={() => handleModal()}
          >
            <EditOutlinedIcon></EditOutlinedIcon>
          </div>
        </Box>
        <input
          ref={inputRef}
          hidden
          type="file"
          name="photo"
          accept="image/png, image/jpeg"
        ></input>
        {show && !!user.avatar && (
          <Paper
            className="avatar-option"
            elevation={3}
          >
            <ul>
              <li
                onClick={() => {
                  setIsImage(true)
                  setShowModalImage(true)
                }}
              >
                <ImageOutlinedIcon /> Xem ảnh đại diện
              </li>
              <li
                onClick={() => {
                  setIsImage(false)
                  setShowModalImage(true)
                }}
              >
                <VisibilityOutlinedIcon /> Cập nhập ảnh đại diện
              </li>
              <li onClick={() => setShowConfirm(true)}>
                <DeleteForeverOutlinedIcon /> Xóa ảnh đại diện
              </li>
            </ul>
          </Paper>
        )}
      </Box>
      <ConfirmMsg
        open={showConfirm}
        setOpen={setShowConfirm}
        title="Bạn có chắc muốn xoá ảnh đại diện ?"
        subTitle="Hình ảnh đại diện sẽ quay về mặc định"
        handleDelete={handleDeleteAvatar}
      />
      <ModalImage
        isImage={isImage}
        open={showModalImage}
        setOpen={setShowModalImage}
        title={isImage ? 'Xem ảnh đại diện' : 'Cập nhập ảnh đại diện'}
        image={user.avatar && isImage ? getImage('users', user.avatar) : ''}
      />
      <Box className="form-control">
        <span className="input-label">Họ & Tên</span>
        <InputField
          form={form}
          name="fullName"
          placeholder="Thêm họ tên"
          variant="outlined"
          type="search"
        />
      </Box>
      <Box className="form-control">
        <span className="input-label">NickName</span>
        <InputField
          form={form}
          name="nickName"
          placeholder="Thêm nickname"
          variant="outlined"
          type="search"
        />
      </Box>
      <Box className="form-control">
        <span className="input-label">Ngày sinh</span>
        <PickerDate
          form={form}
          name="birthday"
        />
      </Box>
      <Box className="form-control">
        <span className="input-label">Giới tính</span>
        <RadioField
          arr={[
            { value: 1, label: 'Nam' },
            { value: 2, label: 'Nữ' },
            { value: 3, label: 'Khác' },
          ]}
          name="gender"
          form={form}
        />
      </Box>
      <Box className="form-control form-submit">
        <button>Lưu thay đổi</button>
      </Box>
    </BoxMain>
  )
}

export default FormInfo
