import 'react-image-crop/dist/ReactCrop.css'
import './constant/css/bootstrap.min.css'
import './constant/css/all.min.css'
import './App.css'
import Register from './pages/register/mainRegisterPage/Register'
import { Route, Routes } from 'react-router-dom'
import Chats from './pages/chats/Chats'
import Status from './pages/status/Status'
import Calls from './pages/calls/Calls'
import { io } from 'socket.io-client'
import Home from './pages/home/Home'
import { useSelector } from 'react-redux'

function App() {
  const token = useSelector(state => state.token) ; 
  // connect socket
  const socket = io.connect("http://localhost:3000" , {
    auth : {
      token : token , 
    }
  })

  
  return (
    <>
    <Routes>
      {token ? 
        <Route element = {<Home/>} path='/chat-app'>
          <Route element = {<Chats/>} path='/chat-app'/>
          <Route element = {<Chats/>} path='chats'/>
          <Route element = {<Status/>} path='status'/>
          <Route element = {<Calls/>} path='calls'/>
        </Route> : 
        <Route element = {<Register type = "login"/>} path='/chat-app/*'/>
      }
      <Route element = {<Register type = "login"/>} path='/chat-app/login'/>
      <Route element = {<Register type = "register"/>} path='/chat-app/register'/>
    </Routes>
    </>

  )
}
export default App
