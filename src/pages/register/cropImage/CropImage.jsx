import { useContext, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import { dataURLContext } from "../../../context/Context";
import './cropImage.css'

export default function CropImage({imgUrl}) {

    // crop coordinates
    let [crop , setCrop] = useState({
        unit : "px" , 
        x : 50 , 
        y :50 , 
        width : 100 , 
        height : 100
    }) ; 

    // Ref Hook
    let canvas = useRef() ; 
    let img = useRef() ; 

    // context
    let context = useContext(dataURLContext) ; 

    // get the url of edited image 

    function getTheImgFromCanvas() {
        let scaleX = img.current.naturalWidth / img.current.width ; 
        let scaleY = img.current.naturalHeight / img.current.height ; 
        let cWidth = canvas.current.width ; 
        let cHeight = canvas.current.height ; 
        let ctx = canvas.current.getContext("2d") ; 
        ctx.drawImage(
            img.current ,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX, 
            crop.height * scaleY  , 
            0 , 0 , 
            cWidth , 
            cHeight) ; 

        let dataUrl = canvas.current.toDataURL("image/jpeg", 1.0) ; 

        context.setValue(prev => {
            return {...prev , img : dataUrl}
        }) ; 
    }

    // close editor sectoin

    function close() {
        context.setValue(prev => {
            return {...prev , open_editor_section : false}}
        )
    }
    
    return (
        <div className="crop-img">

            <ReactCrop keepSelection onComplete={getTheImgFromCanvas} aspect={1} circularCrop crop={crop} onChange={e => setCrop(e)}>
                <img className="selected" ref={img} src={imgUrl} alt="user image" />
            </ReactCrop>

            <canvas width={300} height={300} hidden ref={canvas}>
                sorry ! your browser don't support canvas
            </canvas>
            <button onClick={close}>Done</button>
        </div>
        
    )
}