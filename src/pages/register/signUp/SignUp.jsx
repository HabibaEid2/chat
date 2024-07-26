import './../registerContent/registerContent.css' ; 
import axios from "axios"
import { useRef, useState } from "react"
import { Link } from "react-router-dom";
import {api} from "../../../api/Api";
import { Spinner } from "react-bootstrap";
import Error from '../error/Error';
import defaultUserImg from './../../../assets/default-user-img.png'
import CropImage from './../cropImage/CropImage'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/reducer';

export default function SignUp(){
    const [userName , setUserName] = useState("") ; 
    const [pass , setPass] = useState("") ; 
    const [email , setEmail] = useState("") ; 
    const [imgUrl , setImgUrl] = useState(defaultUserImg)
    const userImg = useRef();
    const inputFile = useRef(); 
    const dispatch = useDispatch() ; 
    const go = useNavigate() ; 
    let [loading , setLoading] = useState(false) ; 
    let [error , setError] = useState({left : "-115%" , type : ""}) ; 

    async function submit(e) {
        e.preventDefault() ; 
        // check content 
        if (userName.length === 0 || pass.length === 0) {
            setError({left : "0" , type : 
                userName.length <=0 ? "nameError" : "passError"
            })
        }
        else {
            setLoading(true) ; 
            await axios.post(`${api}/v1/register` , {
                    name : userName , 
                    email : email , 
                    password : pass , 
                    profile_pic : ""
                } 
            )
            .then(() => {
                setLoading(false) ; 
                go("main/chats")
            })
            .catch(err => {
                setLoading(false)
                let getErr = err.response.data.message.slice(0 , err.response.data.message.indexOf("(")) ;  
                setError({left : "0" , type : getErr}) ; 
            })
        }
    }

    // function to read the image url from the file that user open
    function readUrl() {
        let url = URL.createObjectURL(inputFile.current.files[0]) ; 
        setImgUrl(url) ; 
    }

    return (
        <div className="register-content">
            <div className='warning' style={{left : error.left}} onClick={() => setError({...error , left : "-115%"})}>
                <Error data = {error} />
            </div>
            <form>
                <div className="form-field img">
                    <input 
                        hidden 
                        type="file" 
                        onChange={readUrl}
                        ref = {inputFile}
                        />
                    <img 
                        src={""} 
                        alt="user image" 
                        ref = {userImg}
                        onClick = {() => {
                            inputFile.current.click()
                        }}
                        />
                </div>
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                    id = "name"
                    placeholder="user name"
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
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
                    </Spinner>  : "Register"}
                    </span>
                </button>
                <div className="check-account">
                    you have already an account ? click here 
                    <span>  
                        <Link to="/login">Sign in</Link>
                    </span>
                </div>
            </form>
            {/* {context.value.open_editor_section && <CropImage imgUrl = {imgUrl}/>} */}
        </div>
    )
}