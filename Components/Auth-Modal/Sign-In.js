import Image from "next/image";
import SignCoverPic from '../../public/sign-cover.png';
import { FaFacebookF, FaGoogle} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import {useState, useContext, useEffect, useRef} from "react";
import { AppContext } from "@/utils/contextAPI";
import { useRouter } from "next/router";
import { signIn } from 'next-auth/react';
import isValidEmail from "@/utils/isValidEmail";
import { toast } from "react-toastify";
import Link from "next/link";

const SignIn = () => {

    const [data, setData] = useState({

        email: '',
        password: '',

    });


    const AppContxt = useContext(AppContext);
    const componentRef = useRef();
    const [firstRendered, setFirstRendered] = useState(true);
    const router = useRouter();

   useEffect(() => {
        if(!firstRendered){
            if (AppContxt.authModalSection !== 'Register') {
                componentRef.current.classList.add('active-sign-in');
                componentRef.current.classList.remove('not-active-sign-in');
            } else {
                componentRef.current.classList.add('not-active-sign-in');
                componentRef.current.classList.remove('active-sign-in');
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
        if(!isValidEmail(data.email)){
            toast.warning('برجاء ادخال ايميل صحيح')
        }else if(!data.password){
            toast.warning('برجاء ادخال الرقم السري')
        }else{
            const res = await signIn("credential", {
                email: data.email,
                password: data.password,
                redirect: false,
              }).then(({ok, error}) => {
                if(ok){
                    router.push('/')
                }else{
                    toast.error(error.replace("Error: ", ""))
                }
              })
        }
    }

    return(
      <div ref={componentRef} className={"sign-in-container no-animation"}>

        <div className="sign-in-left">
            <div className="img-container"><Image src={SignCoverPic.src} fill style={{objectFit: 'cover'}} alt="التسجيل" /></div>
            <div className="layer-on">
                <h1>مرحباً بعودتك</h1>
                <h3>انت على وشك تسجيل الدخول لحسابك الموجود بالفعل. اذا كنت لا تمتلك حساباً قم بالضغط على تسجيل جديد</h3>
                <button onClick={()=> AppContxt.setAuthModalSection('Register')} aria-label="تسجيل جديد">تسجيل جديد</button>
            </div>
        </div>


        <div className="sign-in-right">
            <h1>تسجيل الدخول لحسابك</h1>
            <h3>قم بإدخال معلومات تسجيل الدخول الخاصة بك</h3>

            {/* 
            <div className="icons-container">
                <button title="التسجيل عن طريق الفيس بوك" aria-label="التسجيل عن طريق الفيس بوك"><FaFacebookF className="icon" /></button>
                <button title="التسجيل عن طريق جوجل" aria-label="التسجيل عن طريق جوجل"><FaGoogle className="icon" /></button>
            </div>

            <h3>او عن طريق الإيميل الشخصي</h3> */}

            <div className="inputs-container">
                <div className="input-container"><input onChange={(s)=> setData({...data, email: s.target.value})} type="email" aria-label="الإيميل" placeholder="الإيميل"></input> <MdOutlineEmail className="icon email-icon" /></div>
                <div className="input-container"><input onChange={(s)=> setData({...data, password: s.target.value})} type="password" aria-label="الرقم السري" placeholder="الرقم السري"></input> <FiLock className="icon" /></div>
            </div>

            <Link href={`/forgot-password`} title="نسيت كلمة المرور" aria-label="هل نسيت كلمة المرور">هل نسيت كلمة المرور؟</Link>

            <button onClick={handleSubmit} className="sign-main-button">تسجيل الدخول</button>
        </div>


    </div>
    )
}

export default SignIn;