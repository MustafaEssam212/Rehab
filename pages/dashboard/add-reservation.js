import HeadSystem from "@/Components/System/Head";
import { useState, useEffect } from "react";
import LoadingCircle from "@/Components/Loading-Circle";
import { IoMdArrowDropdown } from "react-icons/io";
import ShiftsHours from '@/utils/shiftsHours.json';
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('اضافة حجز')) {

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

const AddReservation = () => {

    const [date, setDate] = useState(new Date());
    const [inputDate, setInputDate] = useState('');
  
    useEffect(() => {
      // Ensure the date is set to the start of the day (00:00:00) to avoid issues with time differences
      setDate(new Date(date.setHours(0, 0, 0, 0)));
    }, []);
  
    const isToday = (someDate) => {
      const today = new Date();
      return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
      );
    };
  
    const handlePreviousDay = () => {
      setDate(new Date(date.setDate(date.getDate() - 1)));
    };
  
    const handleNextDay = () => {
      setDate(new Date(date.setDate(date.getDate() + 1)));
    };
  
    const handleDateChange = (event) => {
      setInputDate(event.target.value);
    };
  
    const handleDateBlur = () => {
      const [day, month, year] = inputDate.split('/').map(Number);
      const newDate = new Date(year, month - 1, day);
      const today = new Date();
      if (newDate >= today.setHours(0, 0, 0, 0)) {
        setDate(newDate);
      } else {
        alert('الرجاء إدخال تاريخ صالح، سواء كان اليوم أو في المستقبل');
        setInputDate(formatDate(date));
      }
    };
  
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
    useEffect(() => {
      setInputDate(formatDate(date));
    }, [date]);




    // The Data

    // Doctor choice and Doctors list
    const [doctor, setDoctor] = useState('');
    const [doctorsList, setDoctorsList] = useState([]);
    const [openDoctorsList, setOpenDoctorsList] = useState(false);


    // Day Info

    const [dayInfo, setDayInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const [availableShifts, setAvailableShifts] = useState([]);
    const [nameOfNewReversation, setNameOfNewReversation] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [newReversationPeriod, setNewReversationPeriod] = useState('');
    const [openNewShifts, setOpenNewShifts] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [category, setCategory] = useState('');

      // Getting doctors list

      useEffect(() => {
        const getDoctors = async () => {
          const res = await fetch(`/api/getData?method=get-doctors-list`);
          const dataOfResponse = await res.json();
  
          if(res.status === 200){
            setDoctorsList(dataOfResponse.list);
          }else{
            toast.error(dataOfResponse.message);
          }
        }
        getDoctors()
      }, [])
  
  
      // Getting Information when change date and doctor
  
      const getDay = async () => {
        const res = await fetch(`/api/getData?method=get-day-info&date=${inputDate}&serial=${doctor}`);
        const dataOfResponse = await res.json();
        if(res.status === 200){
          setDayInfo(dataOfResponse.doctor);
          setLoading(false);
        }else{
          toast.error(dataOfResponse.message);
          setDayInfo({});
          setLoading(false);
        }
      }
  
      useEffect(()=> {
        if(inputDate && doctor){
          setLoading(true);
          getDay();
        }
      }, [inputDate, doctor]);


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

      // Utility Functions for filtering shifts

// دالة لتحويل الوقت من تنسيق 12 ساعة إلى دقائق
const convertTo24HourFormat = (timeString) => {
  if (!timeString) {

    return null; // أو يمكنك استخدام قيمة افتراضية أخرى
  }
  
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'مساءً' && hours < 12) {
    hours += 12;
  } else if (period === 'صباحاً' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + (minutes || 0);
};

const filterReservedTimes = (shifts, reservations) => {
  return shifts.filter((shift) => {
    let shiftTimeInMinutes;

    // تحقق ما إذا كان shift.time رقم أم سلسلة نصية
    if (typeof shift.time === 'number') {
      shiftTimeInMinutes = shift.time * 60; // التحويل إلى دقائق
    } else if (typeof shift.time === 'string') {
      const [shiftHours, shiftMinutes] = shift.time.split(':').map(Number);
      shiftTimeInMinutes = shiftHours * 60 + (shiftMinutes || 0);
    } else {
      console.error('shift.time is neither a string nor a number:', shift.time);
      return false; // استبعاد الـ shift إذا كان التنسيق غير متوقع
    }

    return !reservations.some((reservation) => {
      // بناء الوقت المحجوز من time و period
      if (!reservation.time || !reservation.period) {
        console.error('time or period is undefined for reservation:', reservation);
        return false; // استبعاد الحجز إذا لم يكن الوقت متوفرًا
      }

      const reservedTimeInMinutes = convertTo24HourFormat(`${reservation.time} ${reservation.period}`);

      // تأكد من أن reservedTimeInMinutes معرف
      if (reservedTimeInMinutes === null) {
        return false; // استبعاد الحجز إذا كان الوقت غير صالح
      }

      // بناءً على نوع الحجز
      if (reservation.category === 'كشف') {
        return (
          shiftTimeInMinutes >= reservedTimeInMinutes &&
          shiftTimeInMinutes < reservedTimeInMinutes + 30 // مدة الكشف 30 دقيقة
        );
      } else if (reservation.category === 'جلسة') {
        return (
          shiftTimeInMinutes >= reservedTimeInMinutes &&
          shiftTimeInMinutes < reservedTimeInMinutes + 60 // مدة الجلسة 60 دقيقة
        );
      }

      return false;
    });
  });
};

// دالة لتصفية المواعيد بناءً على الفترات المتاحة للدكتور
const filterShiftsByDoctorAvailability = (shifts, startTime, endTime) => {
  const shiftStartInMinutes = convertTo24HourFormat(startTime);
  const shiftEndInMinutes = convertTo24HourFormat(endTime);

  return shifts.filter((shift) => {
    const shiftTimeInMinutes = convertTo24HourFormat(shift.time + ' ' + shift.period);
    return shiftTimeInMinutes >= shiftStartInMinutes && shiftTimeInMinutes <= shiftEndInMinutes;
  });
};

// useEffect لتحديد المواعيد المتاحة
useEffect(() => {
  if (dayInfo && Object.keys(dayInfo).length > 0) {
    let availableShifts = [];

    if (dayInfo.category === 'كشف') {
      // استخدم timeSlots للأطباء الذين نوعهم كشف
      availableShifts = filterShiftsByDoctorAvailability(timeSlots, dayInfo.shiftStartsFrom, dayInfo.shiftEndsIn);
    } else if (dayInfo.category === 'جلسات') {
      // استخدم ShiftsHours للأطباء الذين نوعهم جلسات
      availableShifts = filterShiftsByDoctorAvailability(ShiftsHours, dayInfo.shiftStartsFrom, dayInfo.shiftEndsIn);
    } else if (dayInfo.category === 'كشف وجلسات') {
      // استخدم ShiftsHours للأطباء الذين نوعهم كشف وجلسات
      availableShifts = filterShiftsByDoctorAvailability(timeSlots, dayInfo.shiftStartsFrom, dayInfo.shiftEndsIn);
    }

    if (dayInfo.reservations && dayInfo.reservations.length > 0) {
      // حذف المواعيد المحجوزة من availableShifts
      const reservedTimes = dayInfo.reservations.map((reservation) => ({
        time: reservation.reservationTime.split(' ')[0],
        period: reservation.reservationTime.split(' ')[1],
        category: reservation.category
      }));

      availableShifts = filterReservedTimes(availableShifts, reservedTimes);
    }

    setAvailableShifts(availableShifts);
  }
}, [dayInfo, category]);


      const handleAddReservation = async () => {
        if(!doctor || !inputDate || !newReversationPeriod || !nameOfNewReversation || !userNumber || !category){
          toast.warning('برجاء ادخال المعلومات المطلوبة')
        }else{
          const res = await fetch(`/api/editData?method=add-new-reservation`, {
            method: 'POST',
            body: JSON.stringify({inputDate, doctor, newReversationPeriod, nameOfNewReversation, userNumber, category}),
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          const dataOfResponse = await res.json();
    
          if(res.status === 200){
            toast.success(dataOfResponse.message);
            getDay();
            setNameOfNewReversation('');
            setUserNumber('');
            setNewReversationPeriod('');
          }else{
            toast.error(dataOfResponse.message);
            setNameOfNewReversation('');
            setUserNumber('');
            setNewReversationPeriod('');
          }
        }
      }


    return(
        <div className="add-reservation-page system-page">
            <HeadSystem  name={`اضافة حجز`}/>
                <div className="date-header">


            <button disabled={isToday(date)} onClick={handlePreviousDay}>
                اليوم السابق
            </button>



            <div className="input-container">
                <input
                    type="text"
                    value={inputDate}
                    onChange={handleDateChange}
                    onBlur={handleDateBlur}
                />
            </div>


            <button onClick={handleNextDay}>
                اليوم التالي
            </button>
                </div>

                <div className="doctor-choice">
                      <h1>قم بإختيار الدكتور</h1>
                      <div onClick={()=> setOpenDoctorsList(!openDoctorsList)} className="dropmenu"><IoMdArrowDropdown  className="icon" /> <p>{doctor ? doctorsList.find((doctorObj) => doctorObj.serial === doctor).name : `قم بإختيار الدكتور`}</p> 
                        {openDoctorsList &&  <div className="dropmenu-list">
                          {
                            doctorsList.map((e, key) => {
                              return(
                                <button key={key} onClick={()=> setDoctor(e.serial)}>{e.name}</button>
                              )
                            })
                          }
                        </div>}
                    </div>
                </div>

                <div className="inner-add-reservation">
                    <div className="information">
                        <h1>معلومات اليوم</h1>

                        <div className="day-information">
                            {!loading && Object.keys(dayInfo).length === 0 &&  <p className="alert-parag">لا توجد معلومات لهذا اليوم</p>}
                            {!loading && Object.keys(dayInfo).length > 0 && dayInfo?.vacation &&  <p className="alert-parag">الدكتور في اجازة هذا اليوم</p>}
                            {!loading && Object.keys(dayInfo).length > 0 && !dayInfo?.vacation && !dayInfo?.reservations?.length && <p className="alert-parag">لا يوجد حجوزات لهذا الدكتور في يوم {inputDate}</p>}

                            {
                                !loading && Object.keys(dayInfo).length > 0 && dayInfo?.reservations?.length > 0 && <div className="table">
                                <div className="table-head"><p className="doctor-name">اسم الحجز</p> <p className="period">الميعاد</p> <p className="period">رقم الحجز</p> <p className="period">نوع الحجز</p> <p className="period no-border">رقم الهاتف</p></div>

                                {
                                dayInfo.reservations.map((e, key) => {
                                    
                                    return(
                                    <div className="table-record" key={key}><p className="doctor-name">{e.reservationName}</p> <p className="period">{e.reservationTime}</p> <p className="period">{e.reservationSerial}</p> <p className="period">{e.category}</p> <p className="period no-border">{e.userNumber}</p></div>
                                    )

                                })
                                }


                                </div> 
                            }


                            {loading && Object.keys(dayInfo).length === 0 && !dayInfo?.vacation && !dayInfo?.reservations?.length && <div className="loading"><LoadingCircle  size={`35px`} providedcolor="#309C53"/></div>}
                        </div>
                    </div>

                    <div className="add">
                            <h1>اضافة حجز</h1>
                            <input value={nameOfNewReversation} onChange={(s)=> setNameOfNewReversation(s.target.value)} type="text" placeholder="اسم الشخص"></input>
                            <input value={userNumber} onChange={(s)=> setUserNumber(s.target.value)} type="text" placeholder="رقم هاتف الشخص"></input>
                            <div onClick={()=> setOpenCategory(!openCategory)} className="dropmenu"><IoMdArrowDropdown className="icon" /> <p>{category ? category : `نوع الحجز`}</p> 
                                    {openCategory &&  <div className="dropmenu-list">
                                        <button aria-label="كشف" onClick={()=> setCategory(`كشف`)}>كشف</button>
                                        <button aria-label="جلسة" onClick={()=> setCategory(`جلسة`)}>جلسة</button>
                                </div>}
                            </div>
                            <div onClick={()=> setOpenNewShifts(!openNewShifts)} className="dropmenu"><IoMdArrowDropdown className="icon" /> <p>{newReversationPeriod ? newReversationPeriod : `ميعاد الحجز الجديد`}</p> 
                                    {openNewShifts &&  <div className="dropmenu-list heighted">
                                        {availableShifts.map((e,key) =>{
                                    return(
                                    <button key={key} onClick={()=> setNewReversationPeriod(`${e.time} ${e.period}`)}>{e.time} {e.period}</button>
                                    )
                                })}
                                </div>}
                            </div>
                            <button aria-label="اضافة حجز" onClick={handleAddReservation} className="main-button">اضافة</button>
                    </div>
                </div>
        </div>
    )
}

export default AddReservation;