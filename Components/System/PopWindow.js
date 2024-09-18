import { IoCloseCircleSharp } from "react-icons/io5";
import { BiSolidUserPin } from "react-icons/bi";
import { IoTime, IoTicket } from "react-icons/io5";
import { MdPhoneEnabled } from "react-icons/md";
import { FaUserMd, FaCalendarAlt } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

const PopWindow = ({sendDataFromChild, data}) => {

   const handleClosePop = () => {
        sendDataFromChild(false)
   }


    return(
        <div className={"pop-window"}>
            <div className="inner-pop-window">
                <div className="pop-head">
                    <h1>معلومات الحجز</h1>
                    <button title="اغلاق" onClick={handleClosePop} aria-label="اغلاق"><IoCloseCircleSharp className="icon" /></button>
                </div>

                <div className="pop-content">
                    <div className="inner-pop-content">
                        <h2>{data.doctorName} <FaUserMd className="icon" /></h2>
                        <h2>{data.reservationName} <BiSolidUserPin className="icon largest-icon" /></h2>
                        <h2>{data.date} <FaCalendarAlt className="icon" /></h2>
                        <h2>{data.reservationTime} <IoTime className="icon large-icon" /></h2>
                        <h2>{data.category} <FaBriefcaseMedical className="icon" /></h2>
                        <h2>{data.reservationSerial} <IoTicket className="icon" /></h2>
                        <h2>{<Link href={`https://wa.me/2${data.userNumber}`} target="_blank">{data.userNumber}</Link>} <MdPhoneEnabled className="icon" /></h2>
                        <h2>{data.whatsAppNumber ? <Link href={`https://wa.me/2${data.whatsAppNumber}`} target="_blank">{data.whatsAppNumber}</Link> : `لا يوجد`}  <IoLogoWhatsapp className="icon" /></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PopWindow;