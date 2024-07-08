import './register.css'
import RegisterContent from '../../components/RegisterContent'
import img from './../../assets/Chat.gif'
export default function Register(props) {
    return (
        <div className="register-whole-page">
            <div className="register">
                <div className="video">
                    <img src={img} alt="image" />
                </div>
                <RegisterContent type = {props.type}/>
            </div>
        </div>
    )
}