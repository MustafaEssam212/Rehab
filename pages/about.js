import Image from "next/image";
import AboutCoverPic from '../public/about-cover.png';
import AboutPic from '../public/about-pic.png';
import { motion } from "framer-motion";
import ToolPic from '../public/tool.png';
import ExpertPic from '../public/about-wall.png';
import { FaRegCircleCheck } from "react-icons/fa6";

const About = () => {





    return(
        <div className="about-page-container">
            <div className="about-page-intro">
                <div className="img-container"><Image src={AboutCoverPic.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image></div>
                <div className="layer-on">
                    <h1>معلومات عنا</h1>
                </div>
            </div>

            <div className="doctor-landing-container">
            
            <div className="doctor-landing-inner">

                <div className="doctor-landing-left">

                    <div className="background-doctor"><motion.div initial={{y: 0, x: 0}} animate={{y: 30, x: 30}} transition={{ease: 'linear', duration: 1.5, repeat: Infinity, repeatType:"reverse"}} className="background-one"></motion.div> <motion.div initial={{y: 0, x: 0}} animate={{y: -30, x: -30}} transition={{ease: 'linear', duration: 1.5, repeat: Infinity, repeatType:"reverse"}} className="background-two"></motion.div></div>
                    <div className="img-container">
                        <Image sizes="(min-width: 1120px) calc(42.5vw - 50px), 95vw" src={AboutPic.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image>
                    </div>

                </div>


                <div className="doctor-landing-right">
                    <div className="doctor-right-container">
                        <motion.div initial={{y: 0}} animate={{y: 50}} transition={{ease: 'linear', duration: 1.5, repeat: Infinity, repeatType:"reverse"}} className="background-doctor-right"><Image sizes="(min-width: 1120px) calc(42.5vw - 50px), 100vw" src={ToolPic.src} fill style={{objectFit: 'contain'}} alt="Rehab EG Center"></Image></motion.div>
                        <div className="layer-on-background">
                            <h1>معلومات عن مركزنا</h1>
                            <h2>مركز ريهاب للعلاج الطبيعي</h2>

                            <div className="layer-on-notes">
                                <div className="note"><span className="dot"></span> <h3>تأهيل جميع إصابات العظام والمفاصل</h3></div>
                                <div className="note"><span className="dot"></span> <h3>تأهيل حالات الأعصاب والشلل بأنواعه</h3></div>
                                <div className="note"><span className="dot"></span> <h3>التخسيس الموضعي ونحت القوام</h3></div>
                                <div className="note"><span className="dot"></span> <h3>تأهيل حالات تقوس العمود الفقري</h3></div>
                                <div className="note"><span className="dot"></span> <h3>جيم متكامل للتمرينات العلاجية</h3></div>
                                <div className="note"><span className="dot"></span> <h3>تأهيل حالات تيبس الفقرات وإصابات العمود الفقري</h3></div>
                                <div className="note"><span className="dot"></span> <h3>العلاج اليدوي والكايروبراكتيك</h3></div>
                                <div className="note"><span className="dot"></span> <h3>قسم خاص بالسيدات</h3></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            </div>


            <div className="expert-about-page">


            <div className="expert-left">
                        

                        <div className="sections-container">

                            <h1 className="expert-left-headline">خبرتنا</h1>
                            
                            <div className="inner-sections-container">
                                    <div className="section">
                                        <div className="icon-container"><FaRegCircleCheck className="icon" /></div>
                                        <h1>العظام والمفاصل</h1>
                                        <h3>مركزنا متخصص في علاج العظام والمفاصل، نستخدم تقنيات حديثة لزيادة المرونة وتقليل الألم وتحسين الوظائف الحركية</h3>
                                    </div>


                                    <div className="section">
                                        <div className="icon-container"><FaRegCircleCheck className="icon" /></div>
                                        <h1>الاعصاب والشلل</h1>
                                        <h3>يقدم مركزنا علاجًا متخصصًا للأعصاب والشلل، باستخدام أحدث التقنيات لتحسين الحركة واستعادة الوظائف الحركية</h3>
                                    </div>



                                    <div className="section">
                                        <div className="icon-container"><FaRegCircleCheck className="icon" /></div>
                                        <h1>التخسيس والنحت</h1>
                                        <h3>يوفر مركزنا خدمات تخسيس ونحت الجسم باستخدام برامج متخصصة وتقنيات متقدمة لتحسين القوام والصحة العامة</h3>
                                    </div>


                                    <div className="section">
                                        <div className="icon-container"><FaRegCircleCheck className="icon" /></div>
                                        <h1>العلاج اليدوي</h1>
                                        <h3>نقدم علاجات يدوية متخصصة، لتحسين الحركة وتخفيف الألم باستخدام تقنيات متقدمة تُعزز التعافي وتُعيد التوازن للجسم</h3>
                                    </div>
                            </div>


                        </div>
                    </div>


                    <div className="expert-right">
                        <Image sizes="(min-width: 1720px) 30vw, 25vw" src={ExpertPic.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                    </div>


            </div>





        </div>
    )
}


export default About;