import { Routes, Route } from 'react-router-dom'
import LandingPage from './modules/user/pages/LandingPage'
import UserModule from './modules/user/UserModule'
import AdminModule from './modules/admin/AdminModule'
import DriverModule from './modules/driver/DriverModule'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/*" element={<UserModule />} />
      <Route path="/admin/*" element={<AdminModule />} />
      <Route path="/driver/*" element={<DriverModule />} />
    </Routes>
  )
}

export default App
