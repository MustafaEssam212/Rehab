import { IoChatbubbles } from "react-icons/io5";
import UserChatSVG from '@/utils/svg/user-chat-svg';
import { IoCloseCircle } from "react-icons/io5";
import { useContext, useEffect } from 'react';
import { AppContext } from '@/utils/contextAPI';
import { IoMdClose } from "react-icons/io";


const ChatIcon = () => {

    const AppContxt = useContext(AppContext);


    useEffect(() => {
        if(AppContxt.chatDefaultMessage){
            const audio = new Audio(`${process.env.NEXT_PUBLIC_BASE_URL}/message.mp3`);
            audio.volume = 1;
            audio.play()
        }
    }, [AppContxt.chatDefaultMessage])


    return(


        <div className='chat-icon'>

                {
                    AppContxt.chatDefaultMessage ? <div className='chat-icon-message'>
                            <IoCloseCircle onClick={()=> AppContxt.setChatDefaultMessage(false)} className='Icon' />
                            
                            <div onClick={()=> AppContxt.setOpenChat(true)} className='chat-icon-inner-message'>
                                <UserChatSVG  />

                                <div className="paragraph">
                                    <span>اهلا بك في موقعنا فيزيو ريهاب لعلاج وتأهيل امراض المخ والاعصاب والعمود الفقرى. يقوم فريقنا الأن بمساعدة العملاء الآخرين. تحدث معنا الأن</span>
                                    <div className='message-info'>
                                        <span className='customer-service'>خدمة العملاء</span>
                                        <span>الان</span>
                                    </div>
                                </div>
   
                            </div>

                        </div> : <></>
                }


           
                <button onClick={()=> AppContxt.setOpenChat(!AppContxt.openChat)}>{AppContxt.openChat ? <IoMdClose className="Icon" /> : <IoChatbubbles className='Icon' />}</button>

    </div>


    )
}


export default ChatIcon;