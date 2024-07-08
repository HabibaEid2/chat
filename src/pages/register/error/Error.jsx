import warningImg from './../../../assets/warning.png' ; 
import './error.css'
import { useEffect, useState } from "react"

export default function Error(props) {
    // let [showError , setShowError] = useState(props.data.show) ; 
    return (
        <div>
            <img className='warning-img' src={warningImg} alt="warning.." />
                {
                props.data.type === "nameError" ?
                "user name is required." : 
                props.data.type === "passError" ?
                "password is required." : props.data.type 
                }
        </div>
    )
}