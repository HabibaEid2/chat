import './mainPage.css'
import { Link, Outlet } from "react-router-dom";
import logo from './../../assets/live-chat.png'

export default function MainPage() {
    return (
        <div className="main-page">
            <div className="logo">
                <img src={logo} alt="logo" />
                <h6>Chat</h6>
            </div>
            <ul>
                <li>
                    <i class="fa-solid fa-bars"></i>
                </li>

                <li>
                    <Link to={'chats'}> 
                        <i class="fa-regular fa-message"></i>
                    </Link>
                </li>

                <li>
                    <Link to={'calls'}> 
                    <i class="fa-solid fa-phone"></i>
                    </Link>
                </li>

                <li className="status">
                    <Link to={'status'}> 
                        <span></span>
                        <span className="middle"></span>
                        <span></span>
                    </Link>
                </li>

            </ul>

            <Outlet/>
        </div>
    )
}