import InputField from '@/components/form-control/InputField'
import { Box, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import SelectField from '@/components/form-control/SelectField'
import RadioField from '@/components/form-control/RadioField'
import CheckBoxField from '@/components/form-control/CheckBoxField'
import { useDispatch } from 'react-redux'
import { addAddress, removeAddress, updateAddress } from '@/redux/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const BoxMain = styled('form')(({ theme }) => ({
  padding: '1rem',
  fontSize: '13px',
  marginTop: '.85rem',
  marginBottom: '.85rem',

  '.form-title': {
    fontSize: '1rem',
    color: theme.palette.gray2.main,
    fontWeight: 400,
    marginBottom: '.5rem',
  },
  '.form-control': {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    input: {
      padding: '.5rem',
    },
    '.input-label': {
      minWidth: '100px',
      width: '100px',
    },
    button: {
      border: 'none',
      borderRadius: '.25rem',
      padding: '.75rem 3rem',
      backgroundColor: theme.palette.warning.main,
      '&.btn-delete': {
        marginLeft: '.5rem',
        backgroundColor: theme.palette.red1.main,
        color: theme.palette.background.main,
      },
    },
    '&.form-radio': {
      marginBottom: 0,
    },
  },
}))
const FormAddress = ({ typeSubmit = 'add', setShow, address = {} }) => {
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    fullName: yup.string().required('Không được bỏ trống'),
    phoneNumber: yup.string().required('Không được bỏ trống'),
    street: yup.string().required('Không được bỏ trống'),
    delivery_address_type_name: yup
      .string()
      .oneOf(['home', 'company'], 'Vui lòng chọn'),
  })
  const form = useForm({
    defaultValues: {
      fullName: address.fullName || '',
      phoneNumber: address.phoneNumber || '',
      city: address.city || '',
      district: address.district || '',
      ward: address.ward || '',
      street: address.street || '',
      delivery_address_type_name: address.delivery_address_type_name || '',
      default: address.default || false,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const handleSubmitForm = async (values) => {
    if (typeSubmit === 'add') {
      try {
        values.codeCity = codeCity
        values.codeDistrict = codeDistrict
        values.codeWard = codeWard
        const list = await dispatch(addAddress(values))
        unwrapResult(list)
        setShow(false)
      } catch (error) {}
    } else {
      try {
        values.codeCity = codeCity
        values.codeDistrict = codeDistrict
        values.codeWard = codeWard
        const clone = { ...address, ...values }
        const list = await dispatch(
          updateAddress({
            _id: address._id,
            data: clone,
          })
        )
        unwrapResult(list)
        setShow(false)
      } catch (error) {}
    }
  }

  const handleRemove = async (id) => {
    try {
      const list = await dispatch(removeAddress(id))
      unwrapResult(list)
      setShow(false)
    } catch (error) {}
  }
  const [codeCity, setCodeCity] = useState(address.codeCity || '')
  const [codeDistrict, setCodeDistrict] = useState(address.codeDistrict || '')
  const [codeWard, setCodeWard] = useState(address.codeWard || '')
  const [listCity, setListCity] = useState([])
  const [listDistrict, setListDistrict] = useState([])
  const [listWard, setListWard] = useState([])
  useEffect(() => {
    ;(async () => {
      // const res = await fetch("https://provinces.open-api.vn/api/p/");
      const res = await fetch(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
        {
          headers: {
            token: 'c65a38bf-b468-11ed-b190-ea4934f9883e',
          },
        }
      )
      const data = await res.json()
      setListCity(data.data)
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      setListWard([])
      setListDistrict([])
      if (!codeCity) return
      const res = await fetch(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
        {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            token: 'c65a38bf-b468-11ed-b190-ea4934f9883e',
          },
          body: JSON.stringify({
            province_id: +codeCity,
          }),
        }
      )
      const data = await res.json()
      setListDistrict(data.data)
    })()
  }, [codeCity])
  useEffect(() => {
    ;(async () => {
      if (!codeDistrict) return
      const res = await fetch(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
        {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            token: 'c65a38bf-b468-11ed-b190-ea4934f9883e',
          },
          body: JSON.stringify({
            district_id: +codeDistrict,
          }),
        }
      )
      const data = await res.json()
      setListWard(data.data || [])
    })()
  }, [codeDistrict])

  return (
    <BoxMain
      onSubmit={form.handleSubmit(handleSubmitForm)}
      onReset={() => handleRemove(address._id)}
    >
      <h3 className="form-title info-title">
        {typeSubmit === 'add' ? 'Thêm địa chỉ mới' : 'Cập nhập địa chỉ'}
      </h3>
      <Box className="form-control">
        <span className="input-label ">Họ và tên: </span>
        <InputField
          form={form}
          name="fullName"
          placeholder="Nhập họ tên"
          variant="outlined"
        />
      </Box>
      <Box className="form-control">
        <span className="input-label">Số điện thoại: </span>
        <InputField
          form={form}
          name="phoneNumber"
          placeholder="Nhập số điện thoại"
          variant="outlined"
        />
      </Box>
      <Box className="form-control">
        <span className="input-label">Tỉnh thành phố: </span>
        <SelectField
          arr={listCity}
          name="city"
          placeholder="Chọn tỉnh/Thành phố"
          form={form}
          setFiled={setCodeCity}
        ></SelectField>
      </Box>
      <Box className="form-control">
        <span className="input-label">Quận huyện: </span>
        <SelectField
          name="district"
          placeholder="Chọn Quận/Huyện"
          form={form}
          arr={listDistrict}
          setFiled={setCodeDistrict}
        ></SelectField>
      </Box>
      <Box className="form-control">
        <span className="input-label">Phường xã: </span>
        <SelectField
          name="ward"
          placeholder="Chọn Phường/Xã"
          form={form}
          arr={listWard}
          setFiled={setCodeWard}
        ></SelectField>
      </Box>
      <Box className="form-control">
        <span className="input-label">Địa chỉ: </span>
        <InputField
          form={form}
          name="street"
          placeholder="Nhập địa chỉ"
          variant="outlined"
        />
      </Box>
      <Box className="form-control form-radio">
        <span className="input-label">Loại địa chỉ</span>
        <RadioField
          arr={[
            { value: 'home', label: 'Nhà riêng / Chung cư ' },
            { value: 'company', label: 'Cơ quan / Công ty' },
          ]}
          name="delivery_address_type_name"
          form={form}
        />
      </Box>
      <Box className="form-control">
        <span className="input-label"></span>
        <CheckBoxField
          form={form}
          name={'default'}
          title="Dùng làm mặc định"
        />
      </Box>
      <Box className="form-control">
        <span className="input-label"></span>
        <button
          type="submit"
          className="btn btn-update"
        >
          Cập nhật
        </button>
        {typeSubmit !== 'add' && (
          <button
            className="btn btn-delete"
            type="reset"
          >
            Xóa
          </button>
        )}
      </Box>
    </BoxMain>
  )
}

export default FormAddress
