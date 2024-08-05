import './chats.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from '../../redux/reducer';
import { Outlet } from 'react-router-dom';

export default function Chats() {
    const [openDB , setOpenDB] = useState(true) ; // open dashboard
    const socket = useSelector(state => state.connectSocket) ; 
    const dispatch = useDispatch(); 

    // connect socket
    useEffect(() => {
        socket.on("onlineUser" , (res) => {
            dispatch(setOnlineUsers(res)) ; 
        })
    } , [])

    return (
        <div className="chats">


            {/*dashboard */}
            <div className="dashboard" style = {{width : openDB ? "260px" : "0px"}}>
                <header>
                    <h6>Chats</h6>
                    <div className="search">
                        <label htmlFor="search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </label>
                        <input id="search" type="text" placeholder = "search of chats.."/>
                    </div>
                </header>
                <ul className="chats-list"></ul>
            </div>


            {/* the chat */}
            <div style={{backgroundImage : `url(${"context.value.chatBgImg"})`}} className="chat">
                {/* to close the dashboard */}
                <button 
                    onClick = {() => setOpenDB(!openDB)}
                    style = {{backgroundColor : openDB ? "#0566b9" : "#191919"}}>
                    <i className={`fa-solid fa-angles-${openDB ? "left" : "right"}`}></i>
                </button>

                {/* chat content */}
                    <Outlet/>
            </div>
        </div>
    )
}