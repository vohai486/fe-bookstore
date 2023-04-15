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
import { useParams } from 'react-router-dom'
import chatApi from '@/api/axiosChat'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import {
  createMessage,
  getListUserChat,
  getMessagesAdmin,
} from '@/redux/chatSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { getImage } from '@/utils/common'
import { useSocket } from '@/contexts/socketContext'

const DetailsChat = () => {
  const [text, setText] = useState('')
  const { socket } = useSocket()
  const theme = useTheme()
  const messages = useSelector((state) => state.chat.messagesAdmin)
  const id = useParams().id
  const dispatch = useDispatch()
  const scroll = useRef()
  const handleAddMessage = async () => {
    if (text.trim().length === 0) return
    const [message, list] = await Promise.all([
      dispatch(
        createMessage({
          type: 'admin',
          data: {
            message: text,
            sender: false,
            user: id,
          },
        })
      ),
      dispatch(getListUserChat()),
    ])
    unwrapResult(list)
    setText('')
    const data = unwrapResult(message)
    socket && socket.emit('adminSendMessage', data)
  }
  useEffect(() => {
    ;(async () => {
      const list = await dispatch(getMessagesAdmin(id))
      unwrapResult(list)
    })()
  }, [id])
  useEffect(() => {
    scroll.current &&
      scroll.current?.scroll({
        top: scroll.current.scrollHeight,
        behavior: 'smooth',
      })
  }, [messages])
  return (
    <Paper
      elevation={0}
      sx={{ height: '100%' }}
    >
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '20px',
          borderBottom: `1px solid ${theme.palette.white2.main}`,
        }}
      >
        <Avatar
          src={getImage(
            'users',
            messages.length > 0 && messages[messages.length - 1].user.avatar
          )}
        ></Avatar>
        {messages.length > 0 && messages[messages.length - 1].user.fullName}
      </Box>
      <Box
        sx={{
          padding: '1rem',
          height: 'calc(100% - 73px - 57px)',
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
        ref={scroll}
      >
        {messages.length > 0 &&
          messages.map((item) => (
            <Box
              key={item._id}
              sx={{
                alignSelf: item.sender ? 'flex-start' : 'flex-end',
                maxWidth: 'calc(50% - 30px)',
                display: 'flex',
                flexDirection: 'column',
                '.time': {
                  alignSelf: item.sender ? '' : 'flex-end',
                  color: theme.palette.third.main,
                  fontSize: '.75rem',
                },
              }}
            >
              <Box sx={{ display: 'flex', gap: '.5rem' }}>
                {item.sender && (
                  <Avatar
                    src={getImage(
                      'users',
                      messages.length > 0 &&
                        messages[messages.length - 1].user.avatar
                    )}
                    sx={{
                      width: '30px',
                      height: '30px',
                    }}
                  ></Avatar>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      background: !item.sender
                        ? theme.palette.blue1.main
                        : theme.palette.white1.main,
                      color: !item.sender
                        ? theme.palette.background.main
                        : theme.palette.first.main,
                      padding: '.5rem .75rem',
                      borderRadius: '.5rem',
                    }}
                    className="animation-bounce"
                  >
                    {item.message}
                  </Box>
                  <Box className="time">
                    {dayjs(item.createdAt).format('HH:mm')}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
      <Box>
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
      </Box>
    </Paper>
  )
}

export default DetailsChat
