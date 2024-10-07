import { RiListSettingsFill } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import { useState, useEffect } from "react";
import ShiftsHours from '@/utils/shiftsHours.json';
import { IoMdArrowDropdown } from "react-icons/io";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

const ReservationDoctor = ({sendDataToParent}) => {


    const [date, setDate] = useState(new Date());
    const [inputDate, setInputDate] = useState('');
  
    useEffect(() => {
      // Ensure the date is set to the start of the day (00:00:00) to avoid issues with time differences
      setDate(new Date(date.setHours(0, 0, 0, 0)));
    }, []);
  
  
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



    // Getting Data

    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const [doctors, setDoctors] = useState([]);

    // Single filtering function
    const convertTimeTo24HourFormat = (timeString) => {
      const [time, period] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'مساءً' && hours !== 12) {
        hours += 12;
      }
      if (period === 'صباحاً' && hours === 12) {
        hours = 0;
      }
      return hours * 100 + (minutes || 0);
    };

    useEffect(() => { 
      
      if(inputDate){
        setLoadingDoctors(true);
        const getData = async () => {
          const res = await fetch(`/api/getData?method=reservation-date&date=${inputDate}`);
          const data = await res.json();
          setDoctors(data);
          setLoadingDoctors(false);
        }
  
        getData()
      }
  
    }, [inputDate])






    // Filtering Data

    const [isMorningToggled, setIsMorningToggled] = useState(false);
    const [isNightToggled, setIsNightToggled] = useState(false);
    const [filteredArray, setFilteredArray] = useState([]);
    const [openFilterShifts, setOpenFilterShifts] = useState(false);
    const [filterShift, setFilterShifts] = useState('');
    const [openCategory, setOpenCategory] = useState(false);
    const [category, setCategory] = useState('');

    
    // Initialize filteredArray with the full doctors list
    useEffect(() => {
      const filter = doctors.sort((a, b) => {
        return convertTimeTo24HourFormat(a.shiftStartsFrom) - convertTimeTo24HourFormat(b.shiftStartsFrom);
      });
      setFilteredArray(filter);
    }, [doctors]);
    

    
    const applyFilters = () => {
      let filtered = [...doctors];
    
      // Apply category filtering
      if (category === 'كشف') {
        filtered = filtered.filter(doctor => 
          doctor.category === 'كشف' || doctor.category === 'كشف وجلسات'
        );
      } else if (category === 'جلسة') {
        filtered = filtered.filter(doctor => 
          doctor.category === 'جلسات' || doctor.category === 'كشف وجلسات'
        );
      }
    
      // Apply morning or night shift filtering
      if (isMorningToggled) {
        filtered = filtered.filter(doctor => 
          convertTimeTo24HourFormat(doctor.shiftStartsFrom) < 1200
        );
      } else if (isNightToggled) {
        filtered = filtered.filter(doctor => 
          convertTimeTo24HourFormat(doctor.shiftStartsFrom) >= 1200
        );
      }
    
      // Apply reservation time filtering
      if (filterShift) {
        const filterShiftTime = convertTimeTo24HourFormat(filterShift);
        
        filtered = filtered.filter(doctor => {
          const shiftStartTime = convertTimeTo24HourFormat(doctor.shiftStartsFrom);
          const shiftEndTime = convertTimeTo24HourFormat(doctor.shiftEndsIn);
    
          // Check if the filterShift is within the doctor's shift hours
          const isWithinShift = filterShiftTime >= shiftStartTime && filterShiftTime <= shiftEndTime;
    
          // If the shift is valid, then check reservations
          return isWithinShift && 
            !doctor.reservations.some(reservation => {
              const reservedTime = convertTimeTo24HourFormat(reservation.reservationTime);
              let reservedDuration = 0;
              
              // Calculate duration based on reservation category
              if (reservation.category === 'كشف') {
                reservedDuration = 30;
              } else if (reservation.category === 'جلسة') {
                reservedDuration = 60;
              }
    
              // Check if the reserved time conflicts with the shift time
              return filterShiftTime >= reservedTime && filterShiftTime < reservedTime + reservedDuration;
            });
        });
      }
      
      // Sort the filtered array by shift start time
      filtered.sort((a, b) => {
        return convertTimeTo24HourFormat(a.shiftStartsFrom) - convertTimeTo24HourFormat(b.shiftStartsFrom);
      });
    
      setFilteredArray(filtered);
    };
    
    
    // Watch for any changes in filtering conditions
    useEffect(() => {
      applyFilters();
    }, [isMorningToggled, isNightToggled, filterShift, category, doctors]);
    
    // Handle toggling logic
    useEffect(() => {
      if (isMorningToggled && isNightToggled) {
        setIsNightToggled(false); // Ensure only one toggle is active at a time
      }
    }, [isMorningToggled]);
    
    useEffect(() => {
      if (isNightToggled && isMorningToggled) {
        setIsMorningToggled(false); // Ensure only one toggle is active at a time
      }
    }, [isNightToggled]);


    useEffect(() => {
      if(openCategory && openFilterShifts){
        setOpenFilterShifts(false);
      }
    }, [openCategory]);


    useEffect(() => {
        if(openFilterShifts && openCategory){
          setOpenCategory(false);
        }
    }, [openFilterShifts])


  // Handle Submiting

  const [selectedDoctor, setSelectedDoctor] = useState({
    doctorName: '',
    doctorSerial: '',
    img: '',
    reservations: [],
    doctorCategory: '',
    startShiftTime: '',
    endShiftTime: ''
  })

  const handleSubmit = async () => {
    const session = await getSession();

    if(!selectedDoctor.doctorName || !selectedDoctor.doctorSerial || !selectedDoctor.img){
      toast.warning('برجاء اختيار الدكتور اولاً')
    }
    else if(!category){
      toast.warning('برجاء اختيار نوع الحجز')
    }
    else{
      if(!session){
        toast.warning('برجاء تسجيل الدخول اولاً')
      }else{
        var info = selectedDoctor;
        info.date = inputDate;
        info.category = category;
        sendDataToParent(info);
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


  
    return(
        <div className="reservation-page-doctor">


        <div className="doctors">
             <h2>اختر الدكتور</h2>
          
             <div className="inner-doctors">

                 {
                   !loadingDoctors && filteredArray.length > 0 && <>
                   
                      {
                        filteredArray.map((e, key) => {
                          return(
                            <div key={key} onClick={()=> setSelectedDoctor({doctorName: e.doctorName, doctorSerial: e.doctor, reservations: e.reservations, img: `/api/getImage?method=get-doctor-image&doctor=${e.doctor}&image=${e.cover}`, doctorCategory: e.category, startShiftTime: e.shiftStartsFrom, endShiftTime: e.shiftEndsIn})} className={selectedDoctor.doctorSerial === e.doctor ? "doctor active" : "doctor"}>
                                <div className="check">
                                  <FaCircleCheck className="icon" />
                                </div>
                                <div className="info">
                                    <h4>الميعاد</h4>
                                    <h5><span>من</span> {e.shiftStartsFrom} - <span>الى</span> {e.shiftEndsIn}</h5>
                                </div>
                                <div className="info">
                                    <h4>التخصص</h4>
                                    <h5>{e.specializedIn ? e.specializedIn : 'علاج طبيعي'}</h5>
                                </div>
                                <div className="info">
                                    <h4>الإسم</h4>
                                    <h5><span>دكتور</span> {e.doctorName}</h5>
                                </div>
                                <div className="img-container"><Image  src={`/api/getImage?method=get-doctor-image&doctor=${e.doctor}&image=${e.cover}`} fill alt="دكتور في مركز ريهاب للعلاج الطبيعي والتأهيل" loading="lazy" ></Image></div>
                            </div>
                          )
                        })
                      }
                   
                   </>
                 }

                  {!loadingDoctors && !filteredArray.length && <div className="alert"><h3>لا يوجد دكاترة متاحة في هذا اليوم</h3></div>}
                  {loadingDoctors &&  <div className="alert"><LoadingCircle size={`45px`} providedcolor="#309C53" /></div>}

             </div>

                  {!loadingDoctors && filteredArray.length > 0 && <button onClick={handleSubmit} aria-label="التالي">التالي</button>}
        </div>

        <div className="filter">
           <h2>تصفية <RiListSettingsFill className="icon" /></h2>

           <div className="filter-section">
               <h3>بالتاريخ</h3>
               <div className="input-container">
                   <input
                       type="text"
                       value={inputDate}
                       onChange={handleDateChange}
                       onBlur={handleDateBlur}
                   />
               </div>
           </div>

           <div className="filter-section">
               <h3>نوع الحجز</h3>
               <div onClick={()=> setOpenCategory(!openCategory)} className={"dropmenu"}><IoMdArrowDropdown className="icon" /> <p>{category ? category : `نوع الحجز`}</p> 

                      {openCategory &&  <div className="dropmenu-list">
                        <button aria-label={`كشف`} onClick={()=> setCategory(`كشف`)}>كشف</button>
                        <button aria-label={`جلسة`} onClick={()=> setCategory(`جلسة`)}>جلسة</button>
                          </div>}
                    </div>
           </div>

           <div className="filter-section">
               <h3>الميعاد المتاح</h3>
               <div onClick={()=> setOpenFilterShifts(!openFilterShifts)} className={"dropmenu"}><IoMdArrowDropdown className="icon" /> <p>{filterShift ? filterShift : `الميعاد المتاح`}</p> 

                      {openFilterShifts &&  <div className="dropmenu-list heighted">
                        <button aria-label="أي وقت" onClick={()=> setFilterShifts('')}>أي وقت</button>
                            {
                              category === 'كشف' ? (
                                timeSlots.map((e,key) =>{
                                  return(
    
                                      <button aria-label={`${e.time} ${e.period}`} key={key} onClick={()=> setFilterShifts(`${e.time} ${e.period}`)}>{e.time} {e.period}</button>
    
                                  )
                                })
                              ) : (
                                ShiftsHours.map((e,key) =>{
                                  return(
    
                                      <button aria-label={`${e.time} ${e.period}`} key={key} onClick={()=> setFilterShifts(`${e.time} ${e.period}`)}>{e.time} {e.period}</button>
    
                                  )
                                })
                              )
                            }
                          </div>}
                    </div>
           </div>

           <div className="filter-section">
               <h3>المواعيد الصباحية</h3>
               <label className="switch">
                 <input type="checkbox" checked={isMorningToggled} onChange={()=> setIsMorningToggled(!isMorningToggled)} />
                 <span className="slider"></span>
               </label>
           </div>

           <div className="filter-section">
               <h3>المواعيد المسائية</h3>
               <label className="switch">
                 <input type="checkbox" checked={isNightToggled} onChange={()=> setIsNightToggled(!isNightToggled)} />
                 <span className="slider"></span>
               </label>
           </div>

        </div>
     </div>
    )
}


export default ReservationDoctor;