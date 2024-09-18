
import { FaRegCircleCheck, FaUserDoctor, FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from "react";


const ReservationSteps = ({stepProp}) => {

    const [step, setStep] = useState(stepProp);

    useEffect(() => {
        setStep(stepProp)
    }, [stepProp]);

    return(
        <div className="reservation-steps-container">

                <div className="top">
                    <h1>احجز ميعادك الأن في مركز ريهاب للعلاج الطبيعي والتأهيل</h1>
                    <h3>تعرف على المواعيد المتاحة لدينا وقم بحجز ميعادك لدى دكتورك الخاص</h3>
                    <div className="line"></div>
                </div>

                <div className="steps">

                    <div className="step active">

                        <h2>اختر الدكتور</h2>
                        <FaUserDoctor className="icon" />

                    </div>

                    <div className={step > 0 ? "line active" : "line"}></div>

                    <div className={step > 0 ? "step active" : "step"}>

                        <h2>معلومات الحجز</h2>
                        <FaCircleInfo className="icon" />

                    </div>


                    <div className={step > 1 ? "line active" : "line"}></div>


                    <div className={step > 1 ? "step active" : "step"}>

                        <h2>التأكيد</h2>
                        <FaRegCircleCheck className="icon" />

                    </div>


                </div>


        </div>
    )
}


export default ReservationSteps;