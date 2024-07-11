import 'react-image-crop/dist/ReactCrop.css'
import './constant/css/bootstrap.min.css'
import './constant/css/all.min.css'
import './App.css'
import Register from './pages/register/Register'
import { Route, Routes } from 'react-router-dom'
import Chats from './pages/mainPage/chats/Chats'
import MainPage from './pages/mainPage/MainPage'
import Status from './pages/mainPage/status/Status'
import Calls from './pages/mainPage/calls/Calls'
import { io } from 'socket.io-client'

function App() {
  // const socket = io("", { transport: ['websocket', 'polling', 'flashsocket'] });

  return (
    <>
    <Routes>
      <Route element = {<Register type = "login"/>} path='/'/>
      <Route element = {<Register type = "login"/>} path='/login'/>
      <Route element = {<Register type = "register"/>} path='/register'/>
      <Route element = {<MainPage/>} path='/main-page'>
        <Route element = {<Chats/>} path='chats'/>
        <Route element = {<Status/>} path='status'/>
        <Route element = {<Calls/>} path='calls'/>
      </Route>
    </Routes>
    </>

  )
}
export default App
