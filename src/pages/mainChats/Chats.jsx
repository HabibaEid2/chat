import { useContext, useState } from 'react';
import userImg from './../../assets/default-user-img.png' ; 
import './chats.css'
import { useEffect } from 'react';
import axios from 'axios';
import { api } from '../../api/Api';
import { dataURLContext } from '../../context/Context';
export default function MainChats() {

    let [chats , setChats] = useState([]) ; 
    let context = useContext(dataURLContext)

    useEffect(() => {
        axios.get(`${api}/v1/user-details` , {
            headers : {
                Authorization : "token" + context.value.token , 
            }
        }).then((res) => {
            console.log(res)
        })
    })
    
    let chatContent = [
        {
            imgUrl : userImg , 
            name : "sara emad" , 
            last_ms : "how are you ?" , 
            missed_mss : 1 , 
        } , 
        {
            imgUrl : userImg , 
            name : "Ahmad Adel" , 
            last_ms : "how's going yesterday ?!" , 
            missed_mss : 2 , 
        } , 
        {
            imgUrl : userImg , 
            name : "Lana" , 
            last_ms : "she told me that you are boring ! but don't care i told here to shut up her mouse" , 
            missed_mss : 20 , 
        }
    ]

    useEffect(() => {
        setChats([])
        for(let i of chatContent) {
            setChats(prev => [...prev , 
                <li>
                    <div className="chat">
                        <div className="image">
                            <img src={i.imgUrl} alt="" />
                        </div>
                        <div className="txt">
                            <div className="name">{i.name}</div>
                            <div className="last-message">{i.last_ms.length >= 17 ? `${i.last_ms.slice(0 , 18)}...` : i.last_ms }</div>
                        </div>
                        <div className="missed-mss">{i.missed_mss}</div>
                    </div>
                </li>
            ])
        }
    } , [])
    return (
        <div className="main-chats">
            <div className="dashboard">
                <div className="head">
                    <h4>Messages</h4>
                    <div className="profile-icon">
                        <img src={userImg} alt="" />
                    </div>
                </div>

                {/* search bar */}
                <div className="search-bar">
                    <label htmlFor="search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </label>
                    <input type="text" id = "search" placeholder='Type your search'/>
                </div>

                <div className="chats">
                    <ul>
                        {chats}
                    </ul>
                </div>
            </div>

            <div className="selected-chat">
                Here is the selected chat
            </div>
        </div>
    )
}