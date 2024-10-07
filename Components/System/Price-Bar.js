
import { useState, useRef, useEffect } from "react";

const PriceBar = ({sendDataToParent}) => {

    const [sessionPrice, setSessionPrice] = useState(350);
    const [examination, setExamination] = useState(500);
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

    return(
        <div ref={divRef} className="price-bar-erp-container">
                <div className="left-price-bar-erp">
                    <button onClick={()=> sendDataToParent('price', false)}>الغاء</button>
                    <button>موافق</button>
                </div>

                <div className="right-price-bar-erp">
                    <div>
                        <input onChange={(s)=> setSessionPrice(s.target.value)} type="number" value={sessionPrice} placeholder="سعر الجلسة"></input>
                        <p>سعر الجلسة</p>
                    </div>
                    <div>
                        <input onChange={(s)=> setExamination(s.target.value)} type="number" value={examination} placeholder="سعر الكشف"></input>
                        <p>سعر الكشف</p>
                    </div>
                </div>
        </div>
    )
}


export default PriceBar;