import dbConnect from "@/utils/dbConnect";
import Schedule from "@/Models/Schedule";
import ContactMessage from "@/Models/ContactMessage";
import User from "@/Models/User";
import { compare } from 'bcryptjs';
import bcrypt from 'bcryptjs';
import Blog from "@/Models/Blog";
import path from 'path';
import fs from 'fs'
import Review from "@/Models/Review";
import Work from "@/Models/Work";
import Doctor from "@/Models/Doctor";

export default async function EditData(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        if (req.query.way === 'dashboard' && req.query.method === 'addToSchedule') {
           
            const getTheScheduleDay = await Schedule.findOne({ date: req.body.date });

            // the day already submitted before
            if (getTheScheduleDay) {
                try {
                    const searchAboutDoctor = await Schedule.findOne({
                        date: req.body.date,
                        doctors: { $elemMatch: { doctor: req.body.doctor } }
                    });

                    // The doctor already exists
                    if (searchAboutDoctor) {
                        if (req.body.vacation === false) {
                            const updateDoctor = await Schedule.updateOne(
                                { date: req.body.date, "doctors.doctor": req.body.doctor },
                                { $set: {
                                    "doctors.$.shiftStartsFrom": req.body.shiftStartsFrom,
                                    "doctors.$.shiftEndsIn": req.body.shiftEndsIn,
                                    "doctors.$.vacation": req.body.vacation,
                                    "doctors.$.category": req.body.category,
                                    "doctors.$.specializedIn": req.body.specializedIn
                                }}
                            );
                            if (updateDoctor.modifiedCount > 0) {
                                return res.status(200).send({message: 'تم تعديل الدكتور بنجاح'})
                            } else {
                                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                            }
                        } else {

                            const updateDoctor = await Schedule.updateOne(
                                { date: req.body.date, "doctors.doctor": req.body.doctor },
                                { $set: {
                                    "doctors.$.shiftStartsFrom": '',
                                    "doctors.$.shiftEndsIn": '',
                                    "doctors.$.vacation": req.body.vacation
                                }}
                            );
                            if (updateDoctor.modifiedCount > 0) {
                                return res.status(200).send({message: 'تم تعديل الدكتور بنجاح'})
                            } else {
                                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                            }
                        }
                    }

                    // Doctor does not exist
                    else {
                        const { date, ...doctor } = req.body;
                        doctor.reservations = [];
                        const updateDoctor = await Schedule.updateOne(
                            { date: req.body.date },
                            { $push: { doctors: doctor } }
                        );
                        if (updateDoctor.modifiedCount > 0) {
                            return res.status(200).send({message: 'تم اضافة الدكتور بنجاح'})
                        } else {
                            return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                        }
                    }

                } catch (error) {

                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
            }

            // new day will submit
            else {
                try {
                    const newDay = new Schedule({
                        date: req.body.date
                    });
                    await newDay.save();
                    const { date, ...doctor } = req.body;
                    doctor.reservations = [];
                    const updateDoctor = await Schedule.updateOne(
                        { date: req.body.date },
                        { $push: { doctors: doctor } }
                    );
                    if (updateDoctor.modifiedCount > 0) {
                        return res.status(200).send({message: 'تم اضافة الدكتور بنجاح'})
                    } else {
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
            }
        }

        else if(req.query.method === 'add-new-reservation'){
            try {
                
       
                const newReservation = {
                    reservationName: req.body.nameOfNewReversation,
                    reservationTime: req.body.newReversationPeriod,
                    reservationSerial: Math.floor(100000000 + Math.random() * 900000000),
                    userNumber: req.body.userNumber,
                    category: req.body.category
                }
           

                const result = await Schedule.updateOne(
                    { date: req.body.inputDate, "doctors.doctor": parseInt(req.body.doctor) }, // Query to find the specific doctor by date and doctorId
                    {
                      $push: { "doctors.$.reservations": newReservation } // Push the new reservation to the reservations array
                    }
                  );
              
                  if (result.nModified === 0) {
                    return res.status(500).send({message: `حدث خطأ اثناء تنفيذ العملية`})
                  } else {
                    return res.status(200).send({message: 'تم اضافة الحجز بنجاح'})
                  }


            } catch (error) {
                return res.status(500).send({message: `حدث خطأ اثناء تنفيذ العملية`})
            }
        }

        else if(req.query.method === 'send-contact-message'){
            try {
                

                function formatDate(date) {
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // getMonth() is zero-based
                    const year = date.getFullYear();
                    
                    return `${day}-${month}-${year}`;
                }

                const message = {
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phone,
                    subject: req.body.subject,
                    message: req.body.message,
                    date: formatDate(new Date())
                }


                const newMessage = new ContactMessage(message);
                newMessage.save();
                return res.status(200).send({message: 'تم ارسال رسالتك بنجاح'})

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'change-password'){
            try {


                if(!req.query.id || !req.body.password || !req.body.prePassword || !req.body.confirmPassword){
                    return res.status(400).send({message: 'المعلومات المطلوبة غير مكتملة'})
                }else{
    
                    if(req.body.password.length <= 7){
                        return res.status(400).send({message: 'برجاء ادخال كلمة مرور اكبر من 7 احرف او ارقام'})
                    }
    
                    else if(req.body.password !== req.body.confirmPassword){
                        return res.status(400).send({message: 'تأكيد كلمة المرور يجب ان تطابق مع كلمة المرور'})
                    }
    
                    else{
    
                        const findUser = await User.findOne({_id: req.query.id});
    
                        if(findUser){
    
                            const isValid = await compare(req.body.prePassword, findUser.password);
                            if(isValid){
    
                                const salt = await bcrypt.genSalt(10);
                                const hash = await bcrypt.hash(req.body.password, salt);
                                const updateUser = await User.updateOne({_id: req.query.id}, {$set: {password: hash}});
                                if(updateUser){
                                    return res.status(200).send({message: 'تم تغيير كلمة المرور بنجاح'})
                                }else{
                                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                                }
    
                            }else{
    
                                return res.status(400).send({message: 'كلمة المرور القديمة غير صحيحة'})
    
                            }
    
                        }else{
    
                            return res.status(404).send({message: 'حدث خطأ برجاء المحاولة لاحقاً'})
    
                        }
    
                    }
    
                }


                
            } catch (error) {
                console.log(error)
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'forgot-password-change-password'){
            try {

                if(!req.query.email){
                    return res.status(400).send({message: 'برجاء ادخال المعلومات المطلوبة'})
                }else if(req.body.password !== req.body.confirmPassword){
                    return res.status(400).send({message: 'تأكيد كلمة المرور غير متطابقة مع كلمة المرور'})
                }else if(req.body.password.length <= 7){
                    return res.status(400).send({message: 'برجاء ادخال كلمة مرور اكبر من 7 احرف او ارقام'})
                }else{

                    const checkUser = await User.findOne({email: req.query.email});

                    if(checkUser){
                        const salt = await bcrypt.genSalt(10);
                        const hash = await bcrypt.hash(req.body.password, salt);
                        const updateUser = await User.updateOne({email: req.query.email}, {$set: {password: hash}});

                        if(updateUser){
                            return res.status(200).send({message: 'تم تغيير كلمة المرور بنجاح'})
                        }else{
                            return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                        }

                    }else{
                        return res.status(404).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }

                }
                
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if (req.query.method === 'add-monthly-schedule') {
            try {
                const monthsInArabic = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", 
                                        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        
                const monthIndex = monthsInArabic.indexOf(req.body.month);
        
                if (monthIndex === -1) {
                    return res.status(400).send({ message: 'الشهر غير صحيح' });
                }
        
                const year = new Date().getFullYear();
        
                // Get the number of days in the given month and year
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Last day of the month
        
                // Map Arabic day names to their numeric equivalents
                const daysMapping = {
                    'الاحد': 0,
                    'الاثنين': 1,
                    'الثلاثاء': 2,
                    'الاربعاء': 3,
                    'الخميس': 4,
                    'الجمعة': 5,
                    'السبت': 6,
                };
        
                // Get the selected days from the request body
                const selectedDays = req.body.days.map(day => daysMapping[day]).filter(day => day !== undefined);
        
                if (selectedDays.length === 0) {
                    return res.status(400).send({ message: 'لا توجد أيام صحيحة' });
                }
        
                // Loop over all days in the month
                for (let day = 1; day <= daysInMonth; day++) {
                    const currentDay = new Date(year, monthIndex, day).getDay(); // Get the day of the week
        
                    // Only process the days that match the selected days
                    if (selectedDays.includes(currentDay)) {
                        // Format the date as "D/M/YYYY"
                        const date = `${day}/${monthIndex + 1}/${year}`;
        
                        // Check if the day already exists
                        const getTheScheduleDay = await Schedule.findOne({ date });
        
                        // Day exists in the schedule
                        if (getTheScheduleDay) {
                            const searchAboutDoctor = await Schedule.findOne({
                                date: date,
                                doctors: { $elemMatch: { doctor: req.body.doctor } }
                            });
        
                            // The doctor already exists for this day
                            if (searchAboutDoctor) {
                                if (req.body.vacation === false) {
                                    await Schedule.updateOne(
                                        { date: date, "doctors.doctor": req.body.doctor },
                                        {
                                            $set: {
                                                "doctors.$.shiftStartsFrom": req.body.shiftStartsFrom,
                                                "doctors.$.shiftEndsIn": req.body.shiftEndsIn,
                                                "doctors.$.vacation": req.body.vacation,
                                                "doctors.$.category": req.body.category,
                                                "doctors.$.specializedIn": req.body.specializedIn
                                            }
                                        }
                                    );
                                } else {
                                    await Schedule.updateOne(
                                        { date: date, "doctors.doctor": req.body.doctor },
                                        {
                                            $set: {
                                                "doctors.$.shiftStartsFrom": '',
                                                "doctors.$.shiftEndsIn": '',
                                                "doctors.$.vacation": req.body.vacation
                                            }
                                        }
                                    );
                                }
                            }
                            // Doctor does not exist, add to day
                            else {
                                const { month, ...doctor } = req.body;
                                doctor.reservations = [];
                                await Schedule.updateOne(
                                    { date: date },
                                    { $push: { doctors: doctor } }
                                );
                            }
                        }
                        // Day does not exist, create new day and add doctor
                        else {
                            const newDay = new Schedule({ date: date });
                            await newDay.save();
        
                            const { month, ...doctor } = req.body;
                            doctor.reservations = [];
                            await Schedule.updateOne(
                                { date: date },
                                { $push: { doctors: doctor } }
                            );
                        }
                    }
                }
        
                return res.status(200).send({ message: 'تم اضافة الجدول الشهري بنجاح' });
        
            } catch (error) {
                console.error(error); // Log the error for debugging
                return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
            }
        }
        

        else if(req.query.method === 'switch-reservation'){
           
            try {
                
                if(!req.query.date || !req.body.firstReservationNum || !req.body.secondReservationNum){
                    return res.status(400).send({message: 'برجاء ارسال المعلومات المطلوبة'})
                }else{

                    const findReservations = await Schedule.aggregate([
                        { 
                          $unwind: "$doctors" 
                        },
                        { 
                          $unwind: "$doctors.reservations" 
                        },
                        { 
                          $match: { 
                            "date": req.query.date,  // Filter by date
                            "doctors.reservations.reservationSerial": { 
                              $in: [parseInt(req.body.firstReservationNum), parseInt(req.body.secondReservationNum)] 
                            } 
                          } 
                        },
                        {
                          $project: {
                            doctorName: "$doctors.doctorName",
                            doctorSerial: "$doctors.doctor",
                            reservationName: "$doctors.reservations.reservationName",
                            reservationTime: "$doctors.reservations.reservationTime",
                            reservationSerial: "$doctors.reservations.reservationSerial"
                          }
                        }
                      ]);


                   if(findReservations.length === 2){

                        
                        if(findReservations[0].doctorName !== findReservations[1].doctorName){
                            return res.status(400).send({message: 'لا يمكن تغيير ميعاد حجوزات لدكتورين متخلفين'})
                        }else{


                            const newReservationTimeForFirstReservationNum = findReservations[1].reservationTime;
                            const newReservationTimeForSecondReservationNum = findReservations[0].reservationTime;
                            const doctorSerial = findReservations[0].doctorSerial;
                         

                            const updateFirstReservationNum = await Schedule.updateOne(
                                {
                                    date: req.query.date,
                                    "doctors.doctor": doctorSerial,
                                    "doctors.reservations.reservationSerial": parseInt(req.body.firstReservationNum)
                                },
                                {
                                    $set: {
                                        "doctors.$[doctor].reservations.$[reservation].reservationTime": newReservationTimeForFirstReservationNum
                                    }
                                },
                                {
                                    arrayFilters: [
                                        { "doctor.doctor": doctorSerial },
                                        { "reservation.reservationSerial": parseInt(req.body.firstReservationNum) }
                                    ]
                                }
                            );

                            const updateSecondReservationNum = await Schedule.updateOne(
                                {
                                    date: req.query.date,
                                    "doctors.doctor": doctorSerial,
                                    "doctors.reservations.reservationSerial": parseInt(req.body.secondReservationNum)
                                },
                                {
                                    $set: {
                                        "doctors.$[doctor].reservations.$[reservation].reservationTime": newReservationTimeForSecondReservationNum
                                    }
                                },
                                {
                                    arrayFilters: [
                                        { "doctor.doctor": doctorSerial },
                                        { "reservation.reservationSerial": parseInt(req.body.secondReservationNum) }
                                    ]
                                }
                            );

                            if(updateFirstReservationNum.modifiedCount > 0 && updateSecondReservationNum.modifiedCount > 0){
                                return res.status(200).send({message: 'تم تبديل الحجوزات بنجاح'})
                            }else{
                                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                            }
                        }



                   }else{
                    
                    return res.status(400).send({message: `رقم الحجوزات غير صحيح او التاريخ غير صحيح`})

                   }


                }

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }


        }

        else if(req.query.method === 'give-user-permissions'){

            if(!req.body || !req.query.email){
                return res.status(400).send({message: 'برجاء ملئ المعلومات المطلوبة'})
            }else{

                try {

                    if(req.body.length <= 0){
                        const updateUser = await User.updateOne({email: req.query.email}, {$set: {permissions: [], role: 'regular'}});

                        if(updateUser.modifiedCount > 0){
                            return res.status(200).send({message: 'تم اعطاء الصلاحيات بنجاح'})
                        }else{
                            return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                        }
                    }else{
                        const updateUser = await User.updateOne({email: req.query.email}, {$set: {permissions: req.body, role: 'admin'}});

                        if(updateUser.modifiedCount > 0){
                            return res.status(200).send({message: 'تم اعطاء الصلاحيات بنجاح'})
                        }else{
                            return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                        }
                    }



                } catch (error) {
                    console.log(error);
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }

            }

        }

    }

    else if(req.method === 'DELETE'){
       
        if(req.query.method === 'delete-reservation'){

            console.log('here')
            try {
              
                const deleteReservation = await Schedule.updateOne(
                    { date: req.query.date, "doctors.reservations.reservationSerial": parseInt(req.query.deletedReservationSerial) },
                    { $pull: { "doctors.$.reservations": { reservationSerial: parseInt(req.query.deletedReservationSerial) } } }
                  );

                  if(deleteReservation){
                    return res.status(200).send({message: 'تم حذف الحجز بنجاح'})
                  }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                  }

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'delete-blog'){
                try {
                const folderPath = path.join(process.cwd(), `./uploads/blogs/${req.query.blogName.replace(/ /g, "_")}`);
                

                if (fs.existsSync(folderPath)) {
                    try {
         
                      await fs.promises.rm(folderPath, { recursive: true, force: true });
                      const deleteBlog = await Blog.deleteOne({ name: req.query.blogName });
          
                      if (deleteBlog.deletedCount > 0) {
                        return res.status(200).send({ message: 'تم حذف المدونة بنجاح' });
                      } else {
                        return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                      }
                    } catch (err) {
                      return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                    }
                  } else {
                    return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                  }


              } catch (error) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
              }
        }

        else if(req.query.method === 'delete-review'){
            try {
                const folderPath = path.join(process.cwd(), `./uploads/reviews/${req.query.reviewName.replace(/ /g, "_")}`);
                

                if (fs.existsSync(folderPath)) {
                    try {
         
                      await fs.promises.rm(folderPath, { recursive: true, force: true });
                      const deleteBlog = await Review.deleteOne({ name: req.query.reviewName });
          
                      if (deleteBlog.deletedCount > 0) {
                        return res.status(200).send({ message: 'تم حذف العمل بنجاح' });
                      } else {
                        return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                      }
                    } catch (err) {
                      return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                    }
                  } else {
                    return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                  }


              } catch (error) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
              }
        }

        else if(req.query.method === 'delete-previous-work'){
            try {
                const folderPath = path.join(process.cwd(), `./uploads/works/${req.query.previousWork.replace(/ /g, "_")}`);
                

                if (fs.existsSync(folderPath)) {
                    try {
         
                      await fs.promises.rm(folderPath, { recursive: true, force: true });
                      const deleteBlog = await Work.deleteOne({ name: req.query.previousWork });
          
                      if (deleteBlog.deletedCount > 0) {
                        return res.status(200).send({ message: 'تم حذف العمل بنجاح' });
                      } else {
                        return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                      }
                    } catch (err) {
                      return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                    }
                  } else {
                    return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                  }


              } catch (error) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
              }
        }

        else if(req.query.method === 'delete-doctor'){
            try {
                
                const deleteDoctor = await Doctor.deleteOne({serial: parseInt(req.query.doctor)});

                if(deleteDoctor.deletedCount > 0){
                    return res.status(200).send({message: 'تم حذف الدكتور بنجاح'})
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

    }

    else if(req.method === 'PUT'){
   
        if(req.body.method === 'update-reservation-date'){
            try {
              const result = await Schedule.updateOne(
                {
                    date: req.body.date,
                    "doctors.doctor": parseInt(req.body.doctorSerial),
                    "doctors.reservations.reservationSerial": parseInt(req.body.reservationSerial)
                },
                {
                    $set: {
                        "doctors.$[doctor].reservations.$[reservation].reservationTime": req.body.newReservationTime
                    }
                },
                {
                    arrayFilters: [
                        { "doctor.doctor": parseInt(req.body.doctorSerial) },
                        { "reservation.reservationSerial": parseInt(req.body.reservationSerial) }
                    ]
                }
            );
    
            if(result){
                return res.status(200).send({message: `تم تعديل ميعاد الحجز بنجاح`})
            }else{
                return res.status(500).send({message: `حدث خطأ اثناء تنفيذ العملية`})
            }
          

            } catch (error) {
                return res.status(500).send({message: `حدث خطأ اثناء تنفيذ العملية`})
            }
        }

        else if(req.body.method === 'update-user-data'){
            try {

                const searchAboutPhoneNumber = await User.findOne({phoneNumber: req.body.phoneNumber});
                if(searchAboutPhoneNumber){
                    return res.status(400).send({message: 'رقم الهاتف مستخدم من قبل'})
                }else{



                    const update = await User.updateOne({_id: req.body.id}, {$set: {username: req.body.username, phoneNumber: req.body.phoneNumber, dateOfBirth: req.body.dateOfBirth, gender: req.body.gender}});
                
                    if(update){
                        return res.status(200).send({message: 'تم تعديل البيانات بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }

                    

                }
                


            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.body.method === 'update-reservation-date-time'){
            try {
                const getOldDay = await Schedule.findOne({ date: req.body.oldDate });
        
                if (!getOldDay) {
                    return res.status(404).send({ message: 'الجدول القديم غير موجود' });
                }

                const getDoctor = getOldDay.doctors.find((doctorObj) => doctorObj.doctor === parseInt(req.body.doctorSerial));
                
                if (!getDoctor) {
                    return res.status(404).send({ message: 'الطبيب غير موجود' });
                }

                const getOldReservation = getDoctor.reservations.find((reservationObj) => reservationObj.reservationSerial === parseInt(req.body.reservationSerial));
                
                if (!getOldReservation) {
                    return res.status(404).send({ message: 'الحجز القديم غير موجود' });
                }

                // Update reservation time
                const newReservation = { ...getOldReservation, reservationTime: req.body.newReservationTime };

                // Delete old reservation
                const deleteReservation = await Schedule.updateOne(
                    { date: req.body.oldDate, "doctors.reservations.reservationSerial": parseInt(req.body.reservationSerial) },
                    { $pull: { "doctors.$.reservations": { reservationSerial: parseInt(req.body.reservationSerial) } } }
                );

                if (deleteReservation.modifiedCount === 0) {
                    return res.status(500).send({ message: 'فشل حذف الحجز القديم' });
                }

                // Add new reservation
                const pushNewReservation = await Schedule.updateOne(
                    { date: req.body.newDate, "doctors.doctor": parseInt(req.body.doctorSerial) },
                    { $push: { "doctors.$.reservations": newReservation } }
                );

                if (pushNewReservation.modifiedCount > 0) {
                    return res.status(200).send({ message: 'تم تعديل ميعاد الحجز بنجاح' });
                } else {
                    return res.status(500).send({ message: 'فشل إضافة الحجز الجديد' });
                }

                

      
            } catch (error) {
         
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

    }
}

export const config = {
    api: {
        externalResolver: true,
    },
};
