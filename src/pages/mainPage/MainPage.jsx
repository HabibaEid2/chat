import './mainPage.css'
import { Link, Outlet } from "react-router-dom";
import { useContext} from 'react';
import { dataURLContext } from '../../context/Context';

export default function MainPage() {
    let context = useContext(dataURLContext) ; 
    return (
        <div className="main-page">
            <ul className='main-list'>
                <li title='profile'>
                    <Link to = "profile">
                        <img src={context.value.img} alt="profile" />
                    </Link>
                </li>

                <li title='chats'>
                    <Link to = "chats">
                        <i className="fa-regular fa-message"></i>
                    </Link>
                </li>

                <li title='calls'>
                    <Link to = "calls">
                        <i class="fa-solid fa-phone"></i>
                    </Link>
                </li>

                <li title='status' className='status'>
                    <Link to = "status">
                        <span></span>
                        <span className='md'></span>
                        <span></span>
                    </Link>
                </li>

                <li title='setting' className='setting'>
                    <i class="fa-solid fa-gear"></i>
                </li>
            </ul>

            <Outlet/>
        </div>
    )
}