import './registerContent.css' ; 

import axios from "axios"
import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import {api} from "../../../api/Api";
import { Spinner } from "react-bootstrap";
import Error from '../error/Error';
import WelcomPage from "../welcomePage/WelcomePage";
import { dataURLContext } from "../../../context/Context";

export default function RegisterContent(props) {

    let [userName , setUserName] = useState("") ; 
    let [pass , setPass] = useState("") ; 
    let [email , setEmail] = useState("") ; 
    let context = useContext(dataURLContext)

    // to show loading icon through submitting the data
    let [loading , setLoading] = useState(false) ; 

    let [error , setError] = useState({left : "-115%" , type : ""}) ; 
    let [showGreeting , setShowGreeting] = useState(false)

    // submit data after register

    async function submit(e) {
        e.preventDefault() ; 

        // check content 

        if ((userName.length === 0 && props.type === "register") || pass.length === 0) {
            setError({left : "0" , type : 
                userName.length <=0 ? "nameError" : "passError"
            })
        }
        else {
            setLoading(true) ; 
            await axios.post(`${api}/${props.type === "login" ? "v1/login" : "v1/register"}` , 
                props.type === "login" ? {
                    name : userName , 
                    email : email , 
                    password : pass , 
                    profile_pic : context.value.img
                } : {
                    email : email , 
                    password : pass , 
                }
            )
            .then( (res) => {
                setLoading(false) ; 
                setShowGreeting(true) ; 
                context.setValue(prev => {
                    return {...prev , token : res.data.token}
                })
            })

            .catch(err => {
                setLoading(false)
                let getErr = err.response.data.message.slice(0 , err.response.data.message.indexOf("(")) ;  
                setError({left : "0" , type : getErr}) ; 
            })
        }
    }

    return (
        <div className="register-content">
            <div className='warning' style={{left : error.left}} onClick={() => setError({...error , left : "-115%"})}>
                <Error data = {error} />
            </div>
            <form>
                {props.type === "register" && 
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                    id = "name"
                    placeholder="user name"
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                }
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    id="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="pass">Password</label>
                    <input type="password" 
                    id="pass"
                    placeholder="password"
                    onChange={(e) => setPass(e.target.value)}
                    />
                </div>

                <button onClick={submit}><span>
                    {loading ? 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> : props.type === "login" ? "login" : "Register"}
                    </span></button>

                <div className="having-account">
                    {
                        props.type === "login" ?
                        <div className="check-account"> If you don't have account click here <span><Link to="/register">Register</Link></span></div> : 
                        <div className="check-account"> you have already an account ? click here <span><Link to="/login">Sign in</Link></span></div>
                    }
                </div>
            </form>
            {showGreeting && <WelcomPage type = {props.type} name = {userName}/>}
        </div>
    )
}