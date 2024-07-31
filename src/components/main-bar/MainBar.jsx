import './mainBar.css'
import { Link } from "react-router-dom";
import { useRef} from 'react';
import default_user_img from './../../assets/default-user-img.png';
import { useSelector } from 'react-redux';
import Profile from '../profile/Profile';
import AddUser from '../addUser/AddUser';

export default function MainBar() {
    const userData = useSelector(state => state.userData) ; 
    const profileSection = useRef() ; 
    const addUserSectionRef = useRef() ; 

    function showProfileSection() {
        profileSection.current.style.display = 'block' ; 
    }

    //show search users section
    function showAddUser(){
        addUserSectionRef.current.style.display = 'flex' ; 
    }
    return (
        <>
        <ul className='main-bar'>
            <li title={`${userData.name}`} onClick={showProfileSection}>
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
            <li onClick={showAddUser} title='add user' className='add-user'>
                <i className="fa-solid fa-user-plus"></i>
            </li>
        </ul>

        {/* user details */}
        <div className="profile-section" ref={profileSection}>
            <Profile/>
        </div>

        {/* add user */}
        <div ref={addUserSectionRef} className="add-user-section">
            <AddUser/>
        </div>
        </>
    )
}