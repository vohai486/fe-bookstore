import { AppBar, styled, Box, Badge, IconButton, Paper } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import { getCountUnRead } from '@/hooks/useSelector'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import useClickOutSide from '@/hooks/useClickOutSide'
import { markRead } from '@/redux/notifySlice'
import { unwrapResult } from '@reduxjs/toolkit'
const AppbarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: '0px 1px 1px rgb(0 0 0 / 12%)',
  height: '3.5rem',
  marginBottom: '1rem',
}))
const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '3rem',
}))
const BoxLogo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',

  img: {
    height: '2.5rem',
  },
  a: {
    display: 'inline-block',
  },
}))
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    color: 'white',
  },
}))
const HeaderAdmin = ({ toggleDrawer }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const listNotifyAdmin = useSelector((state) => state.notify.listNotifyAdmin)
  const { show, setShow, nodeRef } = useClickOutSide()
  const handleToggleMark = async (id, isRead, url) => {
    try {
      navigate(url)
      if (!isRead) {
        const data = await dispatch(markRead({ id, type: 'admin' }))
        unwrapResult(data)
      }
    } catch (error) {}
  }
  return (
    <AppbarStyled
      position="static"
      color="background"
    >
      <BoxContainer
        className={'container'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ cursor: 'pointer' }}>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon></MenuIcon>
          </IconButton>
        </Box>
        <BoxLogo>
          <Link to="/">
            <img
              src="/sv_header_login.png"
              alt=""
            />
          </Link>
        </BoxLogo>
        <Box
          sx={{ cursor: 'pointer', position: 'relative' }}
          ref={nodeRef}
          onClick={() => setShow(!show)}
        >
          <IconButton>
            <StyledBadge
              badgeContent={+useSelector(getCountUnRead) || 0}
              color="badge"
              max={99}
            >
              <NotificationsOutlinedIcon />
            </StyledBadge>
          </IconButton>
          {show && (
            <Paper
              sx={{
                position: 'absolute',
                minWidth: '350px',
                right: '0',
                padding: '.5rem 0',
                maxHeight: '400px',
                overflowY: 'scroll',
              }}
              elevation={2}
            >
              {listNotifyAdmin.length > 0 &&
                listNotifyAdmin.map((item) => (
                  <Box
                    sx={{
                      borderBottom: '1px solid #EFEFEF',
                      padding: '.5rem',
                      '&:hover': {
                        background: '#eee',
                      },
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    key={item._id}
                    onClick={() =>
                      handleToggleMark(item._id, item.isRead, item.url)
                    }
                  >
                    <Box>{item.text}</Box>
                    {!item.isRead && (
                      <Box
                        sx={{
                          color: '#0B74E5',
                        }}
                      >
                        <FiberManualRecordIcon />
                      </Box>
                    )}
                  </Box>
                ))}
            </Paper>
          )}
        </Box>
      </BoxContainer>
    </AppbarStyled>
  )
}

export default HeaderAdmin
