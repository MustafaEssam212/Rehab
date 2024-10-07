
import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import LoadingCircle from "@/Components/Loading-Circle";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
import HeadSystem from "@/Components/System/Head";



export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('مسح دكتور')) {

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

const RemoveDoctor = () => {

    const [doctors, setDoctors] = useState([]);
    const [doctor, setDoctor] = useState(0);
    const [openDoctorsList, setOpenDoctorsList] = useState(false);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        const res = await fetch(`/api/getData?method=get-doctors-list`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            setDoctors(dataOfResponse.list);
        }else{
            toast.error(dataOfResponse.message);
        }
    }

    useEffect(()=> {
        getData();
    }, [])


    const handleDelete = async () => {
        setLoading(true);

        if(!doctor){
            toast.warning('برجاء اختيار الدكتور اولاً');
            setLoading(false);
        }else{

            const res = await fetch(`/api/editData?method=delete-doctor&doctor=${doctor}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setDoctor(0);
                getData();
                setLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setLoading(false);
            }

        }
    }

    return(
        <div className="remove-doctor-container system-page">

                <HeadSystem name={`مسح دكتور`} />

                <div className="inner-remove-doctor">

                    <h1>برجاء اختيار الدكتور المراد حذفه</h1>
                    <div onClick={() => setOpenDoctorsList(!openDoctorsList)} className="dropmenu">
                      <IoMdArrowDropdown className="icon" />
                      <p>{doctor ? doctors.find((e)=> {return e.serial === doctor}).name : 'قم بإختيار الدكتور'}</p>
                      {openDoctorsList && (
                        <div className="dropmenu-list heighted">
                            {
                                doctors.map((e, key) => {
                                    return(
                                        <button key={key} onClick={() => setDoctor(e.serial)}>{e.name}</button>
                                    )
                                })
                            }
                        </div>
                      )}
                    </div>
                    <button className="main-btn" onClick={handleDelete}>{loading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `مسح`}</button>


                </div>

        </div>
    )
}


export default RemoveDoctor;