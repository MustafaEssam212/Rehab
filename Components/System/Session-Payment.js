

import { useState, useEffect } from "react";
import LoadingCircle from "../Loading-Circle";
import { MdCurrencyExchange } from "react-icons/md";
import { toast } from "react-toastify";

const SessionPayment = () => {

    const [serial, setSerial] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [iconLoading, setIconLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        const res = await fetch(`/api/ERP?method=get-reservation-data&serial=${serial}`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            setSessions(dataOfResponse.sessions);
            setLoading(false);
        }else{
            setSessions([]);
            setLoading(false);
        }
    }

    useEffect(()=> {
        if(serial){
            getData();
        }
    }, [serial])


    const handleSubmit = async () => {
        
        setIconLoading(true);

        const res = await fetch(`/api/ERP?method=update-reservation-payment&serial=${serial}&value=${!sessions[0].paymentStatus}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const dataOfResponse = await res.json();

        if(res.status === 200){
            toast.success(dataOfResponse.message);
            setIconLoading(false);
            getData();
        }else{
            toast.error(dataOfResponse.message);
            setIconLoading(false);
        }
    }

    return(
        <div className="session-payment-container">
            
            <div className="search-bar">
                <div>
                    <input type="number" placeholder="رقم الحجز" onChange={(s)=> setSerial(s.target.value)} value={serial}></input>
                    <p>البحث</p>
                </div>
            </div>

            <div className="sessions-container">


                {
                    loading && sessions.length <= 0 ? <div className="loading-div"><LoadingCircle providedcolor="#309C53" size={`45px`} /></div>

                    :

                    <>
                    
                    {
                        !loading && sessions.length <= 0 ? <div className="loading-div"><p>لا يوجد نتائج</p></div> : <>
                        
                        
                        {
                            sessions.map((e, key) => {
                                return(
                                    <div key={key} className="session-div">

                                        {e.paymentStatus ? <button onClick={handleSubmit} className="paid"><MdCurrencyExchange className={iconLoading ? "icon loading-icon" : 'icon'} /> مدفوع</button> : <button onClick={handleSubmit}><MdCurrencyExchange className={iconLoading ? "icon loading-icon" : 'icon'} /> غير مدفوع</button>}
                                        <p>{e.price}</p>
                                        <p>{e.category}</p>
                                        <p>{e.userNumber}</p>
                                        <p>{e.reservationName}</p>

                                    </div>
                                )
                            })
                        }
                        
                        
                        </>
                    }
                    
                    
                    </>
                }

            </div>

        </div>
    )
}


export default SessionPayment;