import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Layout from './components/layout.jsx';
import Login from './pages/login.jsx';

function App() {
  const token = localStorage.getItem('accessToken');
  const navigate =  useNavigate()
  useEffect(()=>{
    if(!token) navigate('/login')

  },[token])
  return token ? <Layout><Outlet/></Layout>:<Login/>
}

export default App