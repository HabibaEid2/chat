import './mainBar.css'
import { Link } from "react-router-dom";
import { useRef} from 'react';
import default_user_img from './../../assets/default-user-img.png';
import { useSelector } from 'react-redux';
import Profile from '../profile/Profile';

export default function MainBar() {
    const userData = useSelector(state => state.userData) ; 
    const profileSection = useRef() ; 

    function showProfileSection() {
        profileSection.current.style.display = 'block' ; 
    }
    return (
        <>
        <ul className='main-bar'>
            <li title='profile' onClick={showProfileSection}>
                <div className = "profile-tab">
                    <img src={userData.profile_pic || default_user_img} alt="profile" />
                </div>
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
        </ul>

        {/* user details */}
        <div className="profile-section" ref={profileSection}>
            <Profile/>
        </div>
        </>
    )
}