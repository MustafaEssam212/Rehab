
import LoadingCircle from "../Loading-Circle";
import { useState } from "react";

const ChatRequrieInfo = () => {

    const [data, setData] = useState({
        firstName: null,
        secondName: null,
        phoneNumber: null
    })



    return(
        <div className="chat-require-info-container">

            <h4>برجاء ملئ المعلومات المطلوبة لإكمال المحادثة مع خدمة العملاء <span></span></h4>
            

            <div className="inputs">

                <input onChange={(s)=> setData({...data, firstName: s.target.value})} type="text" placeholder="الإسم الأول"></input>
                <input onChange={(s)=> setData({...data, secondName: s.target.value})} type="text" placeholder="لقب العائلة"></input>
                <input onChange={(s)=> setData({...data, phoneNumber: s.target.value})} type="number" placeholder="رقم الهاتف"></input>
                <button>{true ? 'التالي' : <LoadingCircle providedcolor="white" size={`15px`} />}</button>

            </div>

   

        </div>
    )
}


export default ChatRequrieInfo;