import './chats.css'

import { useEffect, useState } from "react"
import img from './../../../assets/default-user-img.png'

export default function Chats() {
    let [chats , setChats] = useState([]) ; 
    let list = [
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
        for(let i of list) {
            setChats([...chats , 
                <li key={list.indexOf(i)}>
                <div className="img">
                    <img src={i.img} alt="" />
                </div>
                <div className="txt">
                    .head
                </div>
            </li>
            ])
        }
    } , [])
    return (
        <div className="chats">
            <div className="dashboard">
            <header>
                <h6>Chats</h6>
                <div className="search">
                    <label htmlFor="search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </label>
                    <input id="search" type="text" />
                </div>
            </header>

            <ul className="chats-list">
                {chats}
            </ul>
            </div>
        </div>
    )
}