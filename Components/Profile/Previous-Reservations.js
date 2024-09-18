import { IoTicket } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import LoadingCircle from "../Loading-Circle";
import { getSession } from "next-auth/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";
import dynamic from "next/dynamic";


const EditPop = dynamic(() => import('@/Components/Profile/EditPop'));
const DeletePop = dynamic(() => import('@/Components/Profile/DeletePop'));

const PreviousReservations = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [index, setIndex] = useState(0);
    const [openDeletePop, setOpenDeletePop] = useState(false);
    const [openEditPop, setOpenEditPop] = useState(false);
    const [reservation, setReservation] = useState({});

    const editRef = useRef();


    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // month is 0-based in JavaScript Date
    };

    const getData = async () => {
        const session = await getSession();

        const res = await fetch(`/api/getData?method=get-my-reservations&userID=${session.user.id}`);
        const dataOfResponse = await res.json();
        if(dataOfResponse){
            const sortedReservations = await dataOfResponse.reservations.sort((a, b) => parseDate(a.date) - parseDate(b.date));
            setData(sortedReservations);
            setLoading(false);
        }

    }

    useEffect(() => {
        getData()
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editRef.current && !editRef.current.contains(event.target)) {
                setOpenEdit(false);
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOpenEdit]);


    const dataFromDeletePop = (param, reload = 'No') => {
        setOpenDeletePop(param);
        if(reload === 'Yes'){
            getData();
        }
    }


    const dataFromEditPop = (param, reload = 'No') => {
        setOpenEditPop(param);
        if(reload === 'Yes'){
            getData();
        }
    }

    return(
        <div className="previous-reservation-container profile-component">
            <h1>حجوزاتي <IoTicket className="icon" /></h1>
            {openDeletePop && <DeletePop sendDataToParent={dataFromDeletePop} reservation={reservation} />}
            {openEditPop && <EditPop sendDataToParent={dataFromEditPop} reservation={reservation} />}
            <div className="reservations-container">

  
            
                    {loading && data.length === 0 && <div className="loading"><LoadingCircle providedcolor="#309C53" size={`45px`} /></div>} 

                    {!loading && data.length === 0 && <p className="alert-parag">لا يوجد حجوزات </p>}
         

                    {
                        !loading && data.length > 0 && <>
                        
                        
                        {
                            data.map((e, key) => {
                                return(
                                    <div key={key} className={"doctor"}>

                                        <div className="edit-reservation">
                                            <button onClick={()=> {setIndex(key); setOpenEdit(true)}} aria-label="تعديل الحجز" className="ellipsis-btn"><FaEllipsisVertical style={openEdit && index === key ? {color: 'black'} : {}} className="icon" /></button>

                                            {
                                                index === key && openEdit && <div ref={editRef} className="inner-edit-choices">
                                                    <button onClick={()=> {setReservation(e); setOpenEditPop(true); setOpenEdit(false);}} aria-label="تعديل ميعاد الحجز"><FaEdit className="icon" /> تعديل ميعاد الحجز</button>
                                                    <button onClick={()=> {setReservation(e); setOpenDeletePop(true); setOpenEdit(false);}} aria-label="حذف الحجز"><FaTrash className="icon" /> حذف الحجز</button>
                                                </div>
                                            }
                                        </div>

                                        <div className="info">
                                            <h4>الميعاد</h4>
                                            <h5>{e.reservationTime}</h5>
                                        </div>
                                        <div className="info">
                                            <h4>التاريخ</h4>
                                            <h5>{e.date}</h5>
                                        </div>
                                        <div className="info">
                                            <h4>الحجز</h4>
                                            <h5>{e.category}</h5>
                                        </div>
                                        <div className="info">
                                            <h4>الإسم</h4>
                                            <h5><span>دكتور</span> {e.doctorName}</h5>
                                        </div>
                                        <div className="img-container"><Image  src={`/api/getImage?method=get-doctor-image&doctor=${e.doctor}&image=${e.doctorCover}`} fill alt="دكتور في مركز ريهاب للعلاج الطبيعي والتأهيل" loading="lazy" ></Image></div>
                                    </div>
                                )
                            })
                        }
                        
                        
                        </>
                    }
            </div>
        </div>  
    )
}


export default PreviousReservations;