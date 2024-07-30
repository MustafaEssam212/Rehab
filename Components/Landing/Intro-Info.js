
import {  MdPhone, MdLocationPin } from "react-icons/md";
import { FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";
import Link from "next/link";
import { AiFillTikTok } from "react-icons/ai";

const IntroInfo = () => {
    return(
        <div className="intro-info">
                <div className="intro-info-left">
                    <Link href="https://www.wa.link/mtmbq6" aria-label="WhatsApp" target="_blank"><FaWhatsappSquare className="social-Icon" /></Link>
                    <Link href="https://www.instagram.com/rehabclinic11" aria-label="Instagram" target="_blank"><FaInstagramSquare className="social-Icon" /></Link>
                    <Link href="https://www.tiktok.com/@rehabclinic11" aria-label="Tiktok" target="_blank"><AiFillTikTok className="social-Icon tiktok" /></Link>
                    <Link href="https://www.facebook.com/rehabclinic11" aria-label="Facebook" target="_blank"><FaFacebookSquare className="social-Icon" /></Link>
                </div>

                <div className="intro-info-right">

                    <p><MdPhone className="icon phoneIcon" /> +20 1204515349</p>
                    <p><MdPhone className="icon phoneIcon" /> +20 1507110041</p>
                    <p><MdPhone className="icon phoneIcon" /> +20 1066205166</p>
                    <p><MdPhone className="icon phoneIcon" /> +20 1125902099</p>
                    <p><MdLocationPin className="icon" /> <span>6</span> من اكتوبر - المحور المركزي - جولدن مول - اعلى مطعم رسلان وصيدليات مصر </p>

                </div>
        </div>
    )
}


export default IntroInfo;