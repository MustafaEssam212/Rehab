
import ChatIcon from './Chat-Icon';
import { useContext } from 'react';
import { AppContext } from '@/utils/contextAPI';
import dynamic from 'next/dynamic';


const ChatContainer = dynamic(() => import('./Chat-Container'));

const ChatMain = () => {

    const AppContxt = useContext(AppContext);


    return(
        <div className='chat-main-container'>
        

            {AppContxt.openChat && <ChatContainer />}
            <ChatIcon />



        </div>
    )
}


export default ChatMain;