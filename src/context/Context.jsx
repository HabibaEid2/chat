import { Children, createContext, useState } from "react";

const context = createContext() ; 
export default function Context({children}) {
    const {value , setValue} = useState({open_editor_section : false})
    return <context.Provider value={{value , setValue}}>
        {children}
    </context.Provider>
}