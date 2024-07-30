import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/reducer';
import { api } from '../../api/Api';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import user_default_img from './../../assets/default-user-img.png'
import edit_img from './../../assets/magic-wand.gif'
import './profile.css'
import { context } from '../../context/Context';
import CropImage from '../cropImage/CropImage';

export default function Profile() {
    const [editName , setEditName] = useState(false) ; 
    const input = useRef() ; 
    const userData = useSelector(state => state.userData) ; 
    const [userName , setUserName] = useState(userData.name) ; 
    const [imgUrl , setImgUrl] = useState() ; 
    const contextValue = useContext(context) ; 

    function simulateClickOnInputFile() {
        input.current.click() ; 
    }
    // change user image 
    function changeImg(e) {
        const file = e.target.files[0] ; 
        const fileURL = URL.createObjectURL(file) ; 
        setImgUrl(fileURL) ; 
        contextValue.setValue((prev) => {
            return {...prev , open_img_editor : true}
        })
    }
    // save updated data
    async function saveData() {
        await axios.post(`${api}/v1/update-user` , {
            name : userName , 
            profile_pic : userData.profile_pic , 
        })
        .then((res) => {
            console.log(res) ; 
        })
    }

    return (
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>
                        <div>User Details</div>
                        <img src={edit_img} alt="edit" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="user-img">
                        <img src={userData.profile_pic || user_default_img} alt="user image" />
                        <i 
                            onClick={simulateClickOnInputFile}
                            className="fa-solid fa-pen">
                        </i>
                        <input 
                            ref = {input}
                            hidden 
                            onChange={changeImg}
                            onClick={(e) => e.target.value = null}
                            type="file" 
                            accept='image/*'/>
                    </div>
                    <div className="user-name">
                        <div className='title'>
                            Name
                        </div>
                        {
                            editName ? 
                            <input 
                                type="text" 
                                value={userName ?? userData.name}
                                onChange={(e) => setUserName(e.target.value)}
                                /> : 
                            <div>
                                {userName ?? userData.name}
                            </div>
                        }
                        <i onClick={() => setEditName(!editName)} className="fa-solid fa-pen"></i>
                    </div>
                    <div className="user-email">
                        <div className='title'>
                            Email
                        </div>
                        <div className='user-email-value'>
                            {userData.email}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">cancel</Button>
                    <Button variant="light" onClick={saveData}>save</Button>
                </Modal.Footer>
            </Modal.Dialog>

            {contextValue.value.open_img_editor && <CropImage imgUrl = {imgUrl}/>}
        </div>
    );
}