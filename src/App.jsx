import './App.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Track from './Components/Track'
import NotFound from './Components/NotFound'
import { UserContext } from './contexts/UserContext'
import {useState } from 'react'
import Private from './Components/Private'
import Diet from './Components/Diet'

function App() {

  const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem("nutrify-user")));
 

  return (
    <>
        
     <UserContext.Provider value={{loggedUser,setLoggedUser}}>

     <BrowserRouter>
     
     <Routes>

        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/track' element={<Private Component={Track}/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/diet' element={<Private Component={Diet}/>} />

     </Routes>

     </BrowserRouter>

    </UserContext.Provider>
    
    </>
  )
}

export default App