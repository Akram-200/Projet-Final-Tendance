import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBox from './components/ChatBox'
import VideoChat from './components/VideoChat'

export default function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>

            <VideoChat />
            <ChatBox />
            <Footer />
        </>
    )
}