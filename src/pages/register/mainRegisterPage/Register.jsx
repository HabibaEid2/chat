import './register.css'
import bg from './../../../assets/background.mp4'
import register_v from './../../../assets/register-v.mp4'
import Login from '../login/Login'
import SignUp from '../signUp/SignUp'
export default function Register(props) {
    return (
        <div className="register-whole-page">
            <div className="vedio-bg">
                <video loop controls = {false} autoPlay src={bg} muted>
                    your browser doesn't support video tag
                </video>
            </div>
            <div className="register">
                <div className="register-v">
                    <video loop controls = {false} autoPlay src={register_v} muted>
                        your browser doesn't support video tag
                    </video>
                </div>
                {props.type === "login" ? <Login/> : <SignUp/>}
            </div>
        </div>
    )
}