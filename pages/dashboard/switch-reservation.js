
import HeadSystem from "@/Components/System/Head";
import { useState, useEffect } from "react";
import LoadingCircle from "@/Components/Loading-Circle";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('تبديل حجز')) {

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


const SwitchReservation = () => {

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

    const [data, setData] = useState({
        firstReservationNum: '',
        secondReservationNum: ''
    })

    const [loading, setLoading] = useState(false);

    const handleSwitch = async () => {
        setLoading(true);
        if(Object.values(data).some((e) => e === '')){
            toast.warning('برجاء ملئ المعلومات المطلوبة')
        }else{
            const res = await fetch(`/api/editData?method=switch-reservation&date=${inputDate}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const dataOfResponse = await res.json();
            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setData({
                    firstReservationNum: '',
                    secondReservationNum: ''
                });
                setLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setLoading(false);
            }
        }
    }

    return(
        <div className="switch-reservation-page system-page">
            <HeadSystem name={`تبديل حجز`} />

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

            <div className="inner-switch-reservation">
                <h1>قم بإدخال ارقام الحجوزات</h1>
                <input value={data.firstReservationNum} placeholder="رقم الحجز الاول" type="number" aria-label="رقم الحجز الاول" onChange={(s)=> setData({...data, firstReservationNum: s.target.value})}></input>
                <input value={data.secondReservationNum} placeholder="رقم الحجز الثاني" type="number" aria-label="رقم الحجز الثاني" onChange={(s)=> setData({...data, secondReservationNum: s.target.value})}></input>
                <button aria-label="تأكيد" onClick={handleSwitch}>{loading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
            </div>
        </div>
    )
}

export default SwitchReservation;

