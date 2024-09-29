
import { FaEdit } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";

const TopBar = () => {
    return(
        <div className="top-bar">
            <button>تعديل سعر الجلسة والكشف <FaEdit className="icon" /></button>
            <button>اضافة باكيدچ جديدة <MdAddBox className="icon" /></button>
        </div>
    )
}


export default TopBar;