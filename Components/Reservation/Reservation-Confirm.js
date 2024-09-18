
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const ReservationConfirm = ({data, handleStep}) => {

    const router = useRouter();

    const handleSubmit = async () => {

        var {img, doctorName, ...neededData} = data;

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

            <div className="confirm-info">
                <h3>الدكتور: <span>{data?.doctorName}</span></h3>
                <h3>الحجز بإسم: <span>{data?.reservationName}</span></h3>
                <h3>نوع الحجز: <span>{data?.category}</span></h3>
                <h3>تاريخ الحجز: <span>{data?.date}</span></h3>
                <h3>ميعاد الحجز: <span>{data?.reservationTime}</span></h3>
            </div>

            <div className="buttons">
            <button onClick={handleSubmit} aria-label="تأكيد الحجز">تأكيد الحجز</button>
            <button onClick={()=> handleStep(1)} aria-label="الرجوع">الرجوع</button>
            </div>

        </div>
    )
}


export default ReservationConfirm;