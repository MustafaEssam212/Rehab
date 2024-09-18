import { IoMdSettings } from "react-icons/io";
import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
const ChangePassword = () => {

    const [data, setData] = useState({
        password: '',
        prePassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const session = await getSession();
        setLoading(true);
        if(!data.password || !data.prePassword || !data.confirmPassword){
            toast.warning('برجاء ادخال المعلومات المطلوبة')
        }else{
            if(data.password.length <= 7){
                toast.warning('برجاء ادخال كلمة مرور اكبر من 7 احرف او ارقام')
            }
            else if(data.password !== data.confirmPassword){
                toast.warning('تأكيد كلمة المرور يجب ان تطابق مع كلمة المرور')
            }else{

                const res = await fetch(`/api/editData?method=change-password&id=${session.user.id}`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const dataOfResponse = await res.json();

                if(res.status === 200){
                    toast.success(dataOfResponse.message);
                    setData({
                        password: '',
                        prePassword: '',
                        confirmPassword: ''
                    });
                    setLoading(false);
                }else{
                    toast.error(dataOfResponse.message);
                    setLoading(false);
                }


            }


        }
    }


    return(
        <div className="change-password-container profile-component">
            <h1>تغيير كلمة المرور <IoMdSettings className="icon" /></h1>

            <div className="inputs-container">
                <div className="input-container"><input onChange={(s)=> setData({...data, prePassword: s.target.value})} type="password" aria-label="الرقم السري القديم" placeholder="الرقم السري القديم"></input> <FiLock className="icon" /></div>
                <div className="input-container"><input onChange={(s)=> setData({...data, password: s.target.value})} type="password" aria-label="الرقم السري" placeholder="الرقم السري"></input> <FiLock className="icon" /></div>
                <div className="input-container"><input onChange={(s)=> setData({...data, confirmPassword: s.target.value})} type="password" aria-label="تأكيد الرقم السري" placeholder="تأكيد الرقم السري"></input> <FiLock className="icon" /></div>
            </div>

            <button onClick={handleSubmit} className="main-button">{loading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
        </div>
    )
}

export default ChangePassword;