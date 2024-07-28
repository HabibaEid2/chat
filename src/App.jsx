import 'react-image-crop/dist/ReactCrop.css'
import './constant/css/bootstrap.min.css'
import './constant/css/all.min.css'
import './App.css'
import Register from './pages/register/mainRegisterPage/Register'
import { Route, Routes } from 'react-router-dom'
import Chats from './pages/chats/Chats'
import MainBar from './components/main-bar/MainBar'
import Status from './pages/status/Status'
import Calls from './pages/calls/Calls'
import { io } from 'socket.io-client'
import Home from './pages/home/Home'
import { Cookies } from 'react-cookie'
import Login from './pages/register/login/Login'
import SignUp from './pages/register/signUp/SignUp'

function App() {
  // const socket = io("", { transport: ['websocket', 'polling', 'flashsocket'] });

  const cookie = new Cookies() ; 
  return (
    <>
    <Routes>
      <Route
        element = {cookie.get("token")?<Home/>: <Login/> } 
        path= {cookie.get("token")?"/home" : "/login" }/>
      <Route />
      <Route element = {<Home/>} path='/chat-app'>
        <Route element = {<Chats/>} path='/chat-app'/>
        <Route element = {<Chats/>} path='chats'/>
        <Route element = {<Status/>} path='status'/>
        <Route element = {<Calls/>} path='calls'/>
      </Route>
      <Route element = {<Register type = "login"/>} path='/chat-app/login'/>
      <Route element = {<Register type = "register"/>} path='/chat-app/register'/>
    </Routes>
    </>

  )
}
export default App
