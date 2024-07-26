import { configureStore } from "@reduxjs/toolkit";
import { userData } from "./reducer";

export const store = configureStore({
    reducer : {
        userData : userData.reducer , 
    }
}) ; 