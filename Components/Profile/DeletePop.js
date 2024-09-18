import { IoCloseCircle } from "react-icons/io5";
import {useRef, useEffect, useState} from "react";
import LoadingCircle from "../Loading-Circle";
import { toast } from "react-toastify";


const DeletePop = ({sendDataToParent, reservation}) => {

    const popRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the popRef element
            if (popRef.current && !popRef.current.contains(event.target)) {
                sendDataToParent(false); // Close the popup
            }
        };

        // Add event listener to detect clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sendDataToParent]);

    const [btnLoading, setBtnLoading] = useState(false);

    function isReservationValid(reservation) {
        // Get the current date and time
        const currentDate = new Date();

    
        // Parse the reservation date (assuming format is 'dd/mm/yyyy')
        const [day, month, year] = reservation.date.split('/');

    
        // Parse the reservation time, assuming 'صباحاً' means AM and 'مساءً' means PM
        let [time, period] = reservation.reservationTime.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        // Handle cases where minutes are undefined (like "5 مساءً" without the minutes part)
        if (isNaN(minutes)) {
            minutes = 0; // Default to 0 minutes if not provided
        }

    
        // Convert to 24-hour format
        if (period === "مساءً" && hours < 12) {
            hours += 12; // Convert PM to 24-hour format
        } else if (period === "صباحاً" && hours === 12) {
            hours = 0; // Handle 12 AM case
        }

    
        // Create a Date object for the reservation date and time
        const reservationDate = new Date(year, month - 1, day, hours, minutes);

    
        // Check if the reservation date has passed
        if (currentDate > reservationDate) {

            return false; // Reservation has passed
        }
    
        // If the date is today, check the time
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
    
        if (currentDay === +day && currentMonth === month - 1 && currentYear === +year) {
            // Get the current time in milliseconds and reservation time in milliseconds
            const currentTimeInMs = currentDate.getTime();
            const reservationTimeInMs = reservationDate.getTime();
    
            // Check if the current time is within 1 hour of the reservation time
            const oneHourBeforeReservation = reservationTimeInMs - 60 * 60 * 1000;
    
            if (currentTimeInMs >= oneHourBeforeReservation) {

                return false; // Reservation is invalid if within 1 hour of the due time
            }
        }

        return true;
    }


      const handleDelete = async () => {
        setBtnLoading(true);

        const res = await fetch(`/api/editData?method=delete-reservation&date=${reservation.date}&deletedReservationSerial=${reservation.reservationSerial}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const dataOfResponse = await res.json();

        if(res.status === 200){
            setBtnLoading(false);
            toast.success(dataOfResponse.message);
            sendDataToParent(false, 'Yes');
        }else{
            setBtnLoading(false);
            toast.error(dataOfResponse.message);
        }

      }

    return(
        <div className="delete-pop-reservation reservation-pop">
            <div ref={popRef} className="inner-reservation-pop">
                <div className="head-reservation-pop">
                    <button aria-label="غلق" onClick={()=> sendDataToParent(false)}><IoCloseCircle className="icon" /></button>
                    <h1>مسح الحجز</h1>
                </div>

                {
                    isReservationValid(reservation) ? <div className="body-reservation-pop">
                    <h1>هل ترغب في حذف الحجز؟</h1>
                    <div className="buttons-delete-pop">
                        <button onClick={()=> sendDataToParent(false)} aria-label="لا">لا</button>
                        <button onClick={handleDelete} aria-label="نعم">{btnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `نعم`}</button>
                    </div>
                </div> :  <div className="alert-pop">
                    <h1>لا يمكن اجراء تعديل على ميعاد حجز انقضى بالفعل</h1>
                </div>
                }



            </div>
        </div>
    )
}


export default DeletePop;