
import BlogCover from '../public/blog-cover.png';
import Image from 'next/image';
import BlogPicOne from '../public/blog1.png';
import BlogPicTwo from '../public/blog2.jpg';
import BlogPicThree from '../public/blog3.webp';
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";


const Blogs = () => {
    return(
        <div className="blogs-page-container">

            <div className="blogs-page-intro">
                <div className="img-container"><Image src={BlogCover.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image></div>
                <div className="layer-on">
                    <h1>مدوناتنا</h1>
                </div>
            </div>

            <div className='blogs-container'>

                <div className='inner-blogs-container'>
                    <div className="blog">

                        <div className="blog-img">
                            <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 400px) 350px, calc(62.5vw + 113px)" src={BlogPicOne.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                        </div>

                        <Link href={`/blog/تأهييل_حالات_العظام_والعمود_الفقري`} title="تأهييل حالات العظام والعمود الفقري" className="blog-info">
                            <h2>تأهييل حالات العظام والعمود الفقري</h2>
                            <h3>يعتبر تأهيل حالات العظام والعمود الفقري من الأمور الحيوية التي يحتاجها العديد من الأشخاص الذين يعانون من إصابات أو أمراض تؤثر على الهيكل العظمي والعمود الفقري</h3>
                        </Link>

                        <div className="blog-line"><div className="inner-line"></div></div>

                        <div className="blog-details">
                            <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                            <Link href="#">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                        </div>
                    </div>

                    <div className="blog">

                        <div className="blog-img">
                            <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 400px) 350px, calc(62.5vw + 113px)" src={BlogPicTwo.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                        </div>

                        <Link href="/blog/تأهييل_حالات_الأعصاب_والشلل_بأنواعه" title="تأهييل حالات الأعصاب والشلل بأنواعه" className="blog-info">
                            <h2>تأهييل حالات الأعصاب والشلل بأنواعه</h2>
                            <h3>تُعتبر تأهيل حالات الأعصاب والشلل بأنواعه من التحديات الكبيرة في مجال العلاج الطبيعي. تُصاب الأعصاب بالعديد من الأمراض والإصابات التي تؤدي إلى فقدان القدرة على الحركة والشعور</h3>
                        </Link>

                        <div className="blog-line"><div className="inner-line"></div></div>

                        <div className="blog-details">
                            <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                            <Link href="#">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                        </div>
                    </div>

                    <div className="blog">

                        <div className="blog-img">
                            <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 400px) 350px, calc(62.5vw + 113px)" src={BlogPicThree.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                        </div>

                        <Link href="/blog/قسم_السمنة_وتنسيق_القوام" title="قسم السمنة وتنسيق القوام" className="blog-info">
                            <h2>قسم السمنة وتنسيق القوام</h2>
                            <h3>تُعتبر السمنة وتنسيق القوام من القضايا الصحية والجمالية التي تؤثر على حياة العديد من الأشخاص. يسعى الكثيرون إلى تحقيق وزن صحي وجسم متناسق بطرق فعّالة وآمنة</h3>
                        </Link>

                        <div className="blog-line"><div className="inner-line"></div></div>

                        <div className="blog-details">
                            <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                            <Link href="#">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default Blogs;