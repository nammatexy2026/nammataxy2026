import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { cabs } from '../../data'

// Components
import Home from './pages/Home'
import CabResults from './pages/CabResults'
import CabDetails from './pages/CabDetails'
import CheckoutForm from './pages/CheckoutForm'
import Success from './pages/Success'
import Profile from './pages/Profile'
import Bookings from './pages/Bookings'
import BottomNav from './components/BottomNav'
import EditProfile from './pages/EditProfile'
import ManageAddress from './pages/ManageAddress'
import { Terms, Privacy, Support } from './pages/StaticPages'

function UserModule() {
  const navigate = useNavigate()
  
  // Home Form States
  const [activeService, setActiveService] = useState('airport')
  const [airportMode, setAirportMode] = useState('pickup')
  const [location, setLocation] = useState('Fetching live location...')
  const [dropLocation, setDropLocation] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [outstationMode, setOutstationMode] = useState('oneway')
  const [returnDate, setReturnDate] = useState('')

  // User States
  const [selectedCab, setSelectedCab] = useState(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would reverse-geocode this
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Current Location)`);
        },
        (error) => {
          console.error("Location error:", error);
          setLocation('MG Road, Bengaluru, India');
        }
      );
    } else {
      setLocation('MG Road, Bengaluru, India');
    }
  }, [])

  const handleSearch = () => {
    navigate('/user/results')
  }

  const handleBookClick = () => {
    setIsCheckingAvailability(true)
    setTimeout(() => {
        setIsCheckingAvailability(false)
        navigate('/user/success')
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route index element={
          <Home 
            activeService={activeService}
            setActiveService={setActiveService}
            airportMode={airportMode}
            setAirportMode={setAirportMode}
            location={location}
            setLocation={setLocation}
            dropLocation={dropLocation}
            setDropLocation={setDropLocation}
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            pickupTime={pickupTime}
            setPickupTime={setPickupTime}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            outstationMode={outstationMode}
            setOutstationMode={setOutstationMode}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            handleSearch={handleSearch}
          />
        } />
        
        <Route path="results" element={
          <CabResults 
            cabs={cabs} 
            setView={(view) => navigate(view === 'home' ? '/user' : `/user/${view}`)} 
            setSelectedCab={setSelectedCab} 
          />
        } />

        <Route path="details" element={
          <CabDetails 
            selectedCab={selectedCab} 
            setView={(view) => navigate(view === 'results' ? '/user/results' : `/user/${view}`)} 
            location={location}
            dropLocation={dropLocation}
            pickupDate={pickupDate}
            pickupTime={pickupTime}
          />
        } />

        <Route path="checkout" element={
          <CheckoutForm 
            selectedCab={selectedCab}
            setView={(view) => navigate(view === 'details' ? '/user/details' : `/user/${view}`)}
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            phoneNumber={phoneNumber}
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            handleBookClick={handleBookClick}
            isCheckingAvailability={isCheckingAvailability}
          />
        } />

        <Route path="success" element={
          <Success 
            selectedCab={selectedCab} 
            setView={(view) => navigate('/user')} 
          />
        } />

        <Route path="bookings" element={<Bookings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="manage-address" element={<ManageAddress />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="support" element={<Support />} />
      </Routes>

      {/* Global Spacer */}
      <div className="h-44"></div>

      <BottomNav />
    </div>
  )
}

export default UserModule;
