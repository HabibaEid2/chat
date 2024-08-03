import './home.css'
import { Outlet } from "react-router-dom";
import MainBar from "../../components/main-bar/MainBar";
import { useEffect } from 'react';
import { api } from '../../api/Api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/reducer';

export default function Home() {
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
                    profile_pic : res.data.data.profile_pic , 
                    id : res.data.data._id , 
                }))
            })
        }
        getUserDetails() ; 
    } , [])
    return (
        <div className="home">
            <MainBar/>
            <Outlet/>
        </div>
    )
}