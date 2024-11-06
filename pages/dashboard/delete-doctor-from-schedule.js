import HeadSystem from "@/Components/System/Head";
import LoadingCircle from "@/Components/Loading-Circle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeleteDoctorFromSchedule = () => {

    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([]);

    const getDoctors = async () => {
        const res = await fetch(`/api/getData?method=get-all-doctors`);
        const data = await res.json();

        if(res.status === 200){
            setDoctors(data.doctors);
            setLoading(false);
        }
    }
    

    useEffect(() => {
        getDoctors()
    }, [])



    const [selectedDoctor, setSelectedDoctor] = useState('');


    const handleDeleteDoctor = async () => {
        const res = await fetch(`/api/editData?method=delete-doctor-from-all-schedule&doctor=${selectedDoctor}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            getDoctors()
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    }
 
    return(
        <div className="delete-doctor-from-schedule system-page">
                <HeadSystem name={`مسح دكتور من الجدول`} />

                <div className="inner-delete-doctor-from-schedule">
                    {
                        loading ? <div className="loading-div-of-doctors"><LoadingCircle providedcolor="#309C53" size={`45px`} /></div>

                        : 

                        <div className="doctors-container-of-delete">
                            <h1>قم بإختيار الدكتور</h1>
                            <div className="radio-doctors">
                                
                                {
                                    doctors.map((e, key) => {
                                        return(
                                        <div className="radio" key={key}>
                                            <input type="radio" name="doctor" value={e.doctor} onChange={(s)=> setSelectedDoctor(s.target.value)} /> <p>{e.doctorName}</p>
                                         </div>
                                        )
                                    })
                                }
                            </div>
                            <button onClick={handleDeleteDoctor}>مسح</button>
                        </div>
                    }
                </div>
        </div>
    )
}



export default DeleteDoctorFromSchedule;