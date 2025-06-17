import React, { useEffect } from 'react'
import {Routes, Route, Link, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import axiosInstance from './lib/axios.js'
import axios from 'axios'
import {useAuthstore} from './store/useAuthstore.js'

import {Loader} from 'lucide-react'
import Setting from './components/Setting.jsx'
import {Toaster} from 'react-hot-toast'
import Profile from './components/Profile.jsx'

const App = () => {
  const {authUser,checkAuth, ischeckingAuth}=useAuthstore()

  useEffect(() => {
    checkAuth()
  
    
  }, [checkAuth])

  if(ischeckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
        <Loader classname="size-10 animate-spin"></Loader>

    </div>


  )
  
  return (
    <div>
      <Toaster></Toaster>
      <Navbar></Navbar>
      
      <Routes>
        <Route path='/login' element={!authUser ? <Login></Login> : <Navigate to="/"></Navigate>}></Route>
        <Route path='/' element={authUser?  <Home></Home>: <Navigate to="/login"></Navigate>}></Route>
        <Route path='/signup' element={!authUser ? <Signup></Signup> : <Navigate to="/"></Navigate>}></Route>
        <Route path='/setting' element={authUser ?<Setting></Setting> : <Navigate to="/login"></Navigate>}></Route>
        <Route path='/profile' element={authUser ?<Profile></Profile> : <Navigate to="/login"></Navigate>}></Route>
        


      </Routes>
      
    </div>
  )
}

export default App
