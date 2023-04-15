import {
  Avatar,
  Box,
  IconButton,
  Paper,
  TextField,
  useTheme,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, getMessages } from '@/redux/chatSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { getImage } from '@/utils/common'
import { useSocket } from '@/contexts/socketContext'
const ModalChatBox = ({ setShowChatBox, user }) => {
  const { socket } = useSocket()
  const scroll = useRef()
  const theme = useTheme()
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.chat.messages)
  const [text, setText] = useState('')
  useEffect(() => {
    ;(async () => {
      const list = await dispatch(getMessages(user._id))
      unwrapResult(list)
    })()
  }, [user, dispatch])
  const handleAddMessage = async () => {
    if (text.trim().length === 0) return
    const message = await dispatch(
      createMessage({
        type: 'user',
        data: {
          message: text,
          sender: true,
          user: user._id,
        },
      })
    )
    const data = unwrapResult(message)
    socket && socket.emit('clientSendMessages', data)
    setText('')
  }
  useEffect(() => {
    scroll.current &&
      scroll.current?.scroll({
        top: scroll.current.scrollHeight,
        behavior: 'smooth',
      })
  }, [messages])
  return (
    <Paper
      elevation={3}
      sx={{
        color: theme.palette.black3.main,
        position: 'fixed',
        zIndex: 999,
        bottom: '40px',
        right: '40px',
        width: '360px',
      }}
    >
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Avatar src={getImage('users', user.avatar)} />
          {user.fullName}
        </Box>
        <IconButton onClick={() => setShowChatBox((prev) => !prev)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Box
        className="box-border"
        ref={scroll}
        sx={{
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '1rem 0',
          fontSize: '.875rem',
          display: 'flex',
          flexDirection: 'column-reverse',
          '.message': {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 'calc(100% - 20px)',
            padding: '0 2rem',
            position: 'relative',
            '.text': {
              borderRadius: '.5rem',
              padding: '.5rem .75rem',
            },
            '.time': {
              fontSize: '.625rem',
              color: theme.palette.third.main,
            },
            '&.admin': {
              alignSelf: 'flex-start',
              '.text': {
                background: theme.palette.white1.main,
                color: theme.palette.first.main,
              },
            },
            '&.user': {
              alignSelf: 'flex-end',
              '.text': {
                background: theme.palette.blue1.main,
                color: theme.palette.background.main,
              },
              '.time': {
                alignSelf: 'flex-end',
              },
            },
          },
        }}
      >
        {messages.length > 0 &&
          messages.map((item) => (
            <Box
              key={item._id}
              className={`message animation-bounce ${
                item.sender ? 'user' : 'admin'
              }`}
            >
              {!item.sender && (
                <Avatar
                  src="https://images.unsplash.com/photo-1680790515529-6a9278b541ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  sx={{
                    width: '20px',
                    height: '20px',
                    position: 'absolute',
                    left: '5%',
                  }}
                ></Avatar>
              )}
              <Box className="text">{item.message}</Box>
              <span className="time">
                {dayjs(item.createdAt).format('HH:mm')}
              </span>
            </Box>
          ))}
      </Box>
      <form
        style={{ padding: '.5rem 1rem', display: 'flex', gap: '.5rem' }}
        className="box-border"
        onSubmit={(e) => {
          e.preventDefault()
          handleAddMessage()
        }}
      >
        <TextField
          variant="standard"
          fullWidth
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        ></TextField>
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </Paper>
  )
}

export default ModalChatBox
