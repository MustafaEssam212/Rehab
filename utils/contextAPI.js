import { createContext } from "react";
import { useState, useEffect } from "react";


export const AppContext = createContext();


export const AppProvider = ({children}) => {

    const [openChat, setOpenChat] = useState(false);
    const [chatDefaultMessage, setChatDefaultMessage] = useState(false);
    const [cookiesAcceptance, setCookiesAcceptance] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [authModalSection, setAuthModalSection] = useState('Register')
    

    useEffect(() => {

        setTimeout(() => {
            setChatDefaultMessage(true);
        }, 15000)    

    }, [])




    return(
        <AppContext.Provider value={{openChat, setOpenChat, chatDefaultMessage, setChatDefaultMessage, cookiesAcceptance, setCookiesAcceptance, videoModal, setVideoModal, authModalSection, setAuthModalSection}}>
            {children}
        </AppContext.Provider>
    )
}