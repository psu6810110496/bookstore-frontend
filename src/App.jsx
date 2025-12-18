import './App.css';
import axios from 'axios'
import LoginScreen from './LoginScreen';

axios.defaults.baseURL = "http://localhost:3000"

function App() {
  const handleLoginSuccess = (token) => {
    alert(`Login Success!!!`)
  }
  return (
    <>
      <LoginScreen onLoginSuccess={handleLoginSuccess}/>
    </>
  );
}

export default App;