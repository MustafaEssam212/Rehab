import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MdOutlineVerticalDistribute } from "react-icons/md";


const HeadSystem = ({name}) => {
    return(
        <div className="head-system">
                <Link href="/dashboard" aria-label="الرجوع للخلف" title="الرجوع للخلف"><FaArrowAltCircleLeft className="icon" /></Link>
                <h1>{name}<MdOutlineVerticalDistribute className="icon" /></h1>
        </div>
    )
}

export default HeadSystem;