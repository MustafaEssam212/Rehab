
import Image from "next/image";
import BlogPicOne from '../../public/blog1.jpg';
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

                    <Link href={`/blog/جهاز_شد_الفقرات_الإلكتروني`} title="جهاز شد الفقرات الإلكتروني" className="blog-info">
                        <h2>جهاز شد الفقرات الإلكتروني</h2>
                        <h3>تُعتبر آلام الظهر والعمود الفقري من المشاكل الصحية الشائعة التي تؤثر على جودة الحياة والنشاط اليومي للعديد من الأشخاص. يأتي جهاز شد الفقرات الإلكتروني كحل متطور وفعّال لتخفيف هذه الآلام</h3>
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

                    <Link href="/blog/تأهيل_حالات_الرباط_الصليبي_قبل_وبعد_العملية" title="تأهيل حالات الرباط الصليبي قبل وبعد العملية" className="blog-info">
                        <h2>تأهيل حالات الرباط الصليبي قبل وبعد العملية</h2>
                        <h3>إصابة الرباط الصليبي تُعتبر من الإصابات الشائعة بين الرياضيين والأشخاص النشطين جسديًا، وتؤثر بشكل كبير على الحركة والأداء البدني</h3>
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

                    <Link href="/blog/تأهيل_حالات_ما_بعد_الجلطات" title="تأهيل حالات ما بعد الجلطات" className="blog-info">
                        <h2>تأهيل حالات ما بعد الجلطات</h2>
                        <h3>تُعد الجلطات من الحالات الطبية الطارئة التي تتطلب تدخلاً سريعاً وفعّالاً لإنقاذ حياة المريض وتقليل الأضرار الناجمة عنها. بعد التعافي من الجلطة</h3>
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