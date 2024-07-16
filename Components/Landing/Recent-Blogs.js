
import Image from "next/image";
import BlogPicOne from '../../public/blog-pic.webp';
import BlogPicTwo from '../../public/blog-pic-2.png';
import BlogPicThree from '../../public/blog-pic-3.webp';
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";

const RecentBlogs = () => {
    return(
        <div className="recent-blogs-landing-container">
            <div className="global-headline">
                <h1>أحدث مدوناتنا</h1>
                <div className="global-headline-line"></div>
            </div>


            <div className="inner-recent-blogs">

                <div className="blog">

                    <div className="blog-img">
                        <Image src={BlogPicOne.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                    </div>

                    <Link href="#" className="blog-info">
                        <h2>يوجد متخصصين علاج الطبيعي في هذا المركز</h2>
                        <h3>يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز</h3>
                    </Link>

                    <div className="blog-line"><div className="inner-line"></div></div>

                    <div className="blog-details">
                        <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                        <Link href="#">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                    </div>
                </div>

                <div className="blog">

                    <div className="blog-img">
                        <Image src={BlogPicTwo.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                    </div>

                    <Link href="#" className="blog-info">
                        <h2>يوجد متخصصين علاج الطبيعي في هذا المركز</h2>
                        <h3>يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز</h3>
                    </Link>

                    <div className="blog-line"><div className="inner-line"></div></div>

                    <div className="blog-details">
                        <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                        <Link href="#">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                    </div>
                </div>

                <div className="blog">

                    <div className="blog-img">
                        <Image src={BlogPicThree.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                    </div>

                    <Link href="#" className="blog-info">
                        <h2>يوجد متخصصين علاج الطبيعي في هذا المركز</h2>
                        <h3>يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز يوجد متخصصين في العلاج الطبيعي في هذا المركز</h3>
                    </Link>

                    <div className="blog-line"><div className="inner-line"></div></div>

                    <div className="blog-details">
                        <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                        <Link href="#">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                    </div>
                </div>
                

            </div>

        </div>
    )
}


export default RecentBlogs;