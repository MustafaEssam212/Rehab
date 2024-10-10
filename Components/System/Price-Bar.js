
import { useState, useRef, useEffect } from "react";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";


const PriceBar = ({sendDataToParent}) => {

    const [sessionPrice, setSessionPrice] = useState(0);
    const [examination, setExamination] = useState(0);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const divRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {

                sendDataToParent('price', false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const getValues = async () => {
        const res = await fetch(`/api/ERP?method=get-prices-values`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            setSessionPrice(dataOfResponse.session);
            setExamination(dataOfResponse.examination);
            setDisabled(false);
        }else{
            toast.error(dataOfResponse.message);
        }
    }

    useEffect(()=> {
        getValues();
    }, [])


    const handleSubmit = async () => {
        setLoading(true);

        if(!sessionPrice || !examination){
            toast.warning('برجاء ادخال قيمة صحيحة');
            setLoading(false);
        }else{
            const res = await fetch(`/api/ERP?method=change-session-price-examination-price`, {
                method: 'POST',
                body: JSON.stringify({sessionPrice, examination}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success('تم تغيير القيمة بنجاح');
                getValues();
                setLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setLoading(false);
            }
        }

    }

    return(
        <div ref={divRef} className="price-bar-erp-container">
                <div className="left-price-bar-erp">
                    <button onClick={()=> sendDataToParent('price', false)}>الغاء</button>
                    <button onClick={handleSubmit}>{loading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `موافق`}</button>
                </div>

                <div className="right-price-bar-erp">
                    <div>
                        <input disabled={disabled} onChange={(s)=> setSessionPrice(s.target.value)} type="number" value={sessionPrice} placeholder="سعر الجلسة"></input>
                        <p>سعر الجلسة</p>
                    </div>
                    <div>
                        <input disabled={disabled} onChange={(s)=> setExamination(s.target.value)} type="number" value={examination} placeholder="سعر الكشف"></input>
                        <p>سعر الكشف</p>
                    </div>
                </div>
        </div>
    )
}


export default PriceBar;