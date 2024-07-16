
import Image from "next/image";
import Link from "next/link";
import Logo from '../public/logo-header.png';
import { FiCalendar } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { HiBars3 } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import { FaHome, FaPhone, FaCommentDots, FaBloggerB, FaInfo } from "react-icons/fa";
import { useRouter } from "next/router";

const Header = () => {

    const [openMobileHeader, setOpenMobileHeader] = useState(false);
    const innerMenuRef = useRef();
    const router = useRouter();
    const [displayBehaviour, setDisplayBehaviour] = useState(0)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (innerMenuRef.current && !innerMenuRef.current.contains(event.target)) {

                setOpenMobileHeader(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setOpenMobileHeader(false);
    }, [router.pathname]);


    useEffect(()=> {
        if(router.isReady){
            setTimeout(()=> {
                setDisplayBehaviour(1)
            }, 1000)
        }
    }, [router.isReady])

    return( 

        <header>

            <div className="Logo"><Link href="/"><Image sizes="(min-width: 2060px) 110px, (min-width: 1940px) 100px, (min-width: 1720px) 90px, (min-width: 1540px) 80px, 70px" src={Logo.src} alt="Physio Rehab Logo" fill style={{ objectFit: 'contain' }}></Image></Link></div>

            <div className="header-right">

                <div className="header-right-pages">
                    <Link title="معلومات عن مركز ريهاب" href="#">معلومات عنا</Link>
                    <Link title="مدوناتنا" href="#">مدوناتنا</Link>
                    <Link title="آراء عملائنا" href="#">آراء عملائنا</Link>
                    <Link title="تواصل معنا" href="/contact">تواصل معنا</Link>
                    <Link title="الصفحة الرئيسية" href="/">الرئيسية</Link>
                </div>

                <div className="header-right-buttons">

                    <button>احجز الأن <FiCalendar className="Icon" /></button>
                    <button>التسجيل <FiUser className="Icon" /></button>

                </div>

            </div>

            <div className="mobile-header">
                <div className="bars"><HiBars3 onClick={()=> setOpenMobileHeader(true)} className="mobile-bars" /></div>

                <div style={{opacity: displayBehaviour}} className={openMobileHeader ? "mobile-menu active-menu-background" : "mobile-menu off-menu-background"}>
                    <div ref={innerMenuRef} className={openMobileHeader ? "inner-mobile-menu active" : "inner-mobile-menu off-menu"}>


                            <div className="mobile-header-pages">
                                <Link className={router.pathname === '/about' ? "active" : ""} title="معلومات عن مركز ريهاب" href="#">معلومات عنا <FaInfo className="icon" /></Link>
                                <Link className={router.pathname === '/blogs' ? "active" : ""} title="مدوناتنا" href="#">مدوناتنا <FaBloggerB className="icon" /></Link>
                                <Link className={router.pathname === '/reviews' ? "active" : ""} title="آراء عملائنا" href="#">آراء عملائنا <FaCommentDots className="icon" /></Link>
                                <Link className={router.pathname === '/contact' ? "active" : ""} title="تواصل معنا" href="/contact">تواصل معنا <FaPhone className="icon" /></Link>
                                <Link className={router.pathname === '/' ? "active" : ""} title="الصفحة الرئيسية" href="/">الرئيسية <FaHome className="icon" /></Link>
                            </div>

                            <div className="mobile-header-btns">
                                <button>احجز الأن <FiCalendar className="Icon" /></button>
                                <button>التسجيل <FiUser className="Icon" /></button>
                            </div>

                    </div>
                </div>
            </div>

        </header>

    )
}


export default Header;