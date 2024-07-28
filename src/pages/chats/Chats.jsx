import './chats.css'
import { useEffect, useState } from "react"
import img from './../../assets/default-user-img.png'
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { api } from '../../api/Api';
import { setUserData } from '../../redux/reducer';

export default function Chats() {
    // const socket = io.connect("http://localhost:3000" , 
    //     { transports: ['websocket', 'polling', 'flashsocket'] }
    // )
    const [chats , setChats] = useState([]) ; 
    const [openDB , setOpenDB] = useState(true) ; // open dashboard
    const dispatch = useDispatch() ; 
    const list = [
        {
            img : img , 
            name : "sara adel" , 
            last_ms : "How are you Habiba ?"  , 
        } , 
        {
            img : img , 
            name : "Ahmad" , 
            last_ms : "what's going habiba?"  , 
        } , 
        {
            img : img , 
            name : "Haboba" , 
            last_ms : "sure ! as you like"  , 
        } , 
        {
            img : img , 
            name : "Mina Raoof" , 
            last_ms : "ofcurse noh!!"  , 
        }
    ]
    useEffect(() => {
        setChats([])
        for(let i of list) {
            setChats(prev => {
                return [...prev , 
                    <li key={list.indexOf(i)}>
                        <div className="img">
                            <img src={i.img} alt="" />
                        </div>
                        <div className="txt">
                            <div className="head">{i.name}</div>
                            <div className="last-ms">{i.last_ms}</div>
                        </div>
                    </li>
                ]
            })
        }
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
                <ul className="chats-list">
                    {chats}
                </ul>
            </div>
            {/* the chat */}
            <div style={{backgroundImage : `url(${"context.value.chatBgImg"})`}} className="chat">
                {/* to close the dashboard */}
                <button 
                    onClick = {() => setOpenDB(!openDB)}
                    style = {{backgroundColor : openDB ? "#0566b9" : "#191919"}}>
                    <i className={`fa-solid fa-angles-${openDB ? "left" : "right"}`}></i>
                </button>
                <header>
                    <div className="right-side">
                        <img src={img} alt="" />
                        <div className="name">Habiba</div>
                    </div>
                    <div className="left-side">
                        <div className="video">
                            <i className="fa-solid fa-video"></i>
                        </div>
                        <div className="call">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}