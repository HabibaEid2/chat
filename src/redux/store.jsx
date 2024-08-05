import { configureStore } from "@reduxjs/toolkit";
import { chosenUser, connectSocket, onlineUsers, token, userData } from "./reducer";

export const store = configureStore({
    reducer : {
        userData : userData.reducer , 
        token : token.reducer , 
        onlineUsers : onlineUsers.reducer ,
        chosenUser : chosenUser.reducer , 
        connectSocket : connectSocket.reducer , 
    }
}) ; 