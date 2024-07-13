import './mainBar.css'
import { Link, Outlet } from "react-router-dom";
import { useContext} from 'react';
import {dataURLContext} from '../../context/Context'

// background images
import default_bg from './../../assets/default-light-bg.jpg'
import bg1 from './../../assets/bg1.jpg'
import bg2 from './../../assets/bg2.jpg'
import bg3 from './../../assets/bg3.jpg'
import bg4 from './../../assets/bg4.jpg'
import bg5 from './../../assets/bg5.jpg'
import bg6 from './../../assets/bg6.jpg'
import bg7 from './../../assets/bg7.jpg'
import bg8 from './../../assets/bg8.jpg'
import bg9 from './../../assets/bg9.jpg'
import bg10 from './../../assets/bg10.jpg'
import bg11 from './../../assets/bg11.jpg'
import bg12 from './../../assets/bg12.jpg'
import bg13 from './../../assets/bg13.jpg'

export default function MainPage() {
    let context = useContext(dataURLContext)  ; 

    function changeSetting() {

    }
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
                        <i className="fa-solid fa-phone"></i>
                    </Link>
                </li>

                <li title='status' className='status'>
                    <Link to = "status">
                        <span></span>
                        <span className='md'></span>
                        <span></span>
                    </Link>
                </li>

                <li onClick={changeSetting} title='setting' className='setting'>
                    <i className="fa-solid fa-gear"></i>

                    <div className="setting-content">
                        <h5>background</h5>

                        <div className="bg-list">
                            <div>
                                <img src={default_bg} alt="" />
                                <img src={bg1} alt="" />
                                <img src={bg2} alt="" />
                                <img src={bg3} alt="" />
                                <img src={bg4} alt="" />
                                <img src={bg5} alt="" />
                                <img src={bg6} alt="" />
                                <img src={bg7} alt="" />
                                <img src={bg8} alt="" />
                                <img src={bg9} alt="" />
                                <img src={bg10} alt="" />
                                <img src={bg11} alt="" />
                                <img src={bg12} alt="" />
                                <img src={bg13} alt="" />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <Outlet/>
        </div>
    )
}