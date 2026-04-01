import { HashRouter, Routes, Route } from 'react-router-dom'
import { UIProvider } from './contexts/UIContext'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Market from './pages/Market'
import Canvas from './pages/Canvas'
import Profile from './pages/Profile'
import Shop from './pages/Shop'
import Community from './pages/Community'

export default function App() {
  return (
    <UIProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/studio" element={<Upload />} />
        <Route path="/market" element={<Market />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </HashRouter>
    </UIProvider>
  )
}
