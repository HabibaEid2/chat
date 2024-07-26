import './mainBar.css'
import { Link, Outlet } from "react-router-dom";
import { useRef, useState} from 'react';
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
import { useSelector } from 'react-redux';

export default function MainBar() {
    // let [bgImg , setBgImg] = useState()
    const [openSetting , setOpenSetting] = useState(false) ; 
    const setting_content = useRef() ; 
    const userData = useSelector(state => state.userData) ; 
    function changeChatBg(e) {
        // context.setValue((prev) => {
        //     return {...prev , chatBgImg : e.target.src}
        // })
    }
    return (
        <div className="main-page">
            <ul className='main-list'>
                <li title='profile'>
                    <Link to = "profile">
                        <img src={userData.profile_pic} alt="profile" />
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
                <li title='setting' className='setting'>
                    <i onClick={() => setOpenSetting(!openSetting)} className="fa-solid fa-gear"></i>
                    <div 
                        ref={setting_content}
                        className="setting-content"
                        style = {{opacity : openSetting ? "1" : "0"}}
                        >
                        <h5>background</h5>
                        <div className="bg-list">
                            <div>
                                <img onClick = {changeChatBg} src={default_bg} alt="" />
                                <img onClick = {changeChatBg} src={bg1} alt="" />
                                <img onClick = {changeChatBg} src={bg2} alt="" />
                                <img onClick = {changeChatBg} src={bg3} alt="" />
                                <img onClick = {changeChatBg} src={bg4} alt="" />
                                <img onClick = {changeChatBg} src={bg5} alt="" />
                                <img onClick = {changeChatBg} src={bg6} alt="" />
                                <img onClick = {changeChatBg} src={bg7} alt="" />
                                <img onClick = {changeChatBg} src={bg8} alt="" />
                                <img onClick = {changeChatBg} src={bg9} alt="" />
                                <img onClick = {changeChatBg} src={bg10} alt="" />
                                <img onClick = {changeChatBg} src={bg11} alt="" />
                                <img onClick = {changeChatBg} src={bg12} alt="" />
                                <img onClick = {changeChatBg} src={bg13} alt="" />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <Outlet/>
        </div>
    )
}