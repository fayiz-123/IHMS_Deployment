import React from "react"
import { Route,Routes } from "react-router-dom"
import Home from './pages/Home'
import LoginPage from "./pages/LoginPage"
import SignUp from "./pages/SignUp"
import Electricity from "./pages/Electricity"
import Plumbing from "./pages/Plumbing"
import WasteManagement from "./pages/WasteManagement"
import About from "./pages/About"
import Contact from "./pages/Contact"
import BookingForm from "./components/BookingForm"
import AdminDash from "./pages/AdminDash"
import AdminLogin from "./pages/AdminLogin"
import AdminRegistration from "./pages/AdminRegistration"
import UserServices from "./pages/UserServices"
import ContactMessages from "./pages/ContactMessages"
import UserBookedServices from "./pages/UserBookedServices"
import OtpVerification from "./pages/OtpVerification"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Profile from "./pages/Profile"


function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/electricity" element={<Electricity/>}/>
      <Route path="/plumbing" element={<Plumbing/>}/>
      <Route path="/wastemanagement" element={<WasteManagement/>}/>
       <Route path="/book-now" element={<BookingForm/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/myBookings" element={<UserBookedServices />} />
      <Route path="/admin-dashboard" element={<AdminDash/>}/>
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/adminRegistration" element={<AdminRegistration/>}/>
      <Route path="/userBookings" element={<UserServices/>}/>
      <Route path="/contactMessages" element={<ContactMessages />} />


     



      
    </Routes>
    
    
    </>
  )
}
export default App
