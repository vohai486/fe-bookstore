import { getListAddress } from '@/redux/userSlice'
import {
  Box,
  Grid,
  Paper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FormInfo from '../components/editUser/FormInfo'
import ListAddress from '@/components/address/ListAddress'

const BoxMain = styled(Box)(({ theme }) => ({
  '.info-title': {
    color: theme.palette.gray2.main,
    fontSize: '1rem',
  },
}))
const EditUserPage = () => {
  const theme = useTheme()
  const isBreakpointDown831 = useMediaQuery(theme.breakpoints.down(831))
  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      const list = dispatch(getListAddress())
      unwrapResult(list)
    })()
  }, [])
  return (
    <BoxMain>
      <Typography variant="h2">Thông tin tài khoản</Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={!isBreakpointDown831 ? 5 : 12}
        >
          <Paper elevation={0}>
            <FormInfo />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={!isBreakpointDown831 ? 7 : 12}
        >
          <ListAddress />
        </Grid>
      </Grid>
    </BoxMain>
  )
}

export default EditUserPage
