
import HeadSystem from "@/Components/System/Head";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ShiftsHours from '@/utils/shiftsHours.json';
import LoadingCircle from "@/Components/Loading-Circle";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('اضافة جدول شهري')) {

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



const ScheduleMonthly = () => {

       // Getting data of day
       const [doctorsList, setDoctorsList] = useState([]);
       const [openDoctorsList, setOpenDoctorsList] = useState(false);
       const [openShiftStart, setOpenShiftStart] = useState(false);
       const [openShiftEnds, setOpenShiftEnds] = useState(false);
       const [openVacation, setOpenVacation] = useState(false);
       const [openCategory, setOpenCategory] = useState(false);
       const [openMonth, setOpenMonth] = useState(false);

       const [openPeriod, setOpenPeriod] = useState(false);

       const [loading, setLoading] = useState(false);

       const [innerData, setInnerData] = useState({
        doctor: '',
        shiftStartsFrom: '',
        shiftEndsIn: '',
        vacation: false,
        doctorName: '',
        category: '',
        month: '',
        days: [],
        specializedIn: ''
      });

       useEffect(()=> {
            const gettingDoctorsList = async () => {
                const res = await fetch(`/api/getData?method=get-doctors-list`);
                const dataOfResponse = await res.json();
                setDoctorsList(dataOfResponse.list);
            }
            gettingDoctorsList();
       }, []);

       const obj = {
        "periodOne": 'السبت والاثنين والاربعاء',
        "periodTwo": 'الاحد والثلاثاء والخميس'
      }

      


        // Arabic month list

        const monthsInArabic = [
          "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
          "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];

        // Get current month (0-11)
        const currentMonth = new Date().getMonth();

      const handleSubmit = async () => {

        setLoading(true);

        if(Object.values(innerData).some((e)=> e === '')){
          toast.warning('برجاء ملئ المعلومات المطلوبة');
          setLoading(false);
        }else{
          const res = await fetch(`/api/editData?method=add-monthly-schedule`,{
            body: JSON.stringify(innerData),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          });

          const dataOfResponse = await res.json();

          if(res.status === 200){
            toast.success(dataOfResponse.message);
            setInnerData({
              doctor: '',
              shiftStartsFrom: '',
              shiftEndsIn: '',
              vacation: false,
              doctorName: '',
              category: '',
              month: '',
              days: [],
              specializedIn: ''
            });
            setLoading(false);
          }else{
            toast.error(dataOfResponse.message);
            setLoading(false);
          }
        }
      }


      const handleChangeDays = (s, name) => {
        // Update the days array based on the value of s
        if (s) {
          // If s is true, add name to the days array
          setInnerData((prevData) => ({
            ...prevData,
            days: [...prevData.days, name]
          }));
        } else {
          // If s is false, remove name from the days array
          setInnerData((prevData) => ({
            ...prevData,
            days: prevData.days.filter((e) => e !== name)
          }));
        }
      };
    return(
        <div className="schedule-monthly-page system-page">
            <HeadSystem name={`اضافة جدول شهري`} />


            <div className="inner-schedule-monthly-page">

                <div className="inputs-schedule-monthly">
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

                    <div onClick={innerData.vacation ? ()=> {return} : ()=> setOpenCategory(!openCategory)} className={innerData.vacation ? "dropmenu disabled" : "dropmenu"}><IoMdArrowDropdown className="icon" /> <p>{innerData.category ? `تخصص الدكتور: ${innerData.category}` : `تخصص الدكتور`}</p> 
                      {openCategory &&  <div className="dropmenu-list">
                        <button aria-label="كشف" onClick={()=> setInnerData({...innerData, category: `كشف`})}>كشف</button>
                        <button aria-label="جلسات" onClick={()=> setInnerData({...innerData, category: `جلسات`})}>جلسات</button>
                        <button aria-label="كشف وجلسات" onClick={()=> setInnerData({...innerData, category: `كشف وجلسات`})}>كشف وجلسات</button>
                          </div>}
                    </div>
                    <input type="text" placeholder="متخصص في" value={innerData.specializedIn} onChange={(s)=> setInnerData({...innerData, specializedIn: s.target.value})}></input>
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
                    <div onClick={() => setOpenMonth(!openMonth)} className="dropmenu">
                      <IoMdArrowDropdown className="icon" />
                      <p>{innerData.month ? innerData.month : 'قم بإختيار الشهر'}</p>
                      {openMonth && (
                        <div className="dropmenu-list heighted">
                          {monthsInArabic.map((e, index) => (
                            <button
                              key={index}
                              onClick={() => setInnerData({ ...innerData, month: e })}
                      
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                      <div className="week-days">
                          <div className="day">
                            <input checked={innerData.days.includes('السبت')} onChange={(s)=> handleChangeDays(s.target.checked, 'السبت')} type="checkbox"></input>
                            <p>السبت</p>
                          </div>

                          <div className="day">
                            <input checked={innerData.days.includes('الاحد')} onChange={(s)=> handleChangeDays(s.target.checked, 'الاحد')} type="checkbox"></input>
                            <p>الاحد</p>
                          </div>


                          <div className="day">
                            <input checked={innerData.days.includes('الاثنين')} onChange={(s)=> handleChangeDays(s.target.checked, 'الاثنين')} type="checkbox"></input>
                            <p>الاثنين</p>
                          </div>


                          <div className="day">
                            <input checked={innerData.days.includes('الثلاثاء')} onChange={(s)=> handleChangeDays(s.target.checked, 'الثلاثاء')} type="checkbox"></input>
                            <p>الثلاثاء</p>
                          </div>

                          <div className="day">
                            <input checked={innerData.days.includes('الاربعاء')} onChange={(s)=> handleChangeDays(s.target.checked, 'الاربعاء')} type="checkbox"></input>
                            <p>الاربعاء</p>
                          </div>

                          <div className="day">
                            <input checked={innerData.days.includes('الخميس')} onChange={(s)=> handleChangeDays(s.target.checked, 'الخميس')} type="checkbox"></input>
                            <p>الخميس</p>
                          </div>

                          <div className="day">
                            <input checked={innerData.days.includes('الجمعة')} onChange={(s)=> handleChangeDays(s.target.checked, 'الجمعة')} type="checkbox"></input>
                            <p>الجمعة</p>
                          </div>
                      </div>

                    {loading ? <button className="main-button" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><LoadingCircle providedcolor="white" size={`25px`} /></button> : <button className="main-button" aria-label="اضافة" onClick={handleSubmit}>اضافة</button>}
                </div>

            </div>

        </div>
    )
}

export default ScheduleMonthly;