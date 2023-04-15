import React, { useEffect, useRef } from 'react'

import audiobell from './audio/got-it-done-613.mp3'
import { useSocket } from './contexts/socketContext'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNotifyAdmin,
  addNotifyUser,
  createNotifyAdmin,
  getNotifyAdmin,
  getNotifyUser,
} from './redux/notifySlice'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addOrder,
  getListOrderMy,
  getOrders,
  updateListOrderMy,
  updateOrder,
} from './redux/orderSlice'
import {
  addMessage,
  getListUserChat,
  markReadChatAdmin,
} from './redux/chatSlice'

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  }
  let n = new Notification(title, options)

  n.onclick = (e) => {
    e.preventDefault()
    window.open(url, '_blank')
  }
}

const SocketClient = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { socket, setListAdminsOnl, setListUsersOnl } = useSocket()
  const loggedInUser = useSelector((state) => state.user.currentUser)
  useEffect(() => {
    if (socket === null || !loggedInUser?._id) return
    socket.emit('addOnline', {
      userId: loggedInUser?._id,
      role: loggedInUser?.role,
    })
    socket.on('getOnline', (res) => {
      setListAdminsOnl(res.onlineAdmins)
      setListUsersOnl(res.onlineUsers)
    })
    socket.on('notifyOrderToAdmin', async (res) => {
      dispatch(addNotifyAdmin(res))
      audioRef.current.play()
      toast.dark(
        <div
          onClick={() => {
            navigate(res.url)
          }}
        >
          {res.text}
        </div>,
        {
          autoClose: 3000,
        }
      )
    })
    socket.on('notifyOrderToUser', async (res) => {
      const { notify, data } = res
      dispatch(updateListOrderMy(data))
      dispatch(addNotifyUser(notify))
      audioRef.current.play()
      toast.success(
        <div
          onClick={() => {
            navigate(notify.url)
          }}
        >
          {notify.text}
        </div>
      )
    })
    socket.on('addMessageToAdmin', async (res) => {
      const pathName = new URL(window.location.href).pathname
      console.log(res)
      if (pathName.includes(res.data.user._id)) {
        dispatch(addMessage(res))
      }
      const list = await dispatch(getListUserChat())
      unwrapResult(list)
      if (pathName.includes(res.data.user._id)) {
        const message = dispatch(markReadChatAdmin(res.data._id))
        unwrapResult(message)
      }
      audioRef.current.play()
    })
    socket.on('addMessageToClient', async (res) => {
      audioRef.current.play()
      dispatch(addMessage(res))
    })
    socket.on('addOrder', (res) => {
      dispatch(addOrder(res))
    })
    socket.on('updateOrder', async (res) => {
      const list = await dispatch(updateOrder(res))
      unwrapResult(list)
    })

    return () => {
      socket.off('addMessageToClient')
      socket.off('addMessageToAdmin')
      socket.off('getOnline')
      socket.off('notifyOrderToAdmin')
      socket.off('notifyOrderToUser')
      socket.off('addOrder')
      socket.off('updateOrder')
      audioRef.current && audioRef.current.pause()
    }
  }, [socket])

  const audioRef = useRef()

  return (
    <>
      <audio
        controls
        ref={audioRef}
        style={{ display: 'none' }}
      >
        <source
          src={audiobell}
          type="audio/mp3"
        />
      </audio>
    </>
  )
}

export default SocketClient
