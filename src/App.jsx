import './App.css'
import axios from 'axios'
import { useState } from 'react'
import LoginScreen from './LoginScreen'
import BookScreen from './BookScreen'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

axios.defaults.baseURL = "http://localhost:3000"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleLoginSuccess = () => { setIsAuthenticated(true) }

  return (
    <Router>
      <Routes>
        {/* หน้า Login: ถ้าLogin แล้วให้Redirect ไปหน้าหลักอัตโนมัติ */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />
          } 
        />

        {/* หน้าหลัก BookScreen: ถ้ายังไม่Login ให้Redirect ไปหน้า Login */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <BookScreen /> : <Navigate to="/login" />
          } 
        />

        {/* อื่นๆที่ไม่รู้จัก ให้กลับไปหน้าหลัก */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

