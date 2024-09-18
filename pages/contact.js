
import Image from "next/image";
import ContactCover from '../public/contact-cover.png';
import DotsBG from '../public/dots.png';
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import ContactMessagePic from '../public/contact-message.png';
import ContactBG from '../public/contact.png';
import { useState, useEffect } from "react";
import { NextSeo } from 'next-seo';
import { toast } from "react-toastify";

const Contact = () => {


    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [alert, setAlert] = useState({
        name: false,
        email: false,
        phone: false,
        subject: false,
        message: false
    });

    const handleSubmitMessage = async (s) => {
        s.preventDefault();
        const hasEmptyField = Object.values(data).some(value => value === '');

        if(hasEmptyField){
            toast.warning('برجاء ادخال جميع المعلومات المطلوبة')
        }else{

            const res = await fetch(`/api/editData?method=send-contact-message`, {
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
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            }else{
                toast.error(dataOfResponse.message)
            }

        }
    }

    const handleCheckValue = (param) => {
        if(param === 'name'){
            if(!data.name.length){
                setAlert({...alert, name: true})
            }
        } else if(param === 'email'){
            if(!data.email.length){
                setAlert({...alert, email: true})
            }
        }else if(param === 'phone'){
            if(!data.phone.length){
                setAlert({...alert, phone: true})
            }
        }else if(param === 'subject'){
            if(!data.subject.length){
                setAlert({...alert, subject: true})
            }
        }else if(param === 'message'){
            if(!data.message.length){
                setAlert({...alert, message: true})
            }
        }
    }

    return(
        <div className="contact-page-container">

            <NextSeo title={'تواصل معنا - مركز ريهاب للعلاج الطبيعي والتأهيل'} />

            <div className="contact-page-intro">
                <div className="img-container"><Image src={ContactCover.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image></div>
                <div className="layer-on">
                    <h1>تواصل معنا</h1>
                </div>
            </div>

            <div className="contact-info-section">
                <div className="inner-contact-info-section">
                    <div className="img-container"><Image sizes="(min-width: 1120px) 85vw, calc(100vw - 50px)" src={DotsBG.src} fill style={{objectFit: 'cover'}} alt='Rehab EG Clinic'></Image></div>
                    <div className="layer-on">
                        <div className="layer-on-section">
                            <div className="icon-container"><MdLocationOn className="icon" /></div>
                            <div className="section-info">
                                <h1>موقعنا</h1>
                                <h3>مدينة السادس من اكتوبر - المحور المركزي - جولدن مول - اعلى مطعم رسلان وصيدليات مصر</h3>
                            </div>
                        </div>
                        <div className="layer-on-section">
                            <div className="icon-container"><MdEmail className="icon" /></div>
                            <div className="section-info">
                                <h1>الإيميل</h1>
                                <h3>support@rehabeg.clinic</h3>
                            </div>
                        </div>
                        <div className="layer-on-section">
                            <div className="icon-container"><MdPhone className="icon" /></div>
                            <div className="section-info">
                                <h1>الهاتف</h1>
                                <h3>+20 1125902099</h3>
                                <h3>+20 1066205166</h3>
                                <h3>+20 1507110041</h3>
                                <h3>+20 1204515349</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-send-message">
                <div className="send-message-left">
                    <Image sizes="(min-width: 2060px) 40vw, 35vw" src={ContactMessagePic.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image>
                </div>
                <div className="send-message-right">
                    <div className="img-container"><Image sizes="(min-width: 2060px) 60vw, (min-width: 1120px) 65vw, 100vw" src={ContactBG.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                    <div className="layer-on">
                        <div className="inner-layer-on">
                            <h1>اترك رسالتك للحصول على أي معلومات أو أسئلة</h1>
                            <form onSubmit={handleSubmitMessage}>
                                <div className="two-inputs">
                                    <div className="input">
                                        <input type="text" value={data.name} onBlur={()=> handleCheckValue('name')} placeholder="الإسم" onChange={(s)=> setData({...data, name: s.target.value})}></input>
                                        {alert.name && !data.name.length && <p>من فضلك ادخل اسمك</p>}
                                    </div>
                                    <div className="input">
                                        <input type="text" value={data.email} onBlur={()=> handleCheckValue('email')} placeholder="الإيميل" onChange={(s)=> setData({...data, email: s.target.value})}></input>
                                        {alert.email && !data.email.length && <p>من فضلك ادخل إيميلك</p>}
                                    </div>
                                </div>
                                <div className="two-inputs">
                                    <div className="input">
                                        <input type="number" value={data.phone} onBlur={()=> handleCheckValue('phone')} placeholder="رقم الهاتف" onChange={(s)=> setData({...data, phone: s.target.value})}></input>
                                        {alert.phone && !data.phone.length && <p>من فضلك ادخل رقم هاتفك</p>}
                                    </div>
                                    <div className="input">
                                        <input type="text" value={data.subject} onBlur={()=> handleCheckValue('subject')} placeholder="الموضوع" onChange={(s)=> setData({...data, subject: s.target.value})}></input>
                                        {alert.subject && !data.subject.length && <p>من فضلك ادخل اسم الموضوع</p>}
                                    </div>
                                </div>
                                <div className="text-area">
                                    <textarea placeholder="رسالتك" value={data.message} onBlur={()=> handleCheckValue('message')} onChange={(s)=> setData({...data, message: s.target.value})}></textarea>
                                    {alert.message && !data.message.length && <p>من فضلك اكتب رسالتك</p>}
                                </div>
                                <div className="form-btn">
                                    <button onClick={handleSubmitMessage}>إرسل</button>
                                </div>
                            </form>
                            {/* <p className="main-alert">حدث خطأ اثناء ارسال رسالتك</p>
                            <p className="main-alert success">تم ارسال رسالتك بنجاح</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.9219029414517!2d30.91598942494222!3d29.952924922902003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145857afcbabf70b%3A0xf2e55f869ed41f6!2z2YXYsdmD2LIg2LHZitmH2KfYqCDZhNmE2LnZhNin2Kwg2KfZhNi32KjZiti52Ykg2Ygg2KfZhNiq2K7Ys9mK2LM!5e0!3m2!1sar!2seg!4v1721492736304!5m2!1sar!2seg" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}


export default Contact;