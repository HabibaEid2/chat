import './existingUsers.css'
import user_default_img from './../../assets/default-user-img.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { setChosenUser } from '../../redux/reducer';
export default function ExistingUsers({data}) {

    const userData = useSelector(state => state.userData) ; 
    const onlineUsers = useSelector(state => state.onlineUsers) ; 
    const dispatch = useDispatch() ; 

    // user selection to make a conversation
    function select(ele) {
        dispatch(setChosenUser(ele)) ; 
    }


    return(
        <ul className='existing-users'>
            {
                data.length === 0 ? 
                <em className='not-found-p'>
                    No users founded
                </em> : 
                data.map((ele,index)=> {
                    if (ele._id !== userData.id){
                        return (
                            <li key={`${index}`}>
                                <Link to={`chats/${ele._id}`} onClick={() => select(ele)}>
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