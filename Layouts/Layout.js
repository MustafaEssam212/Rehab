
import {notoKufiArabic} from '@/utils/fonts';
import Footer from '@/Components/Footer';
import Cookies from '@/Components/Cookies';




const Layout = ({children}) => {



    return(

        <div className={notoKufiArabic.className}>


            {children}

            <Cookies />

            <Footer />

        </div>

    )
}


export default Layout;