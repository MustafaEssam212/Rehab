

export default function filterShifts(dateString, shiftsPureArray, startShiftTime, endShiftTime, reservationArr, reservationType, doctorType){




    const getShiftsArrayAfterSliceShiftsPeriods = (shiftsArr, startTime, endTime) => {

        const convertTo24Hour = (time, period) => {
            let [hours, minutes] = time.includes(":") ? time.split(":") : [time, "00"];
            hours = parseInt(hours);
        
            if (period === "مساءً" && hours !== 12) {
              hours += 12;
            } else if (period === "صباحاً" && hours === 12) {
              hours = 0; // 12 AM case
            }
        
            // Return the time in "HH:mm" 24-hour format
            return `${hours.toString().padStart(2, "0")}:${minutes}`;
          };
        
          // Parse start and end times
          const [startShift, startPeriod] = startTime.split(" ");
          const [endShift, endPeriod] = endTime.split(" ");
          const start = convertTo24Hour(startShift, startPeriod);
          const end = convertTo24Hour(endShift, endPeriod);
        
          // Filter shiftsPureArray based on the time range
          return shiftsArr.filter(({ time, period }) => {
            const shiftTime = typeof time === "string" ? time : `${time}:00`;
            const shift24Hour = convertTo24Hour(shiftTime, period);
            return shift24Hour >= start && shift24Hour <= end;
          });
    }

 

    const isToday = (date) => {
        // Convert the dateString (e.g., "14/9/2024") to a Date object
        const [day, month, year] = date.split('/').map(Number);
        const someDate = new Date(year, month - 1, day); // months are zero-based
      
        // Get today's date
        const today = new Date();
      
        // Check if the parsed date is today
        return (
          someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear()
        );
    };

    const handleTodayShifts = (shifts) => {
        const currentDate = new Date();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
    
        // Filter out shifts that are in the past if today is selected
        return shifts.filter(shift => {
            let [hours, minutes] = shift.time.toString().split(':').map(Number);
            
            // Handle half-hour shifts (like 9:30)
            if (!minutes) minutes = 0;
    
            // Convert AM/PM to 24-hour format
            if (shift.period === "مساءً" && hours < 12) {
                hours += 12;
            } else if (shift.period === "صباحاً" && hours === 12) {
                hours = 0; // Midnight special case
            }
    
            // Only keep shifts that are in the future
            return hours > currentHours || (hours === currentHours && minutes > currentMinutes);
        });
    };


    const filterPeriods = (periods, reservations, type, doctor) => {
        const convertTimeToMinutes = (time, period) => {
            let [hours, minutes] = time.toString().split(":").map(Number);
            if (isNaN(minutes)) minutes = 0; // Handle times like 9 instead of 9:00 or 9:30
            if (period === "مساءً" && hours !== 12) hours += 12; // Convert PM to 24-hour format
            return hours * 60 + minutes;
        };
    
        // Filter out periods that are already reserved
        periods = periods.filter(period => {
            const timeString = `${period.time} ${period.period}`;
            return !reservations.some(reservation => reservation.reservationTime === timeString);
        });
    
        let filteredPeriods = [];
        
        const isAvailable = (timeInMinutes, reservations, category, duration) => {
            return !reservations.some(reservation => {
                const [reservationTime, reservationPeriod] = reservation.reservationTime.split(" ");
                const reservationInMinutes = convertTimeToMinutes(reservationTime, reservationPeriod);
                if (reservation.category === category) {
                    return Math.abs(reservationInMinutes - timeInMinutes) < duration;
                }
                return false;
            });
        }
        
        // Get all previous 'كشف' reservations and their times in minutes
        const previousKashfReservations = reservations
            .filter(reservation => reservation.category === "كشف")
            .map(reservation => convertTimeToMinutes(reservation.reservationTime.split(" ")[0], reservation.reservationTime.split(" ")[1]));
    
        periods.forEach(period => {
            const timeInMinutes = convertTimeToMinutes(period.time, period.period);
            
            if (doctor === "كشف") {
                if (type === "كشف" && isAvailable(timeInMinutes, reservations, "كشف", 30)) {
                    filteredPeriods.push(period);
                }
            } else if (doctor === "جلسات") {
                if (type === "جلسة" && isAvailable(timeInMinutes, reservations, "جلسة", 60)) {
                    filteredPeriods.push(period);
                }
            } else if (doctor === "كشف وجلسات") {
                if (type === "جلسة") {
                    // Check availability for جلسة
                    if (isAvailable(timeInMinutes, reservations, "جلسة", 60)) {
                        filteredPeriods.push(period);
                    }
    
                    // Remove previous 'كشف' reservations within 30 minutes
                    filteredPeriods = filteredPeriods.filter(p => {
                        const currentPeriodInMinutes = convertTimeToMinutes(p.time, p.period);
                        return !previousKashfReservations.some(reservationInMinutes => {
                            return currentPeriodInMinutes >= reservationInMinutes - 30 && currentPeriodInMinutes < reservationInMinutes; // Remove if within 30 min before a reservation
                        });
                    });
                } else if (type === "كشف") {
                    if (isAvailable(timeInMinutes, reservations, "كشف", 30)) {
                        filteredPeriods.push(period);
                    }
                }
            }
        });
    
        return filteredPeriods;
    };
    
   


    if(isToday(dateString)){
        
        return filterPeriods(handleTodayShifts(getShiftsArrayAfterSliceShiftsPeriods(shiftsPureArray, startShiftTime, endShiftTime)), reservationArr, reservationType, doctorType)
    }else{
        return filterPeriods(getShiftsArrayAfterSliceShiftsPeriods(shiftsPureArray, startShiftTime, endShiftTime), reservationArr, reservationType, doctorType)
    }

     
}