
import HeadSystem from "@/Components/System/Head";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingCircle from "@/Components/Loading-Circle";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('اضافة دكتور')) {

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


const AddDoctor = () => {


    const coverInputRef = useRef();
    const [data, setData] = useState({
        name: '',
        coverPicture: ''
    });


    const [coverPreviewURL, setCoverPreviewURL] = useState('');



    useEffect(() => {
        if (data.coverPicture) {
            const coverPictureUrl = URL.createObjectURL(data.coverPicture);
            setCoverPreviewURL(coverPictureUrl);
        }else{
            setCoverPreviewURL('');
        }
    }, [data.coverPicture])


    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if(!data.name || !data.coverPicture){
            toast.warning('من فضلك قم بإدخال المعلومات المطلوبة')
        }else{
            setLoading(true);
            const formData = new FormData();
            formData.append('cover', data.coverPicture);
            formData.append('name', data.name)

            const res = await fetch(`/api/upload?method=add-doctor`, {
                method: 'POST',
                body: formData,
            });

            const dataOfResponse = await res.json();

            if(res.status !== 200){
                toast.error(dataOfResponse.message);
                setData({
                    name: '',
                    coverPicture: ''
                });
                setCoverPreviewURL('');
                setLoading(false);
            }else{
                toast.success(dataOfResponse.message);
                setData({
                    name: '',
                    coverPicture: ''
                });
                setCoverPreviewURL('');
                setLoading(false);
            }
        }
    }


    return(
        <div className="add-doctor-page system-page">
            <HeadSystem name={`اضافة دكتور`} />

            <div className="doctor-container">

                    <div className="left">

                        <h1>صورة غلاف</h1>
                        <div onClick={()=> coverInputRef.current.click()} className="cover-picture">
                            <button aria-label="وضع صورة غلاف"><FaPlus className="icon" /></button>
                            {coverPreviewURL && <div className="img-preview"><Image src={coverPreviewURL} fill  alt="Image"></Image></div>}
                        </div>
                        <input accept="image/*" onChange={(s)=> setData({...data, coverPicture: s.target.files[0]})} ref={coverInputRef} type="file" aria-label="وضع صورة غلاف" placeholder="add"></input>




                    </div>  


                    <div className="right">
                        <h1>معلومات الدكتور</h1>
              
                        <div className="inputs-container">
                            <input type="text" value={data.name} placeholder="اسم الدكتور" onChange={(s)=> setData({...data, name: s.target.value})} onBlur={() => setData({ ...data, name: data.name.trim() })}></input>
                        </div>

                        {loading ? <button style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><LoadingCircle providedcolor="white" size={`25px`} /></button> : <button aria-label="اضافة" onClick={handleSubmit}>اضافة</button>}
                    </div>
            </div>
        </div>
    )
}


export default AddDoctor;