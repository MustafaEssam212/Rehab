
import HeadSystem from "@/Components/System/Head";
import LoadingCircle from "@/Components/Loading-Circle";
import { useState } from "react";
import isValidEmail from "@/utils/isValidEmail";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('اعطاء صلاحيات')) {

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  


    return {
      props: {},
    };
}


const Permissions = () => {

    const [firstBtnLoading, setFirstBtnLoading] = useState(false);
    const [email, setEmail] = useState('');


    const [secondBtnLoading, setSecondBtnLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);
    

    const [step, setStep] = useState(0);

    const handleChangePermissions = (s, name) => {
        if(s){
            setPermissions([...permissions, name]);
        }else{
            const filter = permissions.filter((e) => e !== name);
            setPermissions(filter)
        }
    }


    const handleCheckEmail = async () => {
        setFirstBtnLoading(true);
        if(!isValidEmail(email) || !email){
            toast.warning('برجاء التأكد من الايميل');
            setFirstBtnLoading(false);
        }else{
            const res = await fetch(`/api/getData?method=check-email-for-permissions&email=${email}`);
            const dataOfResponse = await res.json();

            if(res.status === 200){
                setPermissions(dataOfResponse.permissions);
                setStep(1);
                setFirstBtnLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setFirstBtnLoading(false);
            }
        }
    }


    const handleGivePermissions = async () => {
        setSecondBtnLoading(true);
        if(!permissions || !email){
            toast.warning('برجاء ملئ المعلومات المطلوبة');
            setSecondBtnLoading(false);
        }else{
            const res = await fetch(`/api/editData?method=give-user-permissions&email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(permissions)
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success('تم اعطاء الصلاحيات بنجاح');
                setSecondBtnLoading(false);
                setStep(0);
            }else{
                toast.error(dataOfResponse.message);
                setSecondBtnLoading(false);
            }

        }
    }

    return(
        <div className="permission-page-container system-page">
            <HeadSystem name={`اعطاء صلاحيات`} />

            <div className="inner-permission">

                    {
                        step === 0 &&  <div className="first-section">
                            <h1>برجاء ادخال إيميل الحساب</h1>
                            <input className="regular-input" type="email" placeholder="الإيميل" onChange={(s)=> setEmail(s.target.value)}></input>
                            <button onClick={handleCheckEmail} aria-label="تأكيد">{firstBtnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
                        </div>
                    }

                    {
                        step === 1 &&  <div className="second-section">
                        <h1>برجاء اعطاء الصلاحيات للحساب</h1>



                        <div className="permissions">

                            <div>
                                <input checked={permissions.includes('اعطاء صلاحيات')} onChange={(s)=> handleChangePermissions(s.target.checked, 'اعطاء صلاحيات')} type="checkbox" aria-label="اعطاء صلاحيات"></input>
                                <p>اعطاء الصلاحيات</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('اضافة دكتور')} onChange={(s)=> handleChangePermissions(s.target.checked, 'اضافة دكتور')} type="checkbox" aria-label="اضافة دكتور"></input>
                                <p>اضافة دكتور</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('مسح دكتور')} onChange={(s)=> handleChangePermissions(s.target.checked, 'مسح دكتور')} type="checkbox" aria-label="مسح دكتور"></input>
                                <p>مسح دكتور</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('اضافة جدول يومي')} onChange={(s)=> handleChangePermissions(s.target.checked, 'اضافة جدول يومي')} type="checkbox" aria-label="اضافة جدول يومي"></input>
                                <p>اضافة جدول يومي</p>
                            </div>

                            <div>
                                <input checked={permissions.includes('اضافة جدول شهري')} onChange={(s)=> handleChangePermissions(s.target.checked, 'اضافة جدول شهري')} type="checkbox" aria-label="اضافة جدول شهري"></input>
                                <p>اضافة جدول شهري</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('مسح دكتور من الجدول')} onChange={(s)=> handleChangePermissions(s.target.checked, 'مسح دكتور من الجدول')} type="checkbox" aria-label="مسح دكتور من الجدول"></input>
                                <p>مسح دكتور من الجدول</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('جدول وحجوزات')} onChange={(s)=> handleChangePermissions(s.target.checked, 'جدول وحجوزات')} type="checkbox" aria-label="جدول وحجوزات"></input>
                                <p>جدول وحجوزات</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('اضافة حجز')} onChange={(s)=> handleChangePermissions(s.target.checked, 'اضافة حجز')} type="checkbox" aria-label="اضافة حجز"></input>
                                <p>اضافة حجز</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('تعديل حجز')} onChange={(s)=> handleChangePermissions(s.target.checked, 'تعديل حجز')} type="checkbox" aria-label="تعديل حجز"></input>
                                <p>تعديل حجز</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('مسح حجز')} onChange={(s)=> handleChangePermissions(s.target.checked, 'مسح حجز')} type="checkbox" aria-label="مسح حجز"></input>
                                <p>مسح حجز</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('تبديل حجز')} onChange={(s)=> handleChangePermissions(s.target.checked, 'تبديل حجز')} type="checkbox" aria-label="تبديل حجز"></input>
                                <p>تبديل حجز</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('المواعيد المتاحة')} onChange={(s)=> handleChangePermissions(s.target.checked, 'المواعيد المتاحة')} type="checkbox" aria-label="المواعيد المتاحة"></input>
                                <p>المواعيد المتاحة</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('جميع المستخدمين')} onChange={(s)=> handleChangePermissions(s.target.checked, 'جميع المستخدمين')} type="checkbox" aria-label="جميع المستخدمين"></input>
                                <p>جميع المستخدمين</p>
                            </div>

                            <div>
                                <input checked={permissions.includes('كتابة اراء عملائنا')} onChange={(s)=> handleChangePermissions(s.target.checked, 'كتابة اراء عملائنا')} type="checkbox" aria-label="كتابة اراء عملائنا"></input>
                                <p>كتابة اراء عملائنا</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('مسح اراء عملائنا')} onChange={(s)=> handleChangePermissions(s.target.checked, 'مسح اراء عملائنا')} type="checkbox" aria-label="مسح اراء عملائنا"></input>
                                <p>مسح اراء عملائنا</p>
                            </div>

                            <div>
                                <input checked={permissions.includes('سابقة اعمالنا')} onChange={(s)=> handleChangePermissions(s.target.checked, 'سابقة اعمالنا')} type="checkbox" aria-label="سابقة اعمالنا"></input>
                                <p>سابقة اعمالنا</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('مسح سابقة اعمالنا')} onChange={(s)=> handleChangePermissions(s.target.checked, 'مسح سابقة اعمالنا')} type="checkbox" aria-label="مسح سابقة اعمالنا"></input>
                                <p>مسح سابقة اعمالنا</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('كتابة مدونة')} onChange={(s)=> handleChangePermissions(s.target.checked, 'كتابة مدونة')} type="checkbox" aria-label="كتابة مدونة"></input>
                                <p>كتابة مدونة</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('مسح مدونة')} onChange={(s)=> handleChangePermissions(s.target.checked, 'مسح مدونة')} type="checkbox" aria-label="مسح مدونة"></input>
                                <p>مسح مدونة</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('رسائل التواصل')} onChange={(s)=> handleChangePermissions(s.target.checked, 'رسائل التواصل')} type="checkbox" aria-label="رسائل التواصل"></input>
                                <p>رسائل التواصل</p>
                            </div>

                            <div>
                                <input checked={permissions.includes('تحميل بيانات العملاء')} onChange={(s)=> handleChangePermissions(s.target.checked, 'تحميل بيانات العملاء')} type="checkbox" aria-label="تحميل بيانات العملاء"></input>
                                <p>تحميل بيانات العملاء</p>
                            </div>

                            <div>
                                <input checked={permissions.includes('اعياد الميلاد')} onChange={(s)=> handleChangePermissions(s.target.checked, 'اعياد الميلاد')} type="checkbox" aria-label="اعياد الميلاد"></input>
                                <p>اعياد الميلاد</p>
                            </div>


                            <div>
                                <input checked={permissions.includes('ERP')} onChange={(s)=> handleChangePermissions(s.target.checked, 'ERP')} type="checkbox" aria-label="ERP"></input>
                                <p>ERP</p>
                            </div>

                        </div>

                        <button onClick={handleGivePermissions} aria-label="تأكيد">{secondBtnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
                    </div>
                    }
            </div>
        </div>
    )
}


export default Permissions;