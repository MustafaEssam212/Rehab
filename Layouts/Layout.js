
import {notoKufiArabic} from '@/utils/fonts';
import Footer from '@/Components/Footer';
import Cookies from '@/Components/Cookies';
import IntroInfo from "@/Components/Landing/Intro-Info";
import Header from "@/Components/Header";
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";

const Layout = ({children}) => {



    return(

        <div className={notoKufiArabic.className}>

            <IntroInfo />
            <Header />
            
            {children}

            <div className='whats-app-float'>
                <Link target='_blank' href="https://www.wa.link/mtmbq6" title='تواصل معنا'><FaWhatsapp className='icon' /></Link>
            </div>

            <Cookies />

            <Footer />

        </div>

    )
}


export default Layout;