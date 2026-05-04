import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

export default function useSocket() {
    const [socket, setSocket] = useState(null)

    useEffect(function() {
        const newSocket = io(SOCKET_URL)

        setSocket(newSocket)

        return function() {
            newSocket.disconnect()
        }
    }, [])

    return socket
}