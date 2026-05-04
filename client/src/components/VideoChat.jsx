import { useEffect, useRef, useState } from 'react'
import useSocket from '../hooks/useSocket'

const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302'
        }
    ]
}

export default function VideoChat() {
    const socket = useSocket()

    const localVideoRef = useRef(null)
    const remoteVideoRef = useRef(null)
    const peerRef = useRef(null)
    const localStreamRef = useRef(null)

    const [room, setRoom] = useState('test')
    const [status, setStatus] = useState('Déconnecté')
    const [muted, setMuted] = useState(false)
    const [cameraOff, setCameraOff] = useState(false)

    useEffect(function() {
        if (!socket) return

        socket.on('video:user-joined', async function() {
            if (localStreamRef.current) {
                await createOffer()
            }
        })

        socket.on('video:offer', async function(data) {
            await startCamera()
            createPeerConnection()

            await peerRef.current.setRemoteDescription(
                new RTCSessionDescription(data.offer)
            )

            const answer = await peerRef.current.createAnswer()

            await peerRef.current.setLocalDescription(answer)

            socket.emit('video:answer', {
                room: room,
                answer: answer
            })

            setStatus('Réponse envoyée')
        })

        socket.on('video:answer', async function(data) {
            await peerRef.current.setRemoteDescription(
                new RTCSessionDescription(data.answer)
            )

            setStatus('Connexion établie')
        })

        socket.on('video:ice', async function(data) {
            if (data.candidate && peerRef.current) {
                await peerRef.current.addIceCandidate(
                    new RTCIceCandidate(data.candidate)
                )
            }
        })

        return function() {
            socket.off('video:user-joined')
            socket.off('video:offer')
            socket.off('video:answer')
            socket.off('video:ice')
        }
    }, [socket, room])

    async function startCamera() {
        if (localStreamRef.current) return

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })

            localStreamRef.current = stream
            localVideoRef.current.srcObject = stream

            setStatus('Caméra et micro activés')
        } catch (error) {
            setStatus('Caméra ou micro refusé')
        }
    }

    function createPeerConnection() {
        peerRef.current = new RTCPeerConnection(configuration)

        localStreamRef.current.getTracks().forEach(function(track) {
            peerRef.current.addTrack(track, localStreamRef.current)
        })

        peerRef.current.ontrack = function(event) {
            remoteVideoRef.current.srcObject = event.streams[0]
            setStatus('Connexion établie')
        }

        peerRef.current.onicecandidate = function(event) {
            if (event.candidate) {
                socket.emit('video:ice', {
                    room: room,
                    candidate: event.candidate
                })
            }
        }
    }

    async function joinRoom() {
        await startCamera()

        socket.emit('video:join', room)

        setStatus('Room rejointe : ' + room)
    }

    async function createOffer() {
        createPeerConnection()

        const offer = await peerRef.current.createOffer()

        await peerRef.current.setLocalDescription(offer)

        socket.emit('video:offer', {
            room: room,
            offer: offer
        })

        setStatus('Offre envoyée')
    }

    function toggleMute() {
        const audioTrack = localStreamRef.current?.getAudioTracks()[0]

        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled
            setMuted(!audioTrack.enabled)
        }
    }

    function toggleCamera() {
        const videoTrack = localStreamRef.current?.getVideoTracks()[0]

        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled
            setCameraOff(!videoTrack.enabled)
        }
    }

    function endCall() {
        if (peerRef.current) {
            peerRef.current.close()
        }

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(function(track) {
                track.stop()
            })
        }

        peerRef.current = null
        localStreamRef.current = null

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null
        }

        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null
        }

        setStatus('Appel terminé')
    }

    return (
        <section className="p-10">
            <h2 className="text-3xl font-bold mb-4">Vidéo en temps réel</h2>

            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    value={room}
                    onChange={function(event) {
                        setRoom(event.target.value)
                    }}
                    className="border p-2"
                />

                <button onClick={joinRoom} className="bg-black text-white p-2">
                    Démarrer
                </button>

                <button onClick={toggleMute} className="border p-2">
                    {muted ? 'Activer micro' : 'Couper micro'}
                </button>

                <button onClick={toggleCamera} className="border p-2">
                    {cameraOff ? 'Activer caméra' : 'Couper caméra'}
                </button>

                <button onClick={endCall} className="bg-red-600 text-white p-2">
                    Terminer
                </button>
            </div>

            <p className="mb-4">{status}</p>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p className="mb-2">Ma caméra</p>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="bg-black w-full h-64 object-cover"
                    ></video>
                </div>

                <div>
                    <p className="mb-2">Caméra distante</p>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="bg-black w-full h-64 object-cover"
                    ></video>
                </div>
            </div>
        </section>
    )
}