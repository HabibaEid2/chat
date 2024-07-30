import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom";
import {api} from "../../../api/Api";
import { Spinner } from "react-bootstrap";
import Error from '../../../components/error/Error';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/reducer";

export default function Login() {
    const [pass , setPass] = useState("") ; 
    const [email , setEmail] = useState("") ; 
    const [loading , setLoading] = useState(false) ; 
    const [error , setError] = useState({left : "-115%" , type : ""}) ; 
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 

    async function submit(e) {
        e.preventDefault() ; 
        if (pass.length === 0) setError({left : "0" , type : "passError" }) ; 
        else {
            setLoading(true) ;
            await axios({
                method : "post" , 
                url : `${api}/v1/login` , 
                data : {
                    email : email , 
                    password : pass , 
                } , 
                withCredentials : true , 
            })
            .then((res) => {
                setLoading(false) ;  
                dispatch(setToken(res.data.token))
                navigate("/chat-app/chats")
            })
            .catch(err => {
                setLoading(false)
                let getErr = err.response.data.message.slice(0 , err.response.data.message.indexOf("(")) ;  
                setError({
                    left : "0" , 
                    type : err.response.status === 500 ?
                    'Check internet connection' : 
                    getErr
                }) ; 
            })
        }
    }
    return (
        <div className="register-content">
            <div className='warning' style={{left : error.left}} onClick={() => setError({...error , left : "-115%"})}>
                <Error data = {error} />
            </div>
            <form>
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
                <button className = "submit" onClick={submit}><span>
                    {loading ? 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> :  "login"
                    }
                    </span>
                </button>

                <div className="check-account"> 
                    If you don't have account click here 
                    <span>
                        <Link to="/chat-app/register">Register</Link>
                    </span>
                </div> 
            </form>
        </div>
    )
}