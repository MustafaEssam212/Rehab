import { IoMdSettings } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import { BsGenderMale } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSession } from "next-auth/react";
import LoadingCircle from "../Loading-Circle";
import isValidEgyptianPhoneNumber from "@/utils/isValidEgyptianNumber";
import { toast } from "react-toastify";


const ProfileSettings = () => {

    const datePickerRef = useRef();
    const [openGender, setOpenGender] = useState(false);
    const { data: session } = useSession();
    const [data, setData] = useState({
        username: session.user.username,
        email: session.user.email,
        phoneNumber: session.user.phoneNumber,
        dateOfBirth: session.user.dateOfBirth,
        gender: session.user.gender,
        method: 'update-user-data',
        id: session.user.id
    });
        

    useEffect(() => {
        const getMyData = async () => {
            const res = await fetch(`/api/getData?method=get-my-data&id=${session.user.id}`);
            const dataOfResponse = await res.json();

            if(res.status === 200){
                console.log()
                setData({...data, username: dataOfResponse.data.username, phoneNumber: dataOfResponse.data.phoneNumber, dateOfBirth: dataOfResponse.data.dateOfBirth, gender: dataOfResponse.data.gender})
            }
        }

        getMyData()
    }, [])

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        if(isValidEgyptianPhoneNumber(data.phoneNumber) === false){
            toast.warning('برجاء ادخال رقم هاتف صحيح');
            setLoading(false);
        }else{
            const res = await fetch(`/api/editData`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setLoading(false);
            }
        }


    }

    return(
        <div className="profile-settings profile-component">
            <h1>تعديل معلومات <IoMdSettings className="icon" /></h1>

            <div className="inputs-container">
                <div className="input-container"><input value={data.username} onChange={(s)=> setData({...data, username: s.target.value})} type="text" aria-label="اسم المستخدم" placeholder="اسم المستخدم"></input> <FaRegUser className="icon" /></div>
                <div className="input-container"><input disabled value={data.email} onChange={(s)=> setData({...data, email: s.target.value})} type="email" aria-label="الإيميل" placeholder="الإيميل"></input> <MdOutlineEmail className="icon email-icon" /></div>
                <div className="input-container"><input value={data.phoneNumber} onChange={(s)=> setData({...data, phoneNumber: s.target.value})} type="number" aria-label="رقم الهاتف" placeholder="رقم الهاتف"></input> <MdOutlinePhoneEnabled className="icon email-icon" /></div>
                <div className="input-container" onClick={()=> datePickerRef.current.showPicker()}><input value={data.dateOfBirth} onChange={(s)=> setData({...data, dateOfBirth: s.target.value})} ref={datePickerRef} type="date" aria-label="تاريخ الميلاد" placeholder="تاريخ الميلاد"></input> <SlCalender className="icon" /></div>
                <div onClick={()=> setOpenGender(!openGender)} className="input-dropmenu">
                    <p>{openGender ? <IoMdArrowDropup className="icon" /> : <IoMdArrowDropdown className="icon" />} {data.gender ? data.gender : `الجنس`}</p> <BsGenderMale className="icon" />
                    
                    {openGender && <div className="dropdown">
                        <button aria-label="ذكر" onClick={()=> setData({...data, gender: 'ذكر'})}>ذكر</button>
                        <button aria-label="انثى" onClick={()=> setData({...data, gender: 'انثى'})}>انثى</button>
                    </div>}
                
                </div>
            </div>

            <button onClick={handleSubmit} className="main-button">{loading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
        </div>
    )
}


export default ProfileSettings;