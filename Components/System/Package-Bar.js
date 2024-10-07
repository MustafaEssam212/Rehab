import { useState, useRef, useEffect } from "react";

const PackageBar = ({sendDataToParent}) => {

    const [packageData, setPackageData] = useState({
        name: '',
        sessions: null,
        price: null
    })

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

    return(
        <div ref={divRef} className="package-bar-erp-container">
                <div className="left-package-bar-erp">
                    <button onClick={()=> sendDataToParent('package', false)}>الغاء</button>
                    <button>موافق</button>
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