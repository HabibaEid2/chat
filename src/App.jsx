import 'react-image-crop/dist/ReactCrop.css'
import './constant/css/bootstrap.min.css'
import './constant/css/all.min.css'
import './App.css'
import Register from './pages/register/mainRegisterPage/Register'
import { Route, Routes } from 'react-router-dom'
import Chats from './pages/chats/Chats'
import Status from './pages/status/Status'
import Calls from './pages/calls/Calls'
import Home from './pages/home/Home'
import { useDispatch, useSelector } from 'react-redux'
import SingleChat from './pages/singleChat/SingleChat'
import { getSocket } from './redux/reducer'
import { useEffect } from 'react'

function App() {
  const token = useSelector(state => state.token) ; 
  const dispatch = useDispatch() ; 

  // useEffect(() => {
  //   dispatch(getSocket()) ; 
  // } ,[])
  return (
    <>
    <Routes>
      {token ? 
        <Route element = {<Home/>} path='/chat-app'>
          <Route element = {<Chats/>} path='/chat-app'/>
          <Route element = {<Chats/>} path='chats'>
            <Route element = {<SingleChat/>} path=':id'/>
          </Route>
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
