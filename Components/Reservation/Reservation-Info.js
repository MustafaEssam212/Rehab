
import Image from "next/image";
import { useEffect, useState } from "react";
import ShiftsHours from '@/utils/shiftsHours.json';
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
import isValidEgyptianPhoneNumber from "@/utils/isValidEgyptianNumber";
import filterShifts from "@/utils/filterShifts";


const ReservationInfo = ({sendDataToParent, data, handleStep}) => {

    const [openShifts, setOpenShifts] = useState(false);
    const [reservationTime, setReservationTime] = useState('');
    const [reservationName, setReservationName] = useState('');
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [availableShifts, setAvailableShifts] = useState([]);



    const handleSubmit = async () => {
        const session = await getSession();
        if(!reservationTime){
            toast.warning('برجاء اختيار ميعاد الحجز اولاً')
        }else{
            if(whatsAppNumber){
                if(!isValidEgyptianPhoneNumber(whatsAppNumber)){
                    toast.warning('برجاء ادخال رقم واتس آب صحيح')
                }else{
                    if(!reservationName){
                        const name = session.user.username;
                        const info = {
                            reservationTime,
                            reservationName: name,
                            userNumber: session.user.phoneNumber,
                            userID: session.user.id,
                            whatsAppNumber: whatsAppNumber
                        }
                        sendDataToParent(info);
                    }else{
                        const info = {
                            reservationTime,
                            reservationName,
                            userNumber: session.user.phoneNumber,
                            userID: session.user.id,
                            whatsAppNumber: whatsAppNumber
                        }
                        sendDataToParent(info);
                    }
                }
            }else{
                if(!reservationName){
                    const name = session.user.username;
                    const info = {
                        reservationTime,
                        reservationName: name,
                        userNumber: session.user.phoneNumber,
                        userID: session.user.id,
                        whatsAppNumber: whatsAppNumber
                    }
                    sendDataToParent(info);
                }else{
                    const info = {
                        reservationTime,
                        reservationName,
                        userNumber: session.user.phoneNumber,
                        userID: session.user.id,
                        whatsAppNumber: whatsAppNumber
                    }
                    sendDataToParent(info);
                }
            }
        }
      }


      const timeSlots = [
        { "time": 9, "period": "صباحاً" },
        { "time": "9:30", "period": "صباحاً" },
        { "time": 10, "period": "صباحاً" },
        { "time": "10:30", "period": "صباحاً" },
        { "time": 11, "period": "صباحاً" },
        { "time": "11:30", "period": "صباحاً" },
        { "time": 12, "period": "مساءً" },
        { "time": "12:30", "period": "مساءً" },
        { "time": 1, "period": "مساءً" },
        { "time": "1:30", "period": "مساءً" },
        { "time": 2, "period": "مساءً" },
        { "time": "2:30", "period": "مساءً" },
        { "time": 3, "period": "مساءً" },
        { "time": "3:30", "period": "مساءً" },
        { "time": 4, "period": "مساءً" },
        { "time": "4:30", "period": "مساءً" },
        { "time": 5, "period": "مساءً" },
        { "time": "5:30", "period": "مساءً" },
        { "time": 6, "period": "مساءً" },
        { "time": "6:30", "period": "مساءً" },
        { "time": 7, "period": "مساءً" },
        { "time": "7:30", "period": "مساءً" },
        { "time": 8, "period": "مساءً" },
        { "time": "8:30", "period": "مساءً" },
        { "time": 9, "period": "مساءً" },
        { "time": "9:30", "period": "مساءً" },
        { "time": 10, "period": "مساءً" }
      ];


    useEffect(() => {
        if(data.date){
          setAvailableShifts(filterShifts(data.date, data.doctorCategory === 'جلسات' ? ShiftsHours : timeSlots ,data.startShiftTime, data.endShiftTime, data.reservations, data.category, data.doctorCategory))
        }
      }, [data]);
      



    



    return(
        <div className="reservation-info-page">


                    <div className="inner-reservation-info">
        
                        <div className="left">
                            <Image src={data?.img} fill alt="دكتور في مركز ريهاب للعلاج الطبيعي والتأهيل"></Image>
                        </div>


                        <div className="right">
                            <h1>برجاء ملئ المعلومات المطلوبة لتأكيد الحجز لدى الدكتور <span>{data?.doctorName}</span></h1>
                            <div className="required-info">
                                <p className="info-parag">اسم الحجز <span>(اختياري)</span></p>
                                <span>اذا كنت ترغب بتغيير اسم الحجز او الحجز بإسم شخص اخر قم بكتابته في خانة اسم الحجز. عدا ذلك اترك الخانة فارغة وسيتم وضع اسم حسابك في الحجز</span>
                                <input aria-label="الحجز بإسم" onChange={(s)=> setReservationName(s.target.value)} type="text" placeholder="الحجز بإسم"></input>

                                <p className="info-parag">رقم الواتس آب <span>(اختياري)</span></p>
                                <span>يمكنك وضع رقم الواتس آب الخاص بك لمساعدتنا في الوصول إليك سريعا ولسهولة التواصل</span>
                                <input aria-label="رقم الواتس آاب" onChange={(s)=> setWhatsAppNumber(s.target.value)} type="number" placeholder="رقم الواتس آاب"></input>

                                <p className="info-parag">ميعاد الحجز</p>
                                    <div onClick={()=> setOpenShifts(!openShifts)} className={"dropmenu"}><IoMdArrowDropdown className="icon" /> <p>{reservationTime ? reservationTime : `الميعاد المتاح`}</p> 
                                        {openShifts &&  <div className="dropmenu-list heighted">
                                        {availableShifts.map((e,key) =>{
                                        return(
                                            <button key={key}aria-label={`${e.time} ${e.period}`}  onClick={()=> setReservationTime(`${e.time} ${e.period}`)}>{e.time} {e.period}</button>
                                        )
                                        })}
                                        </div>}
                                    </div>
                                
                                <button aria-label="التالي" onClick={handleSubmit} className="main-button">التالي</button>
                                <button onClick={()=> handleStep(0)} className="main-button back-button">الرجوع</button>
                            </div>
                        </div>

                </div>


        </div>
    )
}


export default ReservationInfo;