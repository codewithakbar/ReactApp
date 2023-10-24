import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ProfelInfo from './pages/ProfilInfo/ProfelInfo'
import User from './pages/User/User'
import TaskInfo from './pages/TaskINfo/TaskInfo'
import UserPage from './pages/UserPage/UserPage'
import { useEffect } from 'react';
import UserTaskInfo from './pages/UserPage/UserTaskInfo'
import UserCards from './pages/UserPage/UserCards';
import ModalCss from './companents/Modal/Modal';

function App() {

  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])

  const is_admin = localStorage.getItem('is_admin')

  // Store a hashed value of is_admin
  function hash(value) {
    // You can use a more secure hashing algorithm in production
    return btoa(value);
  }

  // Function to set is_admin securely
  function setSecureIsAdmin(value) {
    const hashedValue = hash(value.toString());
    localStorage.setItem('secure_is_admin', is_admin);
  }

  // Function to check if the is_admin value is true
  function isUserAdmin() {
    const storedValue = localStorage.getItem('secure_is_admin');
    // Check if the stored value is not null and matches the hash of 'true'
    return storedValue !== null && storedValue === hash('true');
  }

  // Usage in your component
  const isAdmin = isUserAdmin();

  // To set is_admin
  setSecureIsAdmin(true);


  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        {
          is_admin === 'true' ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/Profil' element={<ProfelInfo />} />
              <Route path='/user' element={<User />} />
              <Route path='/TaskInfo/:id' element={<TaskInfo />} />
              <Route path='/Modal' element={<ModalCss/>} />
            </>
          ) : (
            <>
              <Route path='/UserTaskInfo/:id' element={<UserTaskInfo />} />
              <Route path='/Profil' element={<ProfelInfo />} />
              <Route path='/' element={<UserPage />} />
            </>
          )
        }
      </Routes>
    </>
  )
}

export default App