import { useSelector } from "react-redux"
import user_default_img from './../../assets/default-user-img.png'
import send_icon from './../../assets/send.png'
import './singleChat.css'
export default function SingleChat() {
    const chosenUser = useSelector(state => state.chosenUser) ; 
    console.log(chosenUser) ; 
    return (
        <div className="single-chat">
            <header>
                <div className="right-side">
                    <img src={chosenUser.img || user_default_img} alt="user image" />
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

            <section className="messages"></section>

            <footer>
                <div className="send-ms">
                    <input type="text" placeholder='send a message' />
                    <div className="send-icon">
                        <img src={send_icon} alt="send" />
                    </div>
                </div>
            </footer>
        </div>
    )
}