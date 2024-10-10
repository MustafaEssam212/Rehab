import { useState, useRef, useEffect } from "react";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";

const PackageBar = ({sendDataToParent}) => {

    const [packageData, setPackageData] = useState({
        name: '',
        sessions: null,
        price: null
    });
    const [loading, setLoading] = useState(false);

    const divRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {

                sendDataToParent('package', false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleSubmit = async () => {
        setLoading(true);
        if(!packageData.name || !packageData.sessions || !packageData.price){
            toast.warning('برجاء ادخال المعلومات المطلوبة');
            setLoading(false);
        }else {

            const res = await fetch(`/api/ERP?method=create-new-package`, {
                method: 'POST',
                body: JSON.stringify(packageData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();


            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setPackageData({
                    name: '',
                    price: 0,
                    sessions: 0
                })
                setLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setLoading(false);
            }

        }
    }

    return(
        <div ref={divRef} className="package-bar-erp-container">
                <div className="left-package-bar-erp">
                    <button onClick={()=> sendDataToParent('package', false)}>الغاء</button>
                    <button onClick={handleSubmit}>{loading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `موافق`}</button>
                </div>

                <div className="right-package-bar-erp">
     

                    <div>
                        <input value={packageData.sessions} placeholder="عدد الجلسات" onChange={(s)=> setPackageData({...packageData, sessions: s.target.value})} type="number"></input>
                        <p>عدد الجلسات</p>
                    </div>

                    <div>
                        <input value={packageData.price} placeholder="سعر الباكيدچ" onChange={(s)=> setPackageData({...packageData, price: s.target.value})} type="number"></input>
                        <p>سعر الباكيدچ</p>
                    </div>


                    <div>
                        <input value={packageData.name} placeholder="اسم الباكيدچ" onChange={(s)=> setPackageData({...packageData, name: s.target.value})} type="text"></input>
                        <p>اسم الباكيدچ</p>
                    </div>

                </div>
        </div>
    )
}

export default PackageBar;