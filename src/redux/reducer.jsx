import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies() ; 
export const userData = createSlice({
    name : "user data" , 
    initialState : {} , 
    reducers : {
        setUserData : (state , action) => {
            return state = action.payload ; 
        } , 
        updatePicture : (state , action) => {
            return {...state , profile_pic : action.payload}
        }
    }
})
export const token = createSlice({
    name : "token" , 
    initialState : cookie.get("token") , 
    reducers : {
        setToken : (state , action) => {
            return action.payload
        } , 
        getToken : (state) => {
            return state ; 
        }        
    }
})

export const {setUserData , updatePicture} = userData.actions ; 