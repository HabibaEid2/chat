import axios from "axios"
import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import {api} from "../../../api/Api";
import { Spinner } from "react-bootstrap";
import Error from '../../../components/error/Error';
import defaultUserImg from './../../../assets/default-user-img.png'
import CropImage from '../../../components/cropImage/CropImage'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../../redux/reducer';
import { context } from "../../../context/Context";

export default function SignUp(){
    const [userName , setUserName] = useState("") ; 
    const [pass , setPass] = useState("") ; 
    const [email , setEmail] = useState("") ; 
    const [imgUrl , setImgUrl] = useState(defaultUserImg) ; 
    const [loading , setLoading] = useState(false) ; 
    const [error , setError] = useState({left : "-115%" , type : ""}) ;
    const contextValue = useContext(context) ; 
    const userImg = useRef();
    const inputFile = useRef(); 
    const editing_img = useSelector(state => state.userData).profile_pic ; 
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ;  

    // submit data to server
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
                    profile_pic : editing_img , 
                } 
            )
            .then((res) => {
                setLoading(false) ; 
                dispatch(setUserData({
                    name : res.data.data.name , 
                    email : res.data.data.email  ,
                    profile_pic : res.data.data.profile_pic
                }))

                // login here because backend doesn't give token unless login 
                // we need token to get user details
                axios.post(`${api}/v1/login`, {
                        email : email , 
                        password : pass , 
                    } , 
                    {withCredentials : true }
                )
                navigate("/chat-app/chats")
            })
            .catch(err => {
                setLoading(false)
                const getErr = 
                err.response.data.message
                .includes("E11000 duplicate key error collection: test.users") ?
                "The user name is already found." :
                err.response?.status === 500 ?
                'Check internet connection' : 
                err.response.data.message.slice(0 , err.response.data.message.indexOf("(")) ;
                setError({left : "0" , type : getErr}) ; 
            })
        }
    }
    // function to read the image url from the file that user open
    function readUrl() {
        let url = URL.createObjectURL(inputFile.current.files[0]) ; 
        setImgUrl(url)
        contextValue.setValue({...contextValue.value , open_img_editor : true})
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
                        accept="image/*"
                        onClick={(e) => e.target.value = null}
                        />
                    <img 
                        src={editing_img || imgUrl} 
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
                        <Link to="/chat-app/login">Sign in</Link>
                    </span>
                </div>
            </form>
            {contextValue.value.open_img_editor && <CropImage imgUrl = {imgUrl}/>}
        </div>
    )
}