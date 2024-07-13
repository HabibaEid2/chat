import { createContext, useState } from "react";
import defaultImg from './../assets/default-user-img.png' ; 
import { Cookies } from "react-cookie";

export const dataURLContext = createContext(null) ; 

export default function Context({children}) {

    //context to get the image url of user's photokop and the ability of show the Edited image or Editor page

    const cookie = new Cookies() ; 
    const [value , setValue] = useState(
        {
            img : defaultImg , 
            open_editor_section : false , 
            token : ""
        }) ; 

    return (
        <dataURLContext.Provider value={{value , setValue}}>{children}</dataURLContext.Provider>
    )
}