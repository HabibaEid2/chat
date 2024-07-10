import 'react-image-crop/dist/ReactCrop.css'
import './constant/css/bootstrap.min.css'
import './constant/css/all.min.css'
import './App.css'
import Register from './pages/register/Register'
import { Route, Routes } from 'react-router-dom'
import MainChats from './pages/mainChats/Chats'

function App() {
  return (
    <>
    <Routes>
      <Route element = {<Register type = "login"/>} path='/'/>
      <Route element = {<Register type = "login"/>} path='/login'/>
      <Route element = {<Register type = "register"/>} path='/register'/>
      <Route element = {<MainChats/>} path='/main-chats'/>
    </Routes>
    </>

  )
}
export default App
