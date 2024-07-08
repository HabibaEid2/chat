import './welcomePage.css' ; 
import welcomeImg from './../../../assets/welcome-img.gif'
import { useContext, useState } from 'react';
import { useRef } from 'react';
import CropImage from '../cropImage/CropImage';
import { dataURLContext } from '../../../context/Context';

export default function WelcomPage(props) { 

    let [addPhoto , setAddPhoto] = useState(false) ; 
    let [imgUrl , setImgUrl] = useState("") ; 

    let inputFile = useRef("") ; 

    let context = useContext(dataURLContext) ; 

    // click on image to simulate clicking on input 

    function changeImg () {
        inputFile.current.click() ; 
    }

    // get the selected image url 

    function readUrl() {
        let url = URL.createObjectURL(inputFile.current.files[0]) ; 
        setImgUrl(url) ; 
        context.setValue(prev => {
            return {...prev , open_editor_section : true}
        }) ; 
        console.log("yes select the image")
    }

    return (
        <div className="welcome-page">
            <div  className="welcome-content">
                <div className="txt">
                    Hello <span className='userName'>{props.name || "Habiba"} </span> 
                    now you are a memeber of our family <span className='thanks'>thank you</span> for register
                </div>

                <div className="img-section">
                    {!addPhoto ? 
                    <>
                        <div className="img">
                        <img src={welcomeImg} alt="welcome image" />
                        </div>
                        <button onClick={() => setAddPhoto(!addPhoto)} className="add-photo">Add Photo</button> 
                    </> : 

                    <div>
                        <div onClick={changeImg} className="user-img">
                            <img src={context.value.img} alt="user image"/>
                        </div>

                        <input onChange={readUrl} ref={inputFile} id='get' type="file" hidden/>

                        <button className="goToChats">continue</button>
                    </div>
                    }
                </div>
            </div>

            {context.value.open_editor_section && <CropImage imgUrl = {imgUrl}/>}
        </div>
    )
}