import { createContext, useState } from "react";
import defaultImg from './../assets/default-user-img.png' ; 

export const dataURLContext = createContext(null) ; 

export default function Context({children}) {

    //context to get the image url of user's photokop and the ability of show the Edited image or Editor page

    let [value , setValue] = useState(
        {
            img : defaultImg , 
            open_editor_section : false , 
            token : ""
        }) ; 

    return (
        <dataURLContext.Provider value={{value , setValue}}>{children}</dataURLContext.Provider>
    )
}