import { STATIC_HOST } from '@/constants/common'
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socketContext = createContext()

function SocketProvider({ children, user }) {
  const [socket, setSocket] = useState(null)
  const [listAdminsOnl, setListAdminsOnl] = useState([])
  const [listUsersOnl, setListUsersOnl] = useState([])

  const value = {
    socket,
    setListAdminsOnl,
    listAdminsOnl,
    setListUsersOnl,
    listUsersOnl,
  }
  console.log('admin', listAdminsOnl)
  console.log('user', listUsersOnl)

  useEffect(() => {
    const newSocket = io(STATIC_HOST)
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [user])

  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  )
}

function useSocket() {
  const context = useContext(socketContext)
  if (typeof context === 'undefined')
    throw new Error('useSocket must be used within a socketProvider')
  return context
}

export { useSocket, SocketProvider }
