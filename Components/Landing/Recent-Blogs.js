
import Image from "next/image";
import BlogPicOne from '../../public/blog1.png';
import BlogPicTwo from '../../public/blog2.jpg';
import BlogPicThree from '../../public/blog3.webp';
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
                        <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 440px) 350px, calc(79.17vw + 18px)" loading="lazy" src={BlogPicOne.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                    </div>

                    <Link href={`/blog/تأهييل_حالات_العظام_والعمود_الفقري`} title="تأهييل حالات العظام والعمود الفقري" className="blog-info">
                        <h2>تأهييل حالات العظام والعمود الفقري</h2>
                        <h3>يعتبر تأهيل حالات العظام والعمود الفقري من الأمور الحيوية التي يحتاجها العديد من الأشخاص الذين يعانون من إصابات أو أمراض تؤثر على الهيكل العظمي والعمود الفقري</h3>
                    </Link>

                    <div className="blog-line"><div className="inner-line"></div></div>

                    <div className="blog-details">
                        <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                        <Link href="/blogs">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                    </div>
                </div>

                <div className="blog">

                    <div className="blog-img">
                        <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 440px) 350px, calc(79.17vw + 18px)" loading="lazy" src={BlogPicTwo.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                    </div>

                    <Link href="/blog/تأهييل_حالات_الأعصاب_والشلل_بأنواعه" title="تأهييل حالات الأعصاب والشلل بأنواعه" className="blog-info">
                        <h2>تأهييل حالات الأعصاب والشلل بأنواعه</h2>
                        <h3>تُعتبر تأهيل حالات الأعصاب والشلل بأنواعه من التحديات الكبيرة في مجال العلاج الطبيعي. تُصاب الأعصاب بالعديد من الأمراض والإصابات التي تؤدي إلى فقدان القدرة على الحركة والشعور</h3>
                    </Link>

                    <div className="blog-line"><div className="inner-line"></div></div>

                    <div className="blog-details">
                        <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                        <Link href="/blogs">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                    </div>
                </div>

                <div className="blog">

                    <div className="blog-img">
                        <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 440px) 350px, calc(79.17vw + 18px)" loading="lazy" src={BlogPicThree.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                    </div>

                    <Link href="/blog/قسم_السمنة_وتنسيق_القوام" title="قسم السمنة وتنسيق القوام" className="blog-info">
                        <h2>قسم السمنة وتنسيق القوام</h2>
                        <h3>تُعتبر السمنة وتنسيق القوام من القضايا الصحية والجمالية التي تؤثر على حياة العديد من الأشخاص. يسعى الكثيرون إلى تحقيق وزن صحي وجسم متناسق بطرق فعّالة وآمنة</h3>
                    </Link>

                    <div className="blog-line"><div className="inner-line"></div></div>

                    <div className="blog-details">
                        <p>12-7-2024 <FaRegCalendarDays className="icon" /></p>
                        <Link href="/blogs">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                    </div>
                </div>
                

            </div>

        </div>
    )
}


export default RecentBlogs;