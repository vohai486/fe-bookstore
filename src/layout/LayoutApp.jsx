import { Box } from '@mui/material'
import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '@/components/footer/Footer'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import ModalChatBox from '@/components/modal/ModalChatBox'
import { useSelector } from 'react-redux'
const LayoutApp = ({ children }) => {
  const [showChatBox, setShowChatBox] = useState(false)
  const loggedInUser = useSelector((state) => state.user.currentUser)
  const isloggedIn = !!loggedInUser._id
  return (
    <>
      <Header></Header>
      <Box className="container main">{children}</Box>
      {isloggedIn && loggedInUser.role !== 'admin' && showChatBox && (
        <ModalChatBox
          user={loggedInUser}
          setShowChatBox={setShowChatBox}
        />
      )}
      {isloggedIn && loggedInUser.role !== 'admin' && !showChatBox && (
        <Box
          onClick={() => setShowChatBox(!showChatBox)}
          sx={{
            position: 'fixed',
            zIndex: 999,
            bottom: '40px',
            right: '40px',
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgb(0, 96, 255)',
            cursor: 'pointer',
            svg: {
              color: '#fff',
            },
          }}
        >
          <MessageOutlinedIcon />
        </Box>
      )}

      <Footer></Footer>
    </>
  )
}

export default LayoutApp
