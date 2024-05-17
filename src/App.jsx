import { useEffect } from 'react'
import {Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import List from './components/List'



function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(!user && !localStorage.getItem("token") && !localStorage.getItem("email")){
      
        navigate('/signup')
      }
      else{
        
        navigate('/')
      }
    })
  }, [])

  return (
   

     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/table" element={<List/>}/>
     
      
    </Routes>

   
  
  )
}

export default App