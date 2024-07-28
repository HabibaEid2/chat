import { createContext, useState } from "react";

export const context = createContext() ; 
export default function Context({children}) {
    const [value , setValue] = useState({open_img_editor : false})
    return <context.Provider value={{value , setValue}}>
        {children}
    </context.Provider>
}