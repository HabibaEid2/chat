import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/reducer';
import { api } from '../../api/Api';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import user_default_img from './../../assets/default-user-img.png'
import './profile.css'

export default function Profile() {
    const input = useRef() ; 
    const userData = useSelector(state => state.userData) ; 
    const dispatch = useDispatch() ; 
    // get user details from backend
    useEffect(() => {
        const getUserDetails = async () => {
            await axios.get(`${api}/v1/user-details` , {
                    withCredentials : true
                }  
            )
            .then((res) => {
                dispatch(setUserData({
                    name : res.data.data.name , 
                    email : res.data.data.email , 
                    profile_pic : res.data.data.profile_pic
                }))
            })
        }
        getUserDetails() ; 
    } , [])

    // change image 
    function changeImg() {
        console.log("clicked")
        input.current.addEventListener("click" , () => {
            console.log(input.current.value)
        })
    }

    return (
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="user-img">
                        <img src={userData.profile_pic || user_default_img} alt="user image" />
                        <i 
                            onClick={changeImg}
                            className="fa-solid fa-pen">
                        </i>
                        <input 
                            ref = {input}
                            hidden 
                            type="file" 
                            accept='image/*'/>
                    </div>
                    <div className="user-name">
                        <div className='title'>
                            Name
                        </div>
                        <div className='user-name-value'>
                            {userData.name}
                        </div>
                        <i className="fa-solid fa-pen"></i>
                    </div>
                    <div className="user-email">
                        <div className='title'>
                            Email
                        </div>
                        <div className='user-email-value'>
                            {userData.email}
                        </div>
                        <i className="fa-solid fa-pen"></i>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">cancel</Button>
                    <Button variant="light">save</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}