import HeadSystem from "@/Components/System/Head";
import { useState, useEffect } from "react";
import LoadingCircle from "@/Components/Loading-Circle";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('جدول وحجوزات')) {

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


const PopWindow = dynamic(()=> import('@/Components/System/PopWindow'));


const ScheduleBooking = () => {

    const [date, setDate] = useState(new Date());
    const [inputDate, setInputDate] = useState('');


    useEffect(() => {
        // Ensure the date is set to the start of the day (00:00:00) to avoid issues with time differences
        setDate(new Date(date.setHours(0, 0, 0, 0)));
      }, []);
    

    
      const handlePreviousDay = () => {
        setDate(new Date(date.setDate(date.getDate() - 1)));
      };
    
      const handleNextDay = () => {
        setDate(new Date(date.setDate(date.getDate() + 1)));
      };
    
      const handleDateChange = (event) => {
        setInputDate(event.target.value);
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


      // Getting Data

      const [loading, setLoading] = useState(false);
      const [data, setData] = useState([]);

      useEffect(()=> {
        if(inputDate){
            setLoading(true);
            const getData = async () => {
                const res = await fetch(`/api/getData?method=schedule-booking&date=${inputDate}`);
                const dataOfResponse = await res.json();

                if(res.status === 200){
                    setData(dataOfResponse.doctors);
                    setLoading(false);
                }else{
                    toast.error(dataOfResponse.message);
                    setLoading(false);
                }
            }
            getData()
        }
      }, [inputDate])



      const timeSlots = [
        "9 صباحاً", "9:30 صباحاً", "10 صباحاً", "10:30 صباحاً", "11 صباحاً", 
        "11:30 صباحاً", "12 مساءً", "12:30 مساءً", "1 مساءً", "1:30 مساءً", 
        "2 مساءً", "2:30 مساءً", "3 مساءً", "3:30 مساءً", "4 مساءً", 
        "4:30 مساءً", "5 مساءً", "5:30 مساءً", "6 مساءً", "6:30 مساءً", 
        "7 مساءً", "7:30 مساءً", "8 مساءً", "8:30 مساءً", "9 مساءً", 
        "9:30 مساءً", "10 مساءً"
      ];


      const [openPopWindow, setOpenPopWindow] = useState(false);
      const [dataOfPopWindow, setDataOfPopWindow] = useState({
        date: '',
        doctorName: '',
        reservationName: '',
        reservationSerial: '',
        reservationTime: '',
        userNumber: '',
        category: '',
        whatsAppNumber: ''
      })
      const sendDataFromChild = (param) =>{
        setOpenPopWindow(param)
      }

    return(
        <div className="booking-schedule-page-cotaniner system-page">
            <HeadSystem name={`الجدول والحجوزات`} />
            {openPopWindow && <PopWindow sendDataFromChild={sendDataFromChild} data={dataOfPopWindow} />}
            <div className="date-header">


                <button onClick={handlePreviousDay}>
                    اليوم السابق
                </button>



                <div className="input-container">
                    <input
                        type="text"
                        value={inputDate}
                        onChange={handleDateChange}
                    />
                </div>


                <button onClick={handleNextDay}>
                    اليوم التالي
                </button>
            </div>


            <div className="table-of-booking-schedule">
                
                {
                    loading && !data.length && <div className="loading"><LoadingCircle size={`45px`} providedcolor="#309C53" /></div>
                }


                {
                    !loading && data.length > 0 && <div className="main-table">
                    <div className="table-periods">
                      <p>الوقت</p>
                      {timeSlots.map((slot, index) => (
                        <p key={index}>{slot}</p>
                      ))}
                    </div>
                  
                    {
                      data.map((e, key) => {
                        return (
                          <div key={key} className="table-records">
                            <p>{e.doctorName}</p>
                            
                            {e.reservations.length > 0 ? (
                              // Iterate over the timeSlots array and match reservations
                              <>
                                {timeSlots.map((slot, ndx) => {
                                  // Find the reservation that matches the current time slot
                                  const reservation = e.reservations.find(reser => reser.reservationTime === slot);
                  
                                  return (
                                    <p onClick={reservation ? ()=> {
                                        setDataOfPopWindow({...dataOfPopWindow,
                                            doctorName: e.doctorName,
                                            date: inputDate,
                                            reservationName: reservation.reservationName,
                                            reservationSerial: reservation.reservationSerial,
                                            reservationTime: reservation.reservationTime,
                                            userNumber: reservation.userNumber,
                                            category: reservation.category,
                                            whatsAppNumber: reservation.whatsAppNumber
                                        })
                                        setOpenPopWindow(true);
                                    } : ()=> {return}} className={reservation ? "btn" : ""} key={ndx}>
                                      {reservation ? reservation.reservationName : "-"}
                                    </p>
                                  );
                                })}
                              </>
                            ) : (
                              // If no reservations, show dashes for all slots
                              <>
                                {Array.from({ length: timeSlots.length }).map((_, ndx) => (
                                  <p key={ndx}>-</p>
                                ))}
                              </>
                            )}
                          </div>
                        );
                      })
                    }
                  </div>
                }

                {
                    !loading && !data.length && <p className="no-results">لا يوجد بيانات لهذا اليوم</p>
                }
            </div>


        </div>
    )
}


export default ScheduleBooking;