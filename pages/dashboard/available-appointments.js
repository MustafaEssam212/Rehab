
import HeadSystem from "@/Components/System/Head";
import { useState, useEffect } from "react";
import LoadingCircle from "@/Components/Loading-Circle";
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import ShiftsHours from '@/utils/shiftsHours.json';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('المواعيد المتاحة')) {

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


const AvailableAppointments = () => {

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


    const [doctor, setDoctor] = useState('');
    const [openDoctorsList, setOpenDoctorsList] = useState(false);
    const [doctorsList, setDoctorsList] = useState([]);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [availableShifts, setAvailableShifts] = useState([]);


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

    // Getting Data

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

    useEffect(() => {
      if(doctor && inputDate){
        setLoading(true);
        const getDay = async () => {
          const res = await fetch(`/api/getData?method=get-day-info&date=${inputDate}&serial=${doctor}`);
          const dataOfResponse = await res.json();
          if(res.status === 200){
            setData(dataOfResponse.doctor);
            setLoading(false);
          }else{
            toast.error(dataOfResponse.message);
            setData({});
            setLoading(false);
          }
        }
        getDay();
      }
    }, [doctor])

    useEffect(() => {
      if (data) {
        if (data.vacation) {
          setAvailableShifts([]);
        } else {
          if(data.category === 'جلسات'){
                      // Check if shiftStartsFrom and shiftEndsIn are defined
                if (data.shiftStartsFrom && data.shiftEndsIn) {
                  // Helper function to convert Arabic time to 24-hour format
                  const convertTo24Hour = (time, period) => {
                    let hour = parseInt(time, 10);
                    if (period === 'مساءً' && hour !== 12) hour += 12;
                    if (period === 'صباحاً' && hour === 12) hour = 0;
                    return hour;
                  };
          
                  // Convert shift start and end times to 24-hour format
                  const shiftStartHour = convertTo24Hour(
                    data.shiftStartsFrom.split(' ')[0],
                    data.shiftStartsFrom.split(' ')[1]
                  );
                  const shiftEndHour = convertTo24Hour(
                    data.shiftEndsIn.split(' ')[0],
                    data.shiftEndsIn.split(' ')[1]
                  );
          
                  // Filter out hours that are outside the doctor's shift range
                  const filteredShifts = ShiftsHours.filter(shift => {
                    const hour = convertTo24Hour(shift.time, shift.period);
                    return hour >= shiftStartHour && hour <= shiftEndHour;
                  });
          
                  // Handle reservations
                  if (data.reservations?.length) {
                    const reservedTimes = data.reservations.map(
                      (reservation) => reservation.reservationTime
                    );
          
                    const availableShifts = filteredShifts.filter(
                      (shift) => !reservedTimes.includes(`${shift.time} ${shift.period}`)
                    );
          
                    setAvailableShifts(availableShifts);
                  } else {
                    setAvailableShifts(filteredShifts);
                  }
                } else {
                  setAvailableShifts([]);
                }
          }else{
                      // Check if shiftStartsFrom and shiftEndsIn are defined
          if (data.shiftStartsFrom && data.shiftEndsIn) {
            // Helper function to convert Arabic time to 24-hour format
            const convertTo24Hour = (time, period) => {
              let hour = parseInt(time, 10);
              if (period === 'مساءً' && hour !== 12) hour += 12;
              if (period === 'صباحاً' && hour === 12) hour = 0;
              return hour;
            };
    
            // Convert shift start and end times to 24-hour format
            const shiftStartHour = convertTo24Hour(
              data.shiftStartsFrom.split(' ')[0],
              data.shiftStartsFrom.split(' ')[1]
            );
            const shiftEndHour = convertTo24Hour(
              data.shiftEndsIn.split(' ')[0],
              data.shiftEndsIn.split(' ')[1]
            );
    
            // Filter out hours that are outside the doctor's shift range
            const filteredShifts = timeSlots.filter(shift => {
              const hour = convertTo24Hour(shift.time, shift.period);
              return hour >= shiftStartHour && hour <= shiftEndHour;
            });
    
            // Handle reservations
            if (data.reservations?.length) {
              const reservedTimes = data.reservations.map(
                (reservation) => reservation.reservationTime
              );
    
              const availableShifts = filteredShifts.filter(
                (shift) => !reservedTimes.includes(`${shift.time} ${shift.period}`)
              );
    
              setAvailableShifts(availableShifts);
            } else {
              setAvailableShifts(filteredShifts);
            }
          } else {
            setAvailableShifts([]);
          }
          }
        }
      } else {
        setAvailableShifts([]);
      }
    }, [data]);
    
    

    return(
        <div className="available-appointments-page-container system-page">
                <HeadSystem name={`المواعيد المتاحة`} />

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


                <div className="inner-available-appointments">
                        <div className="left">
                            <h1>المواعيد المتاحة في هذا اليوم</h1>
                            <div className="day-information">
                              {loading && Object.keys(data).length === 0 && <div className="loading"><LoadingCircle  size={`35px`} providedcolor="#309C53"/></div>}
                                {!loading && Object.keys(data).length === 0 && <p className="alert-parag">لا توجد معلومات لهذا اليوم</p>}
                                {!loading && Object.keys(data).length > 0 && data?.vacation && <p className="alert-parag">الدكتور اجازة في هذا اليوم</p>}


                                {
                                  !loading && Object.keys(data).length > 0 && !data.vacation &&  <div  className="available-appointments-small-container">
                                  
                                    {
                                      availableShifts.map((e, key) => {
                                        return(
                                          <p key={key}>{e.time} {e.period}</p>
                                        )
                                      })
                                    }

                                </div>
                                }


                            </div>
                        </div>
                        <div className="right">
                          <h1>اختر الدكتور</h1>
                          <div onClick={()=> setOpenDoctorsList(!openDoctorsList)} className="dropmenu"><IoMdArrowDropdown className="icon" /> <p>{doctor ? doctorsList.find((doctorObj) => doctorObj.serial === doctor).name : `قم بإختيار الدكتور`}</p> 
                            {openDoctorsList &&  <div className="dropmenu-list">
                                

                                  {
                                    doctorsList.map((e, key) => {
                                      return(
                                        <button key={key} aria-label={e.name} onClick={()=> setDoctor(e.serial)}>{e.name}</button>
                                      )
                                    })
                                  }

                                </div>}
                          </div>
                        </div>
                </div>
        </div>
    )
}


export default AvailableAppointments;