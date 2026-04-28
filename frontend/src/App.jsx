import { Routes, Route } from 'react-router-dom'
import LandingPage from './modules/user/pages/LandingPage'
import UserModule from './modules/user/UserModule'
import AdminModule from './modules/admin/AdminModule'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/*" element={<UserModule />} />
      <Route path="/admin/*" element={<AdminModule />} />
    </Routes>
  )
}

export default App
