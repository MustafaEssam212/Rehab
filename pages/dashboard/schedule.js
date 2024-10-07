
import HeadSystem from "@/Components/System/Head";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ShiftsHours from '@/utils/shiftsHours.json';
import LoadingCircle from "@/Components/Loading-Circle";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('اضافة جدول يومي')) {

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


const Schedule = () => {


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


    const [innerData, setInnerData] = useState({
      doctor: '',
      shiftStartsFrom: '',
      shiftEndsIn: '',
      vacation: false,
      doctorName: '',
      category: '',
      specializedIn: ''
    })

    const [openDoctorsList, setOpenDoctorsList] = useState(false);
    const [openShiftStart, setOpenShiftStart] = useState(false);
    const [openShiftEnds, setOpenShiftEnds] = useState(false);
    const [openVacation, setOpenVacation] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    const obj = {
      true: 'نعم',
      false: 'لا'
    }
    


    // Getting data of day
    const [doctorsList, setDoctorsList] = useState([]);
    const [dayInfo, setDayInfo] = useState([]);
    const [loadingInfo, setLoadingInfo] = useState(false);

    const getData = async () => {
      setLoadingInfo(true);
      const res = await fetch(`/api/getData?method=schedule&date=${inputDate}`);
      const dataOfResponse = await res.json();
      if(res.status !== 200){
        toast.error(dataOfResponse.message);
        setDayInfo([]);
        setDoctorsList([]);
        setLoadingInfo(false);
      }else{
        setDayInfo(dataOfResponse.dayInfo);
        setDoctorsList(dataOfResponse.doctorsList);
        setLoadingInfo(false);
      }
    }


    useEffect(() => {
      if(inputDate){
        getData()
      }
    }, [inputDate])




    // handle adding or editing a doctor
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if(innerData.vacation === false){
          if(!inputDate || !innerData.doctor || !innerData.shiftEndsIn || !innerData.shiftStartsFrom || !innerData.category){
            toast.warning('برجاء ادخال كافة المعلومات المطلوبة')
          }else{
            setLoading(true);
            var allData = innerData;
            allData.date = inputDate;
             
            const res = await fetch(`/api/editData?way=dashboard&method=addToSchedule`, {
              method: 'POST',
              body: JSON.stringify(allData),
              headers: {
                'Content-Type': 'application/json'
              }
            });

            const dataOfResponse = await res.json();

            if(res.status !== 200){
              toast.error(dataOfResponse.message);
              setInnerData({
                doctor: '',
                shiftStartsFrom: '',
                shiftEndsIn: '',
                vacation: false,
                doctorName: '',
                specializedIn: ''
              });
              setLoading(false)
            }else{
              toast.success(dataOfResponse.message);
              setInnerData({
                doctor: '',
                shiftStartsFrom: '',
                shiftEndsIn: '',
                vacation: false,
                doctorName: ''
              });
              setLoading(false);
              getData();
            }


          }

        }else{
          if(!inputDate || !innerData.doctor){
            toast.warning('برجاء ادخال كافة المعلومات المطلوبة')
          }else{
            setLoading(true);
            var allData = innerData;
            allData.date = inputDate;
             
            const res = await fetch(`/api/editData?way=dashboard&method=addToSchedule`, {
              method: 'POST',
              body: JSON.stringify(allData),
              headers: {
                'Content-Type': 'application/json'
              }
            });

            const dataOfResponse = await res.json();

            if(res.status !== 200){
              toast.error(dataOfResponse.message);
              setInnerData({
                doctor: '',
                shiftStartsFrom: '',
                shiftEndsIn: '',
                vacation: false,
                doctorName: ''
              });
              setLoading(false)
            }else{
              toast.success(dataOfResponse.message);
              setInnerData({
                doctor: '',
                shiftStartsFrom: '',
                shiftEndsIn: '',
                vacation: false,
                doctorName: ''
              });
              setLoading(false);
              getData();
            }
          }
        }
    }


  

    return(
        <div className="schedule-page-container system-page">
            <HeadSystem name={`اضافة جدول`} />

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

            <div className="inner-schedule-container">
                <div className="left">
                  <h1>معلومات اليوم</h1>
                  <div className="day-information">
                    
                    {!dayInfo.length ? <div className="no-info-parag"><p>لا توجد معلومات لهذا اليوم</p></div> : <></>}


                    {dayInfo.length ?  <div className="table">
                      <div className="table-head"><p className="doctor-name">الدكتور</p> <p className="period">يبدأ في</p> <p className="period">ينتهي في</p> <p className="period">التخصص</p> <p className="period no-border">اجازة</p></div>


                      {
                        dayInfo.map((e, key) => {
                          return(
                            <div key={key} className="table-record"><p className="doctor-name">{e.doctorName}</p> <p className="period">{e.vacation ? '-' : e.shiftStartsFrom}</p> <p className="period">{e.vacation ? '-' : e.shiftEndsIn}</p> <p className="period">{e.category}</p> <p className="period no-border">{obj[e.vacation]}</p></div>
                          )
                        })
                      }
                      

                    </div> : <></>}



                    {loadingInfo && <div className="loading"><LoadingCircle  size={`35px`} providedcolor="#309C53"/></div>}
                  </div>
                </div>
                <div className="right">
                    <h1>اضافة معلومات الدكتور</h1>
                    <div onClick={()=> setOpenDoctorsList(!openDoctorsList)} className="dropmenu"><IoMdArrowDropdown className="icon" /> <p>{innerData.doctorName ? innerData.doctorName : `قم بإختيار الدكتور`}</p> 
                      {openDoctorsList &&  <div className="dropmenu-list">
                       
                            {
                              doctorsList.map((e, key) => {
                                return(
                                  <button key={key} onClick={()=> setInnerData({...innerData, doctor: e.serial, doctorName: e.name})}>{e.name}</button>
                                )
                              })
                            }
                          </div>}
                    </div>
                    <div onClick={()=> setOpenVacation(!openVacation)} className="dropmenu"><IoMdArrowDropdown className="icon" /> <p>{ `اجازة: ${obj[innerData.vacation]}`}</p> 
                      {openVacation &&  <div className="dropmenu-list">
                        <button aria-label="اجازة" onClick={()=> setInnerData({...innerData, vacation: true})}>نعم</button>
                        <button aria-label="اجازة" onClick={()=> setInnerData({...innerData, vacation: false})}>لا</button>
                          </div>}
                    </div>
                    <div onClick={innerData.vacation ? ()=> {return} : ()=> setOpenCategory(!openCategory)} className={innerData.vacation ? "dropmenu disabled" : "dropmenu"}><IoMdArrowDropdown className="icon" /> <p>{innerData.category ? `تخصص الدكتور: ${innerData.category}` : `تخصص الدكتور`}</p> 
                      {openCategory &&  <div className="dropmenu-list">
                        <button aria-label="كشف" onClick={()=> setInnerData({...innerData, category: `كشف`})}>كشف</button>
                        <button aria-label="جلسات" onClick={()=> setInnerData({...innerData, category: `جلسات`})}>جلسات</button>
                        <button aria-label="كشف وجلسات" onClick={()=> setInnerData({...innerData, category: `كشف وجلسات`})}>كشف وجلسات</button>
                          </div>}
                    </div>
                    <input type="text" disabled={innerData.vacation} placeholder="متخصص في" value={innerData.specializedIn} onChange={(s)=> setInnerData({...innerData, specializedIn: s.target.value})}></input>
                    <div onClick={innerData.vacation ? ()=> {return} : ()=> setOpenShiftStart(!openShiftStart)} className={innerData.vacation ? "dropmenu disabled" : "dropmenu"}><IoMdArrowDropdown className="icon" /> <p>{innerData.shiftStartsFrom ? innerData.shiftStartsFrom : `ميعاد بداية الشيفت`}</p> 
                      {openShiftStart &&  <div className="dropmenu-list heighted">
                            {ShiftsHours.map((e,key) =>{
                              return(
                                <button key={key} onClick={()=> setInnerData({...innerData, shiftStartsFrom: `${e.time} ${e.period}`})}>{e.time} {e.period}</button>
                              )
                            })}
                          </div>}
                    </div>
                    <div onClick={innerData.vacation ? ()=> {return} : ()=> setOpenShiftEnds(!openShiftEnds)} className={innerData.vacation ? "dropmenu disabled" : "dropmenu"}><IoMdArrowDropdown className="icon" /> <p>{innerData.shiftEndsIn ? innerData.shiftEndsIn : `ميعاد نهاية الشيفت`}</p> 
                      {openShiftEnds &&  <div className="dropmenu-list heighted">
                            {ShiftsHours.map((e,key) =>{
                              return(
                                <button key={key} onClick={()=> setInnerData({...innerData, shiftEndsIn: `${e.time} ${e.period}`})}>{e.time} {e.period}</button>
                              )
                            })}
                          </div>}
                    </div>
                    {loading ? <button className="main-button" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><LoadingCircle providedcolor="white" size={`25px`} /></button> : <button className="main-button" aria-label="اضافة" onClick={handleSubmit}>اضافة</button>}
                </div>
            </div>

        </div>
    )
}

export default Schedule;