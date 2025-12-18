import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import LoginScreen from './LoginScreen'
import BookScreen from './BookScreen'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

axios.defaults.baseURL = "http://localhost:3000"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `bearer ${savedToken}`;
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('access_token', token);
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />
          } />
        <Route 
          path="/" 
          element={
            isAuthenticated ? <BookScreen /> : <Navigate to="/login" />
          } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

