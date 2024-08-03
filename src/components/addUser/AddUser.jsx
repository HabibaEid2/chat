import './addUser.css'
import searchIcon from './../../assets/search-icon.png' ;
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { api } from '../../api/Api';
import ExistingUsers from '../existingUsers/ExistingUsers';
import cancel_button from './../../assets/x-button.png' ; 

export default function AddUser() {

    const [existingUsers , setExistingUsers] = useState([]);
    const [inputValue , setInputValue] = useState(null) ; 
    const bodyRef = useRef() ; 
    
    useEffect(()=> {
        async function getUsers(){
            try {
                await axios.post(`${api}/v1/search-user`, {
                    search : inputValue
                })
                .then((res) =>{
                    setExistingUsers(res.data.data)
                })
            } 
            catch(err) {
                console.log(err)
            }
        }
        getUsers()
    } , [inputValue])

    // cancel search bar
    function cancel() {
        bodyRef.current.parentElement.style.display = "none" ; 
    }
    return (
        <div ref={bodyRef} className="add-user-body">
            <img 
            className='cancel-button' 
            src={cancel_button} 
            alt="cancel" 
            onClick={cancel}
            />
            <div className="search-bar">
                <input 
                placeholder='enter name or email'
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="dividor"></div>
                <img src={searchIcon} alt="search" />
            </div>
            <ExistingUsers data ={existingUsers}/>
        </div>
    )
}