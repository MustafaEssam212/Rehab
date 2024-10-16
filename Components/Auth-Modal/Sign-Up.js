
import Image from "next/image";
import SignCoverPic from '../../public/sign-cover.png';
import { FaFacebookF, FaGoogle, FaRegUser} from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { BsGenderMale } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { useRef, useState, useEffect, useContext } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineSafety } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { AppContext } from "@/utils/contextAPI";
import { useRouter } from "next/router";
import isValidEmail from "@/utils/isValidEmail";
import { toast } from "react-toastify";
import isValidEgyptianPhoneNumber from "@/utils/isValidEgyptianNumber";
    

const SignUp = () => {

    const datePickerRef = useRef();
    const AppContxt = useContext(AppContext);
    const [openGender, setOpenGender] = useState(false);
    const [openSecurityQuestion, setOpenSecurityQuestion] = useState(false);
    const [data, setData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        securityQuestion: '',
        answerSecurityQuestion: '',
        package: {
            name: null,
            sessions: null,
            price: null
        },
        history: []
    });

    useEffect(()=> {
        setOpenGender(false);
        setOpenSecurityQuestion(false);
    }, [data.gender, data.securityQuestion])

    const componentRef = useRef();


    const [firstRendered, setFirstRendered] = useState(true);
    const router = useRouter();

   useEffect(() => {

    if(!firstRendered){
        if (AppContxt.authModalSection !== 'Register') {
            componentRef.current.classList.add('not-active-sign-up');
            componentRef.current.classList.remove('active-sign-up');
        } else {
            componentRef.current.classList.add('active-sign-up');
            componentRef.current.classList.remove('not-active-sign-up');
        }
    }

    }, [AppContxt.authModalSection]);


    useEffect(() => {
        if(router.isReady){
            componentRef.current.classList.remove('no-animation');
            setFirstRendered(false);
        }
    }, [router.isReady])


    const handleSubmit = async () => {
        




        const hasEmptyFields = Object.values(data).some(value => value === '');

        if (hasEmptyFields) {
            toast.warning('برجاء إدخال جميع المعلومات المطلوبة');
          } else {
            if(!isValidEmail(data.email)){
                toast.warning('برجاء ادخال إيميل صحيح');
            }
            else if(data.confirmPassword !== data.password){
                toast.warning('تأكيد الرقم السري غير متطابق')
            }
            
            else if(isValidEgyptianPhoneNumber(data.phoneNumber) === false){
                toast.warning('برجاء ادخال رقم هاتف صحيح');
            }

            else if(data.password.length <= 7){
                toast.warning('برجاء ادخال كلمة مرور اكبر من 7 احرف او ارقام')
            }

            else{
                const res = await fetch('/api/register?lang=ar', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const dataOfResponse = await res.json();

                if(res.status === 200){
                    toast.success(dataOfResponse.message);
                    AppContxt.setAuthModalSection('SignIn');
                }else{
                    toast.error(dataOfResponse.message);
                }
            }
          }

    }


    return(
    <div ref={componentRef} className={"sign-up-container no-animation"}>
        <div className="sign-up-left">
            <h1>تسجيل حساب جديد</h1>
            <h3>أدخل معلوماتك لتسجيل حساب جديد</h3>
{/* 

            <div className="icons-container">
                <button title="التسجيل عن طريق الفيس بوك" aria-label="التسجيل عن طريق الفيس بوك"><FaFacebookF className="icon" /></button>
                <button title="التسجيل عن طريق جوجل" aria-label="التسجيل عن طريق جوجل"><FaGoogle className="icon" /></button>
            </div>

            <h3>او عن طريق الإيميل الشخصي</h3> */}

            <div className="inputs-container">
                <div className="input-container"><input onChange={(s)=> setData({...data, username: s.target.value})} type="text" aria-label="اسم المستخدم" placeholder="اسم المستخدم"></input> <FaRegUser className="icon" /></div>
                <div className="input-container"><input onChange={(s)=> setData({...data, email: s.target.value})} type="email" aria-label="الإيميل" placeholder="الإيميل"></input> <MdOutlineEmail className="icon email-icon" /></div>
                <div className="input-container"><input onChange={(s)=> setData({...data, phoneNumber: s.target.value})} type="number" aria-label="رقم الهاتف" placeholder="رقم الهاتف"></input> <MdOutlinePhoneEnabled className="icon email-icon" /></div>
                <div className="input-container"><input onChange={(s)=> setData({...data, password: s.target.value})} type="password" aria-label="الرقم السري" placeholder="الرقم السري"></input> <FiLock className="icon" /></div>
                <div className="input-container"><input onChange={(s)=> setData({...data, confirmPassword: s.target.value})} type="password" aria-label="تأكيد الرقم السري" placeholder="تأكيد الرقم السري"></input> <FiLock className="icon" /></div>
                <div className="input-container" onClick={()=> datePickerRef.current.showPicker()}><input onChange={(s)=> setData({...data, dateOfBirth: s.target.value})} ref={datePickerRef} type="date" aria-label="تاريخ الميلاد" placeholder="تاريخ الميلاد"></input> <SlCalender className="icon" /></div>
                <div onClick={()=> setOpenGender(!openGender)} className="input-dropmenu">
                    <p>{openGender ? <IoMdArrowDropup className="icon" /> : <IoMdArrowDropdown className="icon" />} {data.gender ? data.gender : `الجنس`}</p> <BsGenderMale className="icon" />
                    
                    {openGender && <div className="dropdown">
                        <button aria-label="ذكر" onClick={()=> setData({...data, gender: 'ذكر'})}>ذكر</button>
                        <button aria-label="انثى" onClick={()=> setData({...data, gender: 'انثى'})}>انثى</button>
                    </div>}
                
                </div>
                <div onClick={()=> setOpenSecurityQuestion(!openSecurityQuestion)} className="input-dropmenu">
                    <p>{openSecurityQuestion ? <IoMdArrowDropup className="icon" /> : <IoMdArrowDropdown className="icon" />} {data.securityQuestion ? data.securityQuestion : `سؤال الأمان`}</p> <AiOutlineSafety className="icon" />
                    
                    {openSecurityQuestion && <div className="dropdown questions-dropmenu">
                        <button aria-label="ما هو اسم مدرستك الابتدائية؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم مدرستك الابتدائية؟'})}>ما هو اسم مدرستك الابتدائية؟</button>
                        <button aria-label="ما هو اسم أفضل صديق في طفولتك؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم أفضل صديق في طفولتك؟'})}>ما هو اسم أفضل صديق في طفولتك؟</button>
                        <button aria-label="ما هو اسم أول حيوان أليف امتلكته؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم أول حيوان أليف امتلكته؟'})}>ما هو اسم أول حيوان أليف امتلكته؟</button>
                        <button aria-label="ما هو اسم الشارع الذي نشأت فيه؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم الشارع الذي نشأت فيه؟'})}>ما هو اسم الشارع الذي نشأت فيه؟</button>
                        <button aria-label="ما هو اسم معلمك المفضل في المدرسة؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم معلمك المفضل في المدرسة؟'})}>ما هو اسم معلمك المفضل في المدرسة؟</button>
                        <button aria-label="ما هو اسم مدينتك المفضلة؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم مدينتك المفضلة؟'})}>ما هو اسم مدينتك المفضلة؟</button>
                        <button aria-label="ما هو اسم كتابك المفضل؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم كتابك المفضل؟'})}>ما هو اسم كتابك المفضل؟</button>
                        <button aria-label="ما هو تاريخ ميلاد والدتك؟" onClick={()=> setData({...data, securityQuestion: 'ما هو تاريخ ميلاد والدتك؟'})}>ما هو تاريخ ميلاد والدتك؟</button>
                        <button aria-label="ما هو اسم شركة أول وظيفة عملت بها؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم شركة أول وظيفة عملت بها؟'})}>ما هو اسم شركة أول وظيفة عملت بها؟</button>
                        <button aria-label="ما هو لقب جدك أو جدتك؟" onClick={()=> setData({...data, securityQuestion: 'ما هو لقب جدك أو جدتك؟'})}>ما هو لقب جدك أو جدتك؟</button>
                        <button aria-label="ما هو مكان زفاف والديك؟" onClick={()=> setData({...data, securityQuestion: 'ما هو مكان زفاف والديك؟'})}>ما هو مكان زفاف والديك؟</button>
                        <button aria-label="ما هو الطراز أو ماركة سيارتك الأولى؟" onClick={()=> setData({...data, securityQuestion: 'ما هو الطراز أو ماركة سيارتك الأولى؟'})}>ما هو الطراز أو ماركة سيارتك الأولى؟</button>
                        <button aria-label="ما هو الفريق الرياضي المفضل لديك؟" onClick={()=> setData({...data, securityQuestion: 'ما هو الفريق الرياضي المفضل لديك؟'})}>ما هو الفريق الرياضي المفضل لديك؟</button>
                        <button aria-label="ما هو اسم بطلك الخيالي المفضل؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم بطلك الخيالي المفضل؟'})}>ما هو اسم بطلك الخيالي المفضل؟</button>
                        <button aria-label="ما هو اسم أول مدرسة ثانوية التحقت بها؟" onClick={()=> setData({...data, securityQuestion: 'ما هو اسم أول مدرسة ثانوية التحقت بها؟'})}>ما هو اسم أول مدرسة ثانوية التحقت بها؟</button>
                    </div>}
                
                </div>
                <div className="input-container"><input onChange={(s)=> setData({...data, answerSecurityQuestion: s.target.value})} type="text" aria-label="إجابة سؤال الأمان" placeholder="إجابة سؤال الأمان"></input> <RiQuestionAnswerLine className="icon" /></div>
            </div>

            <button onClick={handleSubmit} className="sign-main-button">تسجيل جديد</button>
        </div>

        <div className="sign-up-right">
            <div className="img-container"><Image src={SignCoverPic.src} fill style={{objectFit: 'cover'}} alt="التسجيل" /></div>
            <div className="layer-on">
                <h1>مرحباً بك</h1>
                <h3>انت على وشك تسجيل حساب جديد في موقعنا. إذا كان لديك حساب بالفعل، اضغط على تسجيل الدخول</h3>
                <button onClick={()=> AppContxt.setAuthModalSection('SignIn')} aria-label="تسجيل الدخول">تسجيل الدخول</button>
            </div>
        </div> 
    </div>
    )
}


export default SignUp;