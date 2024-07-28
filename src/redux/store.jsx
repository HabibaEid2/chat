import { configureStore } from "@reduxjs/toolkit";
import { token, userData } from "./reducer";

export const store = configureStore({
    reducer : {
        userData : userData.reducer , 
        token : token.reducer , 
    }
}) ; 