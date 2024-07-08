import 'react-image-crop/dist/ReactCrop.css'
import './constant/css/bootstrap.min.css'
import './App.css'
import Register from './pages/register/Register'
import { Route, Routes } from 'react-router-dom'
import MainChats from './pages/mainChats/MainChats'

function App() {
  return (
    <>
    <Routes>
      <Route element = {<Register type = "sign-in"/>} path='/'/>
      <Route element = {<Register type = "sign-in"/>} path='/sign-in'/>
      <Route element = {<Register type = "register"/>} path='/register'/>
      <Route element = {<MainChats/>} path='/main-chats'/>
    </Routes>
    </>

  )
}
export default App
