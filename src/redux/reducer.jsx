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
            return {...state , profile_pic :action.payload } 
        }
    }
})
export const token = createSlice({
    name : "token" , 
    initialState : cookie.get("token") || null, 
    reducers : {
        setToken : (state , action) => {
            return action.payload
        }      
    }
})
export const onlineUsers = createSlice({
    name : "online-users" , 
    initialState : [] , 
    reducers : {
        setOnlineUsers : (state , action) => {
            return [...new Set(action.payload)] ; 
        }
    }
})

// to get data about the chosen user from search 
export const chosenUser  = createSlice({
    name : "chosenUser" , 
    initialState : {} , 
    reducers : {
        setChosenUser : (state , action) => {
            return action.payload ; 
        }
    }
})
export const {setUserData, updatePicture} = userData.actions ; 
export const {setToken} = token.actions ; 
export const {setOnlineUsers} = onlineUsers.actions ; 
export const {setChosenUser} = chosenUser.actions ; 