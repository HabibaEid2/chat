import './existingUsers.css'
import user_default_img from './../../assets/default-user-img.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useRef } from 'react';
export default function ExistingUsers({data}) {

    const userData = useSelector(state => state.userData) ; 
    const onlineUsers = useSelector(state => state.onlineUsers) ;
    const ulRef = useRef() ;

    // user selection to make a conversation
    function select() {
        ulRef.current.parentElement.parentElement.style.display = 'none' ; 
    }

    return(
        <ul className='existing-users' ref={ulRef}>
            {
                data.length === 0 ? 
                <em className='not-found-p'>
                    No users founded
                </em> : 
                data.map((ele,index)=> {
                    if (ele._id !== userData.id){
                        return (
                            <li key={`${index}`}>
                                <Link to={`chats/${ele._id}`} onClick={select}>
                                    <div className={`${onlineUsers.includes(ele._id) ? "online-user-img" : ""}`}>
                                        <img 
                                        src={ele.profile_pic || user_default_img} 
                                        alt="user image" 
                                        className='user-img'/>
                                    </div>
                                    <div className="txt">
                                        <h5>{ele.name}</h5>
                                        <em className="email">
                                            {ele.email}
                                        </em>
                                    </div>
                                </Link>
                            </li>
                            )
                    } 
                })
            }
        </ul>
    )
}