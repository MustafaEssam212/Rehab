import { useState, useEffect, useRef, useContext } from 'react';
import SignUp from "./Sign-Up";
import SignIn from "./Sign-In";
import { AppContext } from '@/utils/contextAPI';

const AuthModal = () => {


    const [windowWidth, setWindowWidth] = useState(0);
    const modalRef = useRef();
    const AppContxt = useContext(AppContext);

    useEffect(() => {
        // Check if window is defined to avoid SSR issues
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            // Set the initial width
            handleResize();

            // Add event listener to track window resize
            window.addEventListener('resize', handleResize);

            // Cleanup event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        if (modalRef.current) {
            if (windowWidth <= 916 && AppContxt.authModalSection === 'Register') {
                modalRef.current.style.height = 'auto';
            } else if (windowWidth <= 916 && AppContxt.authModalSection === 'SignIn') {
                modalRef.current.style.height = '110vh';
            } else {
                modalRef.current.style.height = ''; // Reset to default if needed
            }
        }
    });

    return (
        <div ref={modalRef} className="auth-modal-container">
    
            <SignUp />
            <SignIn />
        </div>
    );
};

export default AuthModal;
