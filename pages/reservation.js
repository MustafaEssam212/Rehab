

import ReservationSteps from "@/Components/Reservation/Reservation-Steps";
import ReservationDoctor from "@/Components/Reservation/Reservation-Doctor";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReservationInfo = dynamic(()=> import('@/Components/Reservation/Reservation-Info'));
const ReservationConfirm = dynamic(()=> import('@/Components/Reservation/Reservation-Confirm'));



const Reservation = () => {

  const [doctorInfo, setDoctorInfo] = useState({});
  const [reservationInfo, setReservationInfo] = useState({});
  const [step, setStep] = useState(0);

    const sendDataToParent = (info) => {
      setDoctorInfo(info);
      setStep(1);
    }

    const sendDataToParentFromInfo = (reservationInfoParam) => {
      setReservationInfo(reservationInfoParam);
      setStep(2);
    }

    const handleStep = (theStep) => {
        setStep(theStep)
    }

    return(
        <div className="reservation-page-container">

                <ReservationSteps stepProp={step} />

                {step === 0 && <ReservationDoctor sendDataToParent={sendDataToParent} />}
                {step === 1 && doctorInfo && <ReservationInfo data={doctorInfo} handleStep={handleStep} sendDataToParent={sendDataToParentFromInfo} />}
                {step === 2 && doctorInfo && reservationInfo && <ReservationConfirm data={{...doctorInfo, ...reservationInfo}} handleStep={handleStep} />}

        </div>
    )
}


export default Reservation;