import { markReadChatAdmin } from '@/redux/chatSlice'
import { getImage, timeSince } from '@/utils/common'
import { Avatar, Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
const SiderbarChat = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const listUserChat = useSelector((state) => state.chat.listUserChat)
  console.log(listUserChat)
  return (
    <Paper
      elevation={0}
      sx={{
        overflowY: 'scroll',
        padding: '.5rem 0',
        paddingRight: '.25rem',
        height: '100%',
        'a.active': {
          backgroundColor: theme.palette.white2.main,
        },
      }}
    >
      {listUserChat.length > 0 &&
        listUserChat.map((item) => (
          <NavLink
            key={item._id}
            style={{
              borderRadius: '.5rem',
              padding: '.5rem .75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              cursor: 'pointer',
            }}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={async () => {
              if (!item.isRead) {
                dispatch(markReadChatAdmin(item.chatId))
              }
            }}
            to={`/admin/chat/${item._id}`}
          >
            <Avatar src={getImage('users', item.userInfo?.avatar)}></Avatar>
            <Box>
              <Box sx={{ fontSize: '15px', color: theme.palette.back1.main }}>
                {item.userInfo.fullName}
              </Box>
              <Box
                sx={{
                  fontSize: '13px',
                  display: '-webkit-box',
                  '-webkitBoxOrient': 'vertical',
                  '-webkitLineClamp': '1',
                  overflow: 'hidden',
                  color:
                    !item.isRead && item.sender
                      ? theme.palette.blue1.main
                      : theme.palette.gray3.main,
                  fontWeight: !item.isRead && item.sender ? 500 : 'unset',
                }}
              >
                {!item.sender && 'Bạn : '}
                {item.message} <span>&#8226; </span>
                {timeSince(item.createdAt)?.value +
                  ' ' +
                  timeSince(item.createdAt)?.unit}
              </Box>
            </Box>
            {!item.isRead && item.sender && (
              <FiberManualRecordIcon
                sx={{
                  fontSize: '10px',
                  marginLeft: 'auto',
                  color: theme.palette.blue1.main,
                }}
              ></FiberManualRecordIcon>
            )}
          </NavLink>
        ))}
    </Paper>
  )
}

export default SiderbarChat
