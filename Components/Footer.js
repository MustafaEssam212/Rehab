import { MdEmail, MdPhone, MdLocationPin } from "react-icons/md";
import { FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Logo from '../public/footer-logo.png';

import { AiFillTikTok } from "react-icons/ai";

const Footer = () => {
    return(

        <footer>

                <div className="footer-top">


                        <div className="footer-top-left">


                            <h2>تواصل</h2>
                            <p><MdEmail className="icon" /> support@rehabeg.clinic</p>
                            <p><MdLocationPin className="icon location" /> <span>6</span> من اكتوبر - المحور المركزي - جولدن مول - اعلى مطعم رسلان وصيدليات مصر </p>
                            <p><MdPhone className="icon phone" /> +20 1204515349</p>
                            <p><MdPhone className="icon phone" /> +20 1507110041</p>
                            <p><MdPhone className="icon phone" /> +20 1066205166</p>
                            <p><MdPhone className="icon phone" /> +20 1125902099</p>

                            <div className="footer-top-left-socials">
                                <Link title="فيس بوك" href="https://www.google.com" target="_blank"><FaFacebookSquare className="social-Icon" /></Link>
                                <Link title="تيك توك" href="https://www.google.com" target="_blank"><AiFillTikTok className="social-Icon tiktok" /></Link>
                                <Link title="إنستجرام" href="https://www.google.com" target="_blank"><FaInstagramSquare className="social-Icon" /></Link>
                                <Link title="واتس آب" href="#" target="_blank"><FaWhatsappSquare className="social-Icon" /></Link>
                            </div>

                        </div>


                        <div className="footer-top-middle">

                            <h2>الموقع</h2>
                            <Link href="/">الرئيسية</Link>
                            <Link href="#">معلومات عنا</Link>
                            <Link href="/contact">تواصل معنا</Link>

                        </div>
        
                        <div className="footer-top-right">

                        <div className="Logo"><Link href="/"><Image sizes="(min-width: 1940px) 200px, (min-width: 1720px) 150px, (min-width: 1540px) 130px, 110px" src={Logo.src} alt="Physio Rehab Logo" fill style={{ objectFit: 'cover' }}></Image></Link></div>
                        <p>مركز ريهاب للعلاج الطبيعي وامراض المخ والاعصاب والعمود الفقري وخشونة المفاصل ولإعادة تأهيل إصابات النخاع الشوكي والجلطات وغيرها من حالات العلاج الطبيعي</p>
                        <p>.جميع الحقوق محفوظة 2024 لمركز ريهاب للعلاج الطبيعي والتأهيل &copy;</p>
                        </div>


                </div>



        </footer>

    )
}


export default Footer;