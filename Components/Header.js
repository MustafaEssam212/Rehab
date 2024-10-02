
import Image from "next/image";
import Link from "next/link";
import Logo from '../public/logo-header.png';
import { FiCalendar } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { HiBars3 } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import { FaHome, FaPhone, FaCommentDots, FaBloggerB, FaInfo, FaUserCircle } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { MdDashboard } from "react-icons/md";

const Header = () => {

    const [openMobileHeader, setOpenMobileHeader] = useState(false);
    const innerMenuRef = useRef();
    const router = useRouter();
    const [displayBehaviour, setDisplayBehaviour] = useState(0);
    const signPageRef = useRef();
    const { data: session } = useSession();
    const reservationPageRef = useRef();
    const dashboardPageRef = useRef();
    const profilePageRef = useRef();

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
                    {session && <Link title="تسجيل الخروج" href="#" onClick={()=> signOut()}>تسجيل الخروج</Link>}
                    <Link title="معلومات عن مركز ريهاب" href="/about">معلومات عنا</Link>
                    <Link title="اراء عملائنا" href="/reviews">اراء عملائنا</Link>
                    <Link title="سابقة اعمالنا" href="/previous-work">سابقة اعمالنا</Link>
                    <Link title="مدوناتنا" href="/blogs">مدوناتنا</Link>
                    <Link title="تواصل معنا" href="/contact">تواصل معنا</Link>
                    <Link title="الصفحة الرئيسية" href="/">الرئيسية</Link>
                </div>

                <div className="header-right-buttons">

                    {
                        session && session.user.role === 'admin' ? <button onClick={()=> dashboardPageRef.current.click()} aria-label="لوحة التحكم">لوحة التحكم <MdDashboard className="Icon" /></button> :                     <button onClick={()=> reservationPageRef.current.click()} aria-label="احجز الأن">احجز الأن <FiCalendar className="Icon" /></button>
                    }
                    {
                        !session ? <button onClick={()=> signPageRef.current.click()} aria-label="التسجيل">التسجيل <FiUser className="Icon" /></button> : <button onClick={()=> profilePageRef.current.click()} aria-label="الملف الشخصي">الملف الشخصي <FaUserCircle className="Icon" /></button>
                    }

                </div>

            </div>

            <div className="mobile-header">
                <div className="bars"><HiBars3 onClick={()=> setOpenMobileHeader(true)} className="mobile-bars" /></div>

                <div style={{opacity: displayBehaviour}} className={openMobileHeader ? "mobile-menu active-menu-background" : "mobile-menu off-menu-background"}>
                    <div ref={innerMenuRef} className={openMobileHeader ? "inner-mobile-menu active" : "inner-mobile-menu off-menu"}>


                            <div className="mobile-header-pages">
                                <Link className={router.pathname === '/about' ? "active" : ""} title="معلومات عن مركز ريهاب" href="/about">معلومات عنا <FaInfo className="icon" /></Link>
                                <Link className={router.pathname === '/reviews' ? "active" : ""} title="اراء عملائنا" href="/reviews">اراء عملائنا <FaCommentDots className="icon" /></Link>
                                <Link className={router.pathname === '/previous-work' ? "active" : ""} title="سابقة اعمالنا" href="/previous-work">سابقة اعمالنا <MdWork className="icon" /></Link>
                                <Link className={router.pathname === '/blogs' ? "active" : ""} title="مدوناتنا" href="/blogs">مدوناتنا <FaBloggerB className="icon" /></Link>
                                <Link className={router.pathname === '/contact' ? "active" : ""} title="تواصل معنا" href="/contact">تواصل معنا <FaPhone className="icon" /></Link>
                                <Link className={router.pathname === '/' ? "active" : ""} title="الصفحة الرئيسية" href="/">الرئيسية <FaHome className="icon" /></Link>

                            </div>

                            <div className="mobile-header-btns">
                                {session && <button onClick={()=> signOut()} aria-label="تسجيل الخروج">تسجيل الخروج</button>}
                                {
                                    session && session.user.role === 'admin' ? <button onClick={()=> dashboardPageRef.current.click()} aria-label="لوحة التحكم">لوحة التحكم <MdDashboard className="Icon" /></button> :                     <button onClick={()=> reservationPageRef.current.click()} aria-label="احجز الأن">احجز الأن <FiCalendar className="Icon" /></button>
                                }
                                {
                                    !session ? <button onClick={()=> signPageRef.current.click()} aria-label="التسجيل">التسجيل <FiUser className="Icon" /></button> : <button onClick={()=> profilePageRef.current.click()} aria-label="الملف الشخصي">الملف الشخصي <FaUserCircle className="Icon" /></button>
                                }
                            </div>

                    </div>
                </div>
            </div>


            <Link className="sign-link" ref={signPageRef} href="/sign" title="التسجيل" aria-label="التسجيل">التسجيل</Link>
            <Link className="sign-link" ref={reservationPageRef} href="/reservation" title="احجز الأن" aria-label="احجز الأن">احجز الأن</Link>
            <Link className="sign-link" ref={dashboardPageRef} href="/dashboard" title="لوحة التحكم" aria-label="لوحة التحكم">لوحة التحكم</Link>
            <Link className="sign-link" ref={profilePageRef} href="/profile" title="الملف الشخصي" aria-label="الملف الشخصي">الملف الشخصي</Link>
        </header>

    )
}


export default Header;