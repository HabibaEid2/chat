import './register.css'
import RegisterContent from '../../components/registerContent/RegisterContent'
import img from './../../assets/Chat.gif'
import bg from './../../assets/background.mp4'
import register_v from './../../assets/register-v.mp4'
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
                <RegisterContent type = {props.type}/>
            </div>
        </div>
    )
}