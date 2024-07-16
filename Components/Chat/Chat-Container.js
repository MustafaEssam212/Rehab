
import UserChatSVG from '@/utils/svg/user-chat-svg';
import { useEffect, useState, useRef } from 'react';
import { GrAttachment } from "react-icons/gr";
import dynamic from 'next/dynamic';
import LoadingCircle from "../Loading-Circle";
import { motion } from 'framer-motion';


const ChatRequrieInfo = dynamic(()=> import('./Chat-Require-Info'), {
    loading: ()=> <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><LoadingCircle size={`50px`} /></div>
})


const ChatMessages = dynamic(() => import('./Chat-Messages'), {
    loading: ()=> <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><LoadingCircle size={`50px`} /></div>
})


const ChatContainer = () => {

    const [message, setMessage] = useState('');
    const [file, setFile] = useState('');
    const fileInputRef = useRef();

    const sendTextMessage = (s) => {
        s.preventDefault()
        alert('send')
    }


    return(
        <motion.div initial={{y: '50px', opacity: 0}} animate={{y: '0', opacity: 1}} transition={{ type: "spring", duration: 0.8 }} className="chat-container">
            

            <div className="chat-header">

                <UserChatSVG />

                <div>
                    <p>خدمة العملاء</p>
                    {/* <p>الخدمة متاحة الأن <span></span></p> */}
                    <p className='offline'>الخدمة غير متاحة الأن <span></span></p>
                </div>

            </div>


            <div className="chat-middle">
                <ChatRequrieInfo />
            </div>


            <form onSubmit={sendTextMessage} className="chat-footer disabled-chat-footer">

                <input className='text-input' type='text' onChange={(s) => setMessage(s.target.value)} placeholder='اكتب رسالتك'></input>
                <input ref={fileInputRef} onChange={(s) => setFile(s.target.files[0])} className='file-input' type='file' accept="image/*"></input>
                <GrAttachment className='Icon' onClick={()=> fileInputRef.current.click()} />

            </form>
            


        </motion.div>
    )
}


export default ChatContainer;