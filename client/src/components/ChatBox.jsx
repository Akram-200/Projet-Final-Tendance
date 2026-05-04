import { useEffect, useState } from 'react'
import useSocket from '../hooks/useSocket'

export default function ChatBox() {
    const socket = useSocket()

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [savedUsername, setSavedUsername] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [usersCount, setUsersCount] = useState(0)
    const [typingText, setTypingText] = useState('')
    const [newMessage, setNewMessage] = useState(false)

    useEffect(function() {
        if (!socket) return

        socket.on('users:count', function(count) {
            setUsersCount(count)
        })

        socket.on('message:receive', function(receivedMessage) {
            setMessages(function(oldMessages) {
                return [...oldMessages, receivedMessage]
            })

            if (!open) {
                setNewMessage(true)
            }
        })

        socket.on('user:typing', function(name) {
            if (name) {
                setTypingText(name + ' est en train d’écrire...')
            } else {
                setTypingText('')
            }
        })

        return function() {
            socket.off('users:count')
            socket.off('message:receive')
            socket.off('user:typing')
        }
    }, [socket, open])

    function saveUsername() {
        if (!username.trim()) return

        setSavedUsername(username)
        socket.emit('user:joined', username)
    }

    function sendMessage(event) {
        event.preventDefault()

        if (!message.trim()) return
        if (!savedUsername) return

        socket.emit('message:send', {
            username: savedUsername,
            text: message,
            time: new Date().toLocaleTimeString()
        })

        setMessage('')
        socket.emit('user:typing', '')
    }

    function handleTyping(event) {
        setMessage(event.target.value)

        if (savedUsername) {
            socket.emit('user:typing', savedUsername)

            setTimeout(function() {
                socket.emit('user:typing', '')
            }, 800)
        }
    }

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {open && (
                <div className="w-80 bg-white border shadow-xl rounded-xl p-4">
                    <div className="flex justify-between mb-3">
                        <h3 className="font-bold">Chat</h3>
                        <p className="text-sm">{usersCount} connecté(s)</p>
                    </div>

                    {!savedUsername ? (
                        <div>
                            <input
                                value={username}
                                onChange={function(event) {
                                    setUsername(event.target.value)
                                }}
                                placeholder="Votre pseudo"
                                className="border p-2 w-full mb-2"
                            />

                            <button
                                onClick={saveUsername}
                                className="bg-black text-white p-2 w-full"
                            >
                                Entrer
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="h-64 overflow-y-auto bg-gray-100 p-2 mb-2 rounded">
                                {messages.map(function(item, index) {
                                    return (
                                        <div key={index} className="mb-3">
                                            <p className="font-bold">{item.username}</p>
                                            <p>{item.text}</p>
                                            <p className="text-xs text-gray-500">{item.time}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <p className="text-sm text-blue-600 h-5">{typingText}</p>

                            <form onSubmit={sendMessage} className="flex gap-2">
                                <input
                                    value={message}
                                    onChange={handleTyping}
                                    placeholder="Message"
                                    className="border p-2 flex-1"
                                />

                                <button className="bg-black text-white p-2">
                                    OK
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={function() {
                    setOpen(!open)
                    setNewMessage(false)
                }}
                className="bg-black text-white rounded-full px-5 py-3 shadow"
            >
                {newMessage ? 'Nouveau message' : 'Chat'}
            </button>
        </div>
    )
}