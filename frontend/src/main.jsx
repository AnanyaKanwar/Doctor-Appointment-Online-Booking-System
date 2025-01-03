import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContextProvider>
  <ToastContainer theme='dark' position='top-right' autoClose={3000} closeOnClick pauseOnHover />
  
    <App />
    </AuthContextProvider>
  </BrowserRouter>
)
