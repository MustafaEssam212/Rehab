import Link from "next/link";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import LoadingCircle from "@/Components/Loading-Circle";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineSafety } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import isValidEmail from "@/utils/isValidEmail";
import { FaCircleCheck } from "react-icons/fa6";

const ForgotPassword = () => {


    const [step, setStep] = useState(0);

    const [email, setEmail] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);

    const [securityQuestion, setSecurityQuestion] = useState('');
    const [openSecurityQuestion, setOpenSecurityQuestion] = useState(false);
    const [answer, setAnswer] = useState('');
    const [securityQuestionLoading, setSecurityQuestionLoading] = useState(false);

    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);


    const handleCheckEmail = async () => {
        setEmailLoading(true);
        if(!email){
            toast.warning('برجاء ادخال المعلومات المطلوبة');
            setEmailLoading(false);
        }
        
        else if(isValidEmail(email) === false){
            toast.warning('برجاء ادخال ايميل صحيح');
            setEmailLoading(false);
        }
        
        else{
            const res = await fetch(`/api/getData?method=forgot-password-email-checking&email=${email}`);
            const dataOfResponse = await res.json();

            if(res.status === 200){
                setStep(1);
                setEmailLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setEmailLoading(false);
            }
        }
    }


    const handleSecurityQestion = async () => {
        setSecurityQuestionLoading(true);
        if(!securityQuestion || !answer){
            toast.warning('برجاء ادخال المعلومات المطلوبة');
            setSecurityQuestionLoading(false);
        }else{
            const res = await fetch(`/api/getData?method=forgot-password-security-question-checking&question=${securityQuestion}&answer=${answer}&email=${email}`);
            const dataOfResponse = await res.json();

            if(res.status === 200){
                setStep(2);
                setSecurityQuestionLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setSecurityQuestionLoading(false);
            }
        }
    }


    const handleChangePassword = async () => {
        setPasswordLoading(true);

        if(!password || !confirmPassword){
            toast.warning('برجاء ادخال المعلومات المطلوبة');
            setPasswordLoading(false);
        }else if(password !== confirmPassword){
            toast.warning('تأكيد كلمة المرور غير متطابقة مع كلمة المرور');
            setPasswordLoading(false);
        }else if(password.length <= 7){
            toast.warning('برجاء ادخال كلمة مرور اكبر من 7 احرف او ارقام');
            setPasswordLoading(false);
        }else{
            const res = await fetch(`/api/editData?method=forgot-password-change-password&email=${email}`,{
                method: 'POST',
                body: JSON.stringify({password, confirmPassword}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                setStep(3);
                setPasswordLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setPasswordLoading(false);
            }
        }
    }

    return(
        <div className="forgot-password-page">
            <div className="parags">
                <h1>هل نسيت كلمة المرور؟</h1>
                <h3>اذا كنت قد نسيت كلمة المرور فيمكنك اعادة تعيين كلمة المرور الخاصة بك بإستخدام سؤال الأمان. اما اذا كنت قد فقدت حسابك بسبب خطأ تقني او فني غير مقصود فقم بمراسلتنا من هنا <Link href={`/contact`} title="تواصل معنا" aria-label="تواصل معنا">تواصل معنا</Link></h3>
                <div className="line"></div>
            </div>

            <div className="inputs-Container">

                {step === 0 && <div className="email-container">
                    <div className="input-container"><input onChange={(s)=> setEmail(s.target.value)} type="email" aria-label="الإيميل" placeholder="الإيميل"></input> <MdOutlineEmail className="icon email-icon" /></div>

                    <button onClick={handleCheckEmail} className="main-button">{emailLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
                </div>}

                {step === 1 && <div className="security-question-container">
                    <div onClick={()=> setOpenSecurityQuestion(!openSecurityQuestion)} className="input-dropmenu">
                        <p>{openSecurityQuestion ? <IoMdArrowDropup className="icon" /> : <IoMdArrowDropdown className="icon" />} {securityQuestion ? securityQuestion : `سؤال الأمان`}</p> <AiOutlineSafety className="icon" />
                        
                        {openSecurityQuestion && <div className="dropdown questions-dropmenu">
                            <button aria-label="ما هو اسم مدرستك الابتدائية؟" onClick={()=> setSecurityQuestion( 'ما هو اسم مدرستك الابتدائية؟')}>ما هو اسم مدرستك الابتدائية؟</button>
                            <button aria-label="ما هو اسم أفضل صديق في طفولتك؟" onClick={()=> setSecurityQuestion('ما هو اسم أفضل صديق في طفولتك؟')}>ما هو اسم أفضل صديق في طفولتك؟</button>
                            <button aria-label="ما هو اسم أول حيوان أليف امتلكته؟" onClick={()=> setSecurityQuestion('ما هو اسم أول حيوان أليف امتلكته؟')}>ما هو اسم أول حيوان أليف امتلكته؟</button>
                            <button aria-label="ما هو اسم الشارع الذي نشأت فيه؟" onClick={()=> setSecurityQuestion('ما هو اسم الشارع الذي نشأت فيه؟')}>ما هو اسم الشارع الذي نشأت فيه؟</button>
                            <button aria-label="ما هو اسم معلمك المفضل في المدرسة؟" onClick={()=> setSecurityQuestion('ما هو اسم معلمك المفضل في المدرسة؟')}>ما هو اسم معلمك المفضل في المدرسة؟</button>
                            <button aria-label="ما هو اسم مدينتك المفضلة؟" onClick={()=> setSecurityQuestion('ما هو اسم مدينتك المفضلة؟')}>ما هو اسم مدينتك المفضلة؟</button>
                            <button aria-label="ما هو اسم كتابك المفضل؟" onClick={()=> setSecurityQuestion('ما هو اسم كتابك المفضل؟')}>ما هو اسم كتابك المفضل؟</button>
                            <button aria-label="ما هو تاريخ ميلاد والدتك؟" onClick={()=> setSecurityQuestion('ما هو تاريخ ميلاد والدتك؟')}>ما هو تاريخ ميلاد والدتك؟</button>
                            <button aria-label="ما هو اسم شركة أول وظيفة عملت بها؟" onClick={()=> setSecurityQuestion('ما هو اسم شركة أول وظيفة عملت بها؟')}>ما هو اسم شركة أول وظيفة عملت بها؟</button>
                            <button aria-label="ما هو لقب جدك أو جدتك؟" onClick={()=> setSecurityQuestion('ما هو لقب جدك أو جدتك؟')}>ما هو لقب جدك أو جدتك؟</button>
                            <button aria-label="ما هو مكان زفاف والديك؟" onClick={()=> setSecurityQuestion('ما هو مكان زفاف والديك؟')}>ما هو مكان زفاف والديك؟</button>
                            <button aria-label="ما هو الطراز أو ماركة سيارتك الأولى؟" onClick={()=> setSecurityQuestion('ما هو الطراز أو ماركة سيارتك الأولى؟')}>ما هو الطراز أو ماركة سيارتك الأولى؟</button>
                            <button aria-label="ما هو الفريق الرياضي المفضل لديك؟" onClick={()=> setSecurityQuestion('ما هو الفريق الرياضي المفضل لديك؟')}>ما هو الفريق الرياضي المفضل لديك؟</button>
                            <button aria-label="ما هو اسم بطلك الخيالي المفضل؟" onClick={()=> setSecurityQuestion('ما هو اسم بطلك الخيالي المفضل؟')}>ما هو اسم بطلك الخيالي المفضل؟</button>
                            <button aria-label="ما هو اسم أول مدرسة ثانوية التحقت بها؟" onClick={()=> setSecurityQuestion('ما هو اسم أول مدرسة ثانوية التحقت بها؟')}>ما هو اسم أول مدرسة ثانوية التحقت بها؟</button>
                        </div>}
                    
                    </div>
                    <div className="input-container"><input onChange={(s)=> setAnswer(s.target.value)} type="text" aria-label="إجابة سؤال الأمان" placeholder="إجابة سؤال الأمان"></input> <RiQuestionAnswerLine className="icon" /></div>

                    <button onClick={handleSecurityQestion} className="main-button">{securityQuestionLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
                </div>}

                {
                    step === 2 && <div className="change-password-container">
                    <div className="input-container"><input onChange={(s)=> setPassword(s.target.value)} type="password" aria-label="الرقم السري" placeholder="الرقم السري"></input> <FiLock className="icon" /></div>
                    <div className="input-container"><input onChange={(s)=> setConfirmPassword(s.target.value)} type="password" aria-label="تأكيد الرقم السري" placeholder="تأكيد الرقم السري"></input> <FiLock className="icon" /></div>
                    <button onClick={handleChangePassword} className="main-button">{passwordLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
                </div>
                }


                {
                    step === 3 && <div className="done">
                    <h1>تم تغيير كلمة المرور بنجاح <FaCircleCheck className="icon" /></h1>
                </div>
                }

            </div>
        </div>
    )
}

export default ForgotPassword;