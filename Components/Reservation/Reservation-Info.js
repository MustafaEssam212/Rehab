
import Image from "next/image";
import { useEffect, useState } from "react";
import ShiftsHours from '@/utils/shiftsHours.json';
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
import isValidEgyptianPhoneNumber from "@/utils/isValidEgyptianNumber";


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

      const isToday = (dateString) => {
        // Convert the dateString (e.g., "14/9/2024") to a Date object
        const [day, month, year] = dateString.split('/').map(Number);
        const someDate = new Date(year, month - 1, day); // months are zero-based
      
        // Get today's date
        const today = new Date();
      
        // Check if the parsed date is today
        return (
          someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear()
        );
      };

      const handleTodayShifts = (shifts) => {
        const currentDate = new Date();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
    
        // Filter out shifts that are in the past if today is selected
        return shifts.filter(shift => {
            let [hours, minutes] = shift.time.toString().split(':').map(Number);
            
            // Handle half-hour shifts (like 9:30)
            if (!minutes) minutes = 0;
    
            // Convert AM/PM to 24-hour format
            if (shift.period === "مساءً" && hours < 12) {
                hours += 12;
            } else if (shift.period === "صباحاً" && hours === 12) {
                hours = 0; // Midnight special case
            }
    
            // Only keep shifts that are in the future
            return hours > currentHours || (hours === currentHours && minutes > currentMinutes);
        });
    };

    useEffect(() => {
        const filterAvailableShifts = (shifts, reservedTimes) => {
          return shifts.filter((shift) => {
            // احصل على الساعة والدقيقة من الوقت الحالي
            let [hours, minutes] = shift.time.toString().split(':').map(Number);
            if (!minutes) minutes = 0;
      
            // تحويل AM/PM إلى صيغة 24 ساعة
            if (shift.period === "مساءً" && hours < 12) {
              hours += 12;
            } else if (shift.period === "صباحاً" && hours === 12) {
              hours = 0; // حالة منتصف الليل
            }
      
            // إنشاء صيغة موحدة للوقت لإجراء المقارنة بسهولة
            const shiftTimeInMinutes = hours * 60 + minutes;
      
            // التحقق إذا كان الوقت الحالي متضارب مع أي حجز مسبق
            return !reservedTimes.some((reserved) => {
              let [reservedHours, reservedMinutes] = reserved.time.toString().split(':').map(Number);
              if (!reservedMinutes) reservedMinutes = 0;
              if (reserved.period === "مساءً" && reservedHours < 12) {
                reservedHours += 12;
              } else if (reserved.period === "صباحاً" && reservedHours === 12) {
                reservedHours = 0;
              }
              const reservedTimeInMinutes = reservedHours * 60 + reservedMinutes;
      
              // حساب التداخل بناءً على نوع الحجز
              if (reserved.category === 'كشف') {
                // لو الحجز كشف، نحذف الأوقات اللي تتداخل مع مدة نصف ساعة
                return (
                  shiftTimeInMinutes >= reservedTimeInMinutes &&
                  shiftTimeInMinutes < reservedTimeInMinutes + 30
                );
              } else if (reserved.category === 'جلسة') {
                // لو الحجز جلسة، نحذف الأوقات اللي تتداخل مع مدة ساعة
                return (
                  shiftTimeInMinutes >= reservedTimeInMinutes &&
                  shiftTimeInMinutes < reservedTimeInMinutes + 60
                );
              }
              return false;
            });
          });
        };
      
        if (isToday(data.date)) {
          const availableOnDay = handleTodayShifts(data.category === 'جلسة' ? ShiftsHours : timeSlots);
          const reservedTimes = data.reservations.map((reservation) => ({
            time: reservation.reservationTime.split(' ')[0],
            period: reservation.reservationTime.split(' ')[1],
            category: reservation.category
          }));
          const filteredShifts = filterAvailableShifts(availableOnDay, reservedTimes);
          setAvailableShifts(filteredShifts);
        } else {
          const availableShifts = data.category === 'جلسة' ? ShiftsHours : timeSlots;
          if (data.reservations.length) {
            const reservedTimes = data.reservations.map((reservation) => ({
              time: reservation.reservationTime.split(' ')[0],
              period: reservation.reservationTime.split(' ')[1],
              category: reservation.category
            }));
            const filteredShifts = filterAvailableShifts(availableShifts, reservedTimes);
            setAvailableShifts(filteredShifts);
          } else {
            setAvailableShifts(availableShifts);
          }
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