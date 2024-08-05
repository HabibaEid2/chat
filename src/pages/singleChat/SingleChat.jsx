import { useDispatch, useSelector } from "react-redux"
import user_default_img from './../../assets/default-user-img.png'
import send_icon from './../../assets/send.png'
import './singleChat.css'
import { useParams } from "react-router-dom"
import { setChosenUser } from "../../redux/reducer"
import { useEffect, useRef, useState } from "react"

export default function SingleChat() {
    const [message , setMessage] = useState([]) ; 
    const url = useParams() ; 
    const userData = useSelector(state => state.userData) ; 
    const chosenUser = useSelector(state => state.chosenUser) ; 
    const socket = useSelector(state => state.connectSocket) ; 
    const input_msRef = useRef() ; 
    const dispatch = useDispatch() ; 

    useEffect(() => {
        // to get the chat room
        socket.emit('message-page' , url.id) ; 
        // to get data about selected user
        socket.on('message-user' , (res) => {
            dispatch(setChosenUser(res)) ; 
        })
    } , [socket.connected , url.id]) 

    // send message 
    function send() {
        socket.emit("new-message" , {
            sender : userData.id , 
            receiver : url.id , 
            text: input_msRef.current.value,
            imageUrl: null,
            videoUrl: null,
            msgByUserId: userData.id,
        }) ; 

    } ; 

    useEffect(() => {
        socket.on("message" , (res) => {
            setMessage(res)
        })
    })
    // handle message date
    function handleMessageDate(date) {
        const givenDate = new Date(date) ;
        const localDate = givenDate.toLocaleString() ; 
        return `${localDate.slice(localDate.indexOf(',')+ 1 , localDate.lastIndexOf(':'))}${localDate.slice(localDate.lastIndexOf(' '))}` ; 
    }
    return (
        <div className="single-chat">
            <header>
                <div className="right-side online-user-img">
                    <img src={chosenUser.profile_pic || user_default_img} alt="user image" />
                    <div className="name">
                        {chosenUser.name}
                    </div>
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

            <section className="messages">
                {message.map(ele => {
                    return (
                        <div className={`message ${ele.msgByUserId  === ele._id ? 'friend-ms' : 'my-ms'}`} key={ele._id}>
                            <div className="txt">
                                {ele.text }
                            </div>
                            <div className='sub-data'> 
                                <div className="date">
                                    {handleMessageDate(ele.createdAt)}
                                </div>
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                        </div>
                    )
                })}
            </section>

            <footer>
                <div className="send-ms">
                    <input 
                        ref = {input_msRef}
                        type="text" 
                        placeholder='send a message' />
                    <div className="send-icon">
                        <img src={send_icon} alt="send" onClick={send}/>
                    </div>
                </div>
            </footer>
        </div>
    )
}