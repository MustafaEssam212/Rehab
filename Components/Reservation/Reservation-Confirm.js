
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LoadingCircle from "../Loading-Circle";

import { useState, useEffect } from "react";

const ReservationConfirm = ({data, handleStep}) => {

    const router = useRouter();



    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({});

    const getPrices = async () => {
      const res = await fetch(`/api/getData?method=get-prices-and-user-package&userID=${data.userID}`);
      const dataOfResponse = await res.json();

      if(res.status === 200){
        setInfo({
              session: dataOfResponse.session,
              examination: dataOfResponse.examination,
              userPackage: dataOfResponse.package
          });
          setLoading(false);
      }
    }


    useEffect(() => {
        getPrices();
    }, [])




    const handleSubmit = async () => {

        var {img, doctorName, ...neededData} = data;

        neededData.paymentStatus = false;

        if(data.category === 'كشف'){
            neededData.price = info.examination;
        }

        if(data.category === 'جلسة'){
            neededData.price = info.session;
        }

        if(info.userPackage.sessions && data.category !== 'كشف'){
            neededData.paymentStatus = true;
        }

        const res = await fetch(`/api/reservation?method=post-reservation`, {
            method: 'POST',
            body: JSON.stringify(neededData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const dataOfResponse = await res.json();

        if(res.status === 200){
            toast.success(dataOfResponse.message);
            router.push('/profile')
        }else{

            toast.error(dataOfResponse.message)
        }



    }


 

    return(
        <div className="reservation-confirm-page">
            
            <h1>برجاء قم مراجعة معلومات الحجز قبل التأكيد</h1>

    

            {
                loading ? <div className="loading-div"><LoadingCircle providedcolor="#309C53" size={`45px`} /></div> 

                :

                <>
                
                        <div className="confirm-info">
                            <div className="inner-confirm-info">
                                <h3>الدكتور: <span>{data?.doctorName}</span></h3>
                                <h3>الحجز بإسم: <span>{data?.reservationName}</span></h3>
                                <h3>نوع الحجز: <span>{data?.category}</span></h3>
                                <h3>تاريخ الحجز: <span>{data?.date}</span></h3>
                                <h3>موعد الحجز: <span>{data?.reservationTime}</span></h3>
                                {data?.category === 'كشف' && <h3>سعر الكشف: <span>{info.examination} جنية</span></h3>}
                                {data?.category === 'جلسة' && <h3>سعر الجلسة: <span>{info.session} جنية</span></h3>}
                                {
                                    info.userPackage.sessions && data?.category !== 'كشف' ? <h3>حالة الدفع: <span>مدفوعة - سيتم خصمها من الباقة</span></h3> : <h3>حالة الدفع: <span>غير مدفوع</span></h3>
                                }
                                {
                                    info.userPackage.sessions && data?.category !== 'كشف' ? <h3><span>لديك عدد</span> {info.userPackage.sessions} <span>جلسة في الباكيدچ الخاصة بك سيتم خصم منهم عدد</span> 1 <span>جلسة لتصبح</span> {info.userPackage.sessions - 1} <span>عند تأكيد الحجز</span></h3> : <h3>سيتم الدفع عند الحضور في موعد {`ال${data?.category}`}</h3>
                                }
                            </div>
                        </div>

                        <div className="buttons">
                            <button onClick={handleSubmit} aria-label="تأكيد الحجز">تأكيد الحجز</button>
                            <button onClick={()=> handleStep(1)} aria-label="الرجوع">الرجوع</button>
                        </div>
                
                </>

            }



        </div>
    )
}


export default ReservationConfirm;