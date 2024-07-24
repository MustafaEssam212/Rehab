
import {notoKufiArabic} from '@/utils/fonts';
import Footer from '@/Components/Footer';
import Cookies from '@/Components/Cookies';
import IntroInfo from "@/Components/Landing/Intro-Info";
import Header from "@/Components/Header";


const Layout = ({children}) => {



    return(

        <div className={notoKufiArabic.className}>

            <IntroInfo />
            <Header />
            
            {children}

            <Cookies />

            <Footer />

        </div>

    )
}


export default Layout;