import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import {api} from "../api/Api";
import { Spinner } from "react-bootstrap";
import Error from '../pages/register/error/Error';
import WelcomPage from "../pages/register/welcomePage/WelcomePage";

export default function RegisterContent(props) {

    let [userName , setUserName] = useState("") ; 
    let [pass , setPass] = useState("") ; 
    let [email , setEmail] = useState("") ; 

    // to show loading icon through submitting the data
    let [loading , setLoading] = useState(false) ; 

    let [error , setError] = useState({left : "-45%" , type : ""}) ; 
    let go = useNavigate() ; 

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
            await axios.post(`${api}/${props.type === "sign-in" ? "login" : "register"}` , {
                name : userName , 
                password : pass , 
                password_confirmation : pass , 
                email : email 
            })
            
            .then( () => {
                setLoading(false) ; 
                go("/main-chats")
            })

            .catch(err => {
                setLoading(false)
                let getErr = err.response.data.message.slice(0 , err.response.data.message.indexOf("(")) ;  
                setError({left : "0" , type : getErr}) ; 
                console.log(getErr)
            })
        }
    }

    return (
        <div className="register-content">
            <div className='warning' style={{left : error.left}} onClick={() => setError({...error , left : "-45%"})}>
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
                    </Spinner> : props.type === "sign-in" ? "Sign in" : "Register"}
                    </span></button>

                <div className="having-account">
                    {
                        props.type === "sign-in" ?
                        <div className="check-account"> If you don't have account click here <span><Link to="/register">Register</Link></span></div> : 
                        <div className="check-account"> you have already an account ? click here <span><Link to="/sign-in">Sign in</Link></span></div>
                    }
                </div>
            </form>
            <WelcomPage name = {userName}/>
        </div>
    )
}