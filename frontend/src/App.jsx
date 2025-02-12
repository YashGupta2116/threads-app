import React from 'react'
import LoginPage from './pages/LoginPage'

import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage /> } />
        <Route path='/login' element={<LoginPage/> } />
        <Route path='/signup' element={<SignUpPage /> } />
      </Routes>
    </Router>
  )
}

export default App