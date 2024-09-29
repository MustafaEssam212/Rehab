import { IoCloseCircle } from "react-icons/io5";
import {useRef, useEffect, useState} from "react";
import ShiftsHours from '@/utils/shiftsHours.json';
import { IoMdArrowDropdown } from "react-icons/io";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import filterShifts from "@/utils/filterShifts";


const EditPop = ({sendDataToParent, reservation}) => {

    const popRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the popRef element
            if (popRef.current && !popRef.current.contains(event.target)) {
                sendDataToParent(false); // Close the popup
            }
        };

        // Add event listener to detect clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sendDataToParent]);


    const [openShiftsList, setOpenShiftsList] = useState(false);
    const [chosenShift, setChosenShift] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [doctorObj, setDoctorObj] = useState({})
    const [availableShifts, setAvailableShifts] = useState([]);
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

    function hasDatePassed(reservation) {
      // Get current date and time
      const currentDate = new Date();

  
      // Parse the reservation date (assuming format is 'dd/mm/yyyy')
      const [day, month, year] = reservation.date.split('/');

  
      // Parse the reservation time, assuming 'صباحاً' means AM and 'مساءً' means PM
      let [time, period] = reservation.reservationTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number); // Map time into hours and minutes
  
      // Handle cases where minutes are undefined (like "5 مساءً" without the minutes part)
      if (isNaN(minutes)) {
          minutes = 0; // Default to 0 minutes if not provided
      }

  
      // Convert to 24-hour format
      if (period === "مساءً" && hours < 12) {
          hours += 12; // Convert PM to 24-hour format
      } else if (period === "صباحاً" && hours === 12) {
          hours = 0; // Handle 12 AM case
      }

  
      // Create a new Date object for the reservation date and time
      const reservationDate = new Date(year, month - 1, day, hours, minutes); // month is 0-indexed

  
      // Check if reservationDate is valid
      if (isNaN(reservationDate)) {

          return false; // Return false if the date is invalid
      }
  
      // Compare the current date and time with the reservation date and time
      const hasPassed = currentDate > reservationDate;

      return hasPassed;
  }


    const getData = async (date) => {
        const res = await fetch(`/api/getData?method=get-day-info&date=${date}&serial=${reservation.doctor}`);
        const dataOfResponse = await res.json();
        if(res.status === 200){
            setDoctorObj(dataOfResponse.doctor);
        }else{
            setDoctorObj({});
        }
    }

    useEffect(() => {
        if (!reservation.reservationSerial || hasDatePassed(reservation)) {
            return;
        }
        getData(reservation.date);
    }, [reservation]);

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
        if (Object.keys(doctorObj).length !== 0) {
          setAvailableShifts(filterShifts(reservation.date, doctorObj.category === 'جلسات' ? ShiftsHours : timeSlots , doctorObj.shiftStartsFrom, doctorObj.shiftEndsIn, doctorObj.reservations, reservation.category, doctorObj.category))
        } else {
          setAvailableShifts([]);
        }
      }, [doctorObj]);

      useEffect(()=> {
        if(inputDate){
            getData(inputDate)
        }
      }, [inputDate])


      const handleSubmit = async () => {
        setBtnLoading(true);

        if(!chosenShift){
          toast.warning('برجاء اختيار الميعاد المتاح');
          setBtnLoading(false);
        }else{
          if(isToday(date)){
            const res = await fetch(`/api/editData`, {
                body: JSON.stringify({
                    method: 'update-reservation-date',
                    doctorSerial: reservation.doctor,
                    reservationSerial: reservation.reservationSerial,
                    newReservationTime: chosenShift,
                    date: reservation.date
                }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dataOfResponse = await res.json();
            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setBtnLoading(false);
                sendDataToParent(false, 'Yes')
            }else{
                toast.error(dataOfResponse.error);
                setBtnLoading(false);
            }
        }else{
            const res = await fetch(`api/editData`, {
                method: 'PUT',
                body: JSON.stringify({
                    method: 'update-reservation-date-time',
                    oldDate: reservation.date,
                    doctorSerial: reservation.doctor,
                    reservationSerial: reservation.reservationSerial,
                    newReservationTime: chosenShift,
                    newDate: inputDate
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dataOfResponse = await res.json();
            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setBtnLoading(false);
                sendDataToParent(false, 'Yes')
            }else{
                toast.error(dataOfResponse.error);
                setBtnLoading(false);
            }
        }
        }
      }


      useEffect(()=> {
        if(availableShifts <= 0){
          setChosenShift('');
        }
      }, [availableShifts])




    return(
        <div className="edit-pop-reservation reservation-pop">
            <div ref={popRef} className="inner-reservation-pop">
                <div className="head-reservation-pop">
                    <button aria-label="غلق" onClick={()=> sendDataToParent(false)}><IoCloseCircle className="icon" /></button>
                    <h1>تعديل ميعاد الحجز</h1>
                </div>

               

                {
                    !hasDatePassed(reservation) ? <div className="body-reservation-pop">
                    <h1>قم بإختيار الميعاد المتوفر لتغيير ميعاد حجزك الحالي</h1>
                    <div className="date-input">
                        <div className="left">
                            <button aria-label="اليوم السابق" disabled={isToday(date)} onClick={handlePreviousDay}><FaCircleMinus className="btn-icon" /></button>

                            <div className="input-container">
                                <input
                                    type="text"
                                    value={inputDate}
                                    onChange={handleDateChange}
                                    onBlur={handleDateBlur}
                                />
                            </div>


                            <button aria-label="اليوم التالي" onClick={handleNextDay}><FaCirclePlus className="btn-icon" /></button>
                        </div>

                        <h3>التاريخ</h3>
                    </div>
                    {availableShifts.length <= 0 && <h4>لا يوجد معلومات لهذا اليوم</h4>}
                    <div onClick={availableShifts.length === 0 ? () => {return} : ()=> setOpenShiftsList(!openShiftsList)} className="dropmenu"><IoMdArrowDropdown className="icon" /> <p>{chosenShift ? chosenShift : `قم بإختيار الميعاد`}</p> 
                      {openShiftsList &&  <div className="dropmenu-list heighted">
                       
                            {
                              availableShifts.map((e, key) => {
                                return(
                                  <button key={key} onClick={()=> setChosenShift(`${e.time} ${e.period}`)}>{e.time} {e.period}</button>
                                )
                              })
                            }
                          </div>}
                    </div>
                    <button onClick={handleSubmit} aria-label="تأكيد">{btnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>

                </div> : <div className="alert-pop">
                    <h1>لا يمكن اجراء تعديل على ميعاد حجز انقضى بالفعل</h1>
                </div> 
                }

          
            </div>
        </div>
    )
}


export default EditPop;