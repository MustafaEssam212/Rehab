
import Doctor from "@/Models/Doctor";
import Schedule from "@/Models/Schedule";
import dbConnect from "@/utils/dbConnect";
import ContactMessage from "@/Models/ContactMessage";
import User from "@/Models/User";
import Blog from "@/Models/Blog";
import Work from "@/Models/Work";
import Review from "@/Models/Review";


export default async function GetData(req, res) {
    await dbConnect();

        if(req.method === 'GET'){
            if(req.query.method === 'schedule'){
                try {
                    const doctorsList = await Doctor.find({}, { name: true, serial: true, _id: false });
                    const getDay = await Schedule.findOne({date: req.query.date});
                    var dayInfo = [];
                    
                    if(!doctorsList.length){
                        return res.status(200).send({message: 'تم تلقي البيانات بنجاح', doctorsList: [], dayInfo: []});
                    }else if(doctorsList.length && !getDay){
                        return res.status(200).send({message: 'تم تلقي البيانات بنجاح', doctorsList, dayInfo: []});
                    }else if(doctorsList.length && getDay){
                        getDay.doctors.map((doctor)=> {
                      
                            var {reservations, ...info} = doctor;
                            dayInfo.push(info);
                         
                            if(dayInfo.length === getDay.doctors.length){
        
                                return res.status(200).send({message: 'تم استلام البيانات بنجاح', doctorsList, dayInfo})
                            }
                        })
                    }
    
    
                } catch (error) {
                    console.log(error)
                    return res.status(500).send({message: 'حدث خطأ اثناء تلقي البيانات'})
                }
            }
    
            else if(req.query.method === 'reservation-date'){
                const getDate = await Schedule.findOne({date: req.query.date}, {doctors: true, _id: false});
                if(getDate && getDate.doctors){
                    
                    const availableDoctors = getDate.doctors.filter(doctor => !doctor.vacation);
            
    
                    var arr = [];
    
                    availableDoctors.map( async (e) => {
                        var doctorObj = e;
                        const getPic = await Doctor.findOne(({serial: e.doctor}));
                        doctorObj.cover = getPic.cover;
                        arr.push(doctorObj);
    
                        if(arr.length === availableDoctors  .length){
                            return  res.status(200).send(arr);
                        }
                    })
    
    
                }else{
                    return res.status(200).send([]);
                }
            }
    
            else if(req.query.method === 'schedule-booking'){
    
                try {
                    const getDay = await Schedule.findOne({date: req.query.date}, {doctors: true, _id: false});
    
                    if(getDay){
                        if(getDay.doctors.length){
                            return res.status(200).send({message: `تم تلقي البيانات بنجاح`, doctors: getDay.doctors});
                        }else{
                            return res.status(200).send({message: `تم تلقي البيانات بنجاح`, doctors: []});
                        }
                    }else{
                        return res.status(200).send({message: `تم تلقي البيانات بنجاح`, doctors: []});
                    }
    
    
                } catch (error) {
                    return res.status(500).send({message: `حدث خطأ اثناء تلقي البيانات`})
                }
    
    
            }
    
            else if(req.query.method === 'get-doctors-list'){
                try{
    
                    const list = await Doctor.find({}, {name: true, serial: true, _id: false});
                    if(list){
                        return res.status(200).send({message: 'تم تلقي البيانات بنجاح', list});
                    }else{
                        return res.status(404).send({message: 'لا توجد قائمة للدكاترة', list: []});
                    }
    
    
                }catch(error){
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', list: []});
                }
            }
    
            else if(req.query.method === 'get-day-info'){
                try {
                    
                    const getDay = await Schedule.findOne({date: req.query.date});
                    
                    if(getDay && getDay.doctors.length){
                        const getDoctor = getDay.doctors.find((doctorObj) => doctorObj.doctor === parseInt(req.query.serial));
                        if(getDoctor){
                            return res.status(200).send({message: 'تم تلقي البيانات بنجاح', doctor: getDoctor})
                        }else{
                            return res.status(404).send({message: 'لا توجد بيانات لهذا الدكتور', doctor: {}})
                        }
                    }else{
                        return res.status(404).send({message: 'لا توجد بيانات لهذا اليوم', doctor: {}})
                    }
    
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', doctor: {}})
                }
            }
    
    
            else if(req.query.method === 'getNumbers'){
                try {
                    const allMessages = await ContactMessage.find({});
                   
                    // Get the current date, extracting the month and day
                    const today = new Date();
                    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
                    const currentDay = today.getDate().toString().padStart(2, '0'); // Ensure two digits
    
                    // Query MongoDB to find users whose dateOfBirth string matches today's month and day
                    const usersWithBirthdayToday = await User.find({
                    dateOfBirth: {
                        $regex: `-${currentMonth}-${currentDay}$` // Matches the MM-DD part of the dateOfBirth string
                    }
                    });
    
    
                    
                    return res.status(200).send({number: allMessages.length, birthdaysNum: usersWithBirthdayToday.length});
    
                } catch (error) {
                    console.log(error)
                    return res.status(500).send({number: 0});
                }
            }
    
            else if(req.query.method === 'get-contact-messages'){
                try {
                    const getMessages = await ContactMessage.find({});
                    return res.status(200).send({message: 'تم تلقي البيانات بنجاح', messages: getMessages})
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', messages: []})
                }
            }
    
            else if(req.query.method === 'get-my-reservations'){
    
                try {
                    
                    const reservations = await Schedule.aggregate([
                        // Unwind the doctors array to deconstruct it into separate documents
                        { 
                          $unwind: "$doctors" 
                        },
                        // Unwind the reservations array to deconstruct it into separate documents
                        { 
                          $unwind: "$doctors.reservations" 
                        },
                        // Match the reservations that have the specified userID
                        { 
                          $match: { "doctors.reservations.userID": req.query.userID } 
                        },
                        // Project the required fields including the doctor field and the date
                        {
                          $project: {
                            _id: 0, // Exclude the _id field from the result
                            "date": 1, // Include the date field from the Schedule record
                            "doctor": "$doctors.doctor", // Include the doctor field
                            "reservationName": "$doctors.reservations.reservationName",
                            "reservationTime": "$doctors.reservations.reservationTime",
                            "reservationSerial": "$doctors.reservations.reservationSerial",
                            "userNumber": "$doctors.reservations.userNumber",
                            "userID": "$doctors.reservations.userID",
                            "category": "$doctors.reservations.category"
                          }
                        }
                      ]);
    
                      
                      if(reservations.length > 0){
                      
                        var arr = [];
    
                        reservations.map( async (obj) => {
                            const getDoctorInfo = await Doctor.findOne({serial: obj.doctor}, {name: true, cover: true, _id: false});
                            var cloneObj = obj;
                            cloneObj.doctorCover = getDoctorInfo.cover;
                            cloneObj.doctorName = getDoctorInfo.name;
    
                            arr.push(cloneObj);
    
                            if(arr.length === reservations.length){
                                return res.status(200).send({reservations: arr})
                            }
                        })
    
    
                      }else{
                        return res.status(200).send({reservations: []})
                      }
    
                } catch (error) {
                    console.log(error)
                    return res.status(500).send({reservations: []})
                }
    
            }
    
            else if(req.query.method === 'get-my-data'){
                try {
    
                    const getMyData = await User.findOne({_id: req.query.id});
                    if(getMyData){
                        return res.status(200).send({data: getMyData})
                    }else{
                        return res.status(404).send({data: {}});
                    }
                    
                } catch (error) {
                    console.log(error)
                    return res.status(500).send({data: {}});
                }
            }
    
    
            else if(req.query.method === 'forgot-password-email-checking'){
                try {
                    
                    if(!req.query.email){
                        res.status(400).send({message: 'برجاء ادخال المعلومات المطلوبة'})
                    }else{
                        const checkEmail = await User.findOne({email: req.query.email});
                        if(checkEmail){
                            return res.status(200).send({message: 'الايميل موجود'})
                        }else{
                            return res.status(404).send({message: 'هذا الايميل غير موجود'})
                        }
                    }
    
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
            }
    
    
            else if(req.query.method === 'forgot-password-security-question-checking'){
                try {
                    
                    if(!req.query.question || !req.query.answer || !req.query.email){
                        return res.status(400).send({message: 'برجاء ادخال المعلومات المطلوبة'})
                    }else{
                        const checkQuestion = await User.findOne({email: req.query.email});
                        
                        if(checkQuestion){
    
                            if(req.query.question === checkQuestion.securityQuestion){
    
                                if(req.query.answer === checkQuestion.answerSecurityQuestion){
                                    return res.status(200).send({message: 'المعلومات صحيحة'})
                                }else{
                                    return res.status(400).send({message: 'المعلومات التي ادخلتها غير صحيحة'})
                                }
    
                            }else{
                                return res.status(400).send({message: 'المعلومات التي ادخلتها غير صحيحة'})
                            }
    
                        }else{
                            return res.status(404).send({message: 'حدث خطأا ثناء تنفيذ العملية'})
                        }
                    }
    
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
            }
    
            else if(req.query.method === 'get-all-users'){
                try {
    
                    const page = req.query.page;
                    const usersPerPage = 20;
                    const skipCount = (page - 1) * usersPerPage;
                    const length = await User.countDocuments();
                    const findUsers = await User.find().select('username email phoneNumber dateOfBirth gender').skip(skipCount).limit(usersPerPage);
    
                    return res.status(200).send({users: findUsers, length})
    
    
                } catch (error) {
                    return res.status(500).send({message: `حدث خطأ اثناء تنفيذ العملية`})
                }
            }
    
            else if(req.query.method === 'get-blogs'){
                try {
                    const page = parseInt(req.query.page) || 1;
                    const blogsPerPage = 3;
                    const skipCount = (page - 1) * blogsPerPage;
                    const length = await Blog.countDocuments();
                    const fingBlogs = await Blog.find().skip(skipCount).limit(blogsPerPage);
                    return res.status(200).send({ length, blogs: fingBlogs });
                } catch (error) {
                    return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                }
            }

            else if(req.query.method === 'get-works'){
                try {
                    const page = parseInt(req.query.page) || 1;
                    const blogsPerPage = 3;
                    const skipCount = (page - 1) * blogsPerPage;
                    const length = await Work.countDocuments();
                    const fingBlogs = await Work.find().skip(skipCount).limit(blogsPerPage);
                    return res.status(200).send({ length, works: fingBlogs });
                } catch (error) {
                    return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                }
            }

            else if(req.query.method === 'get-reviews'){
                try {
                    const page = parseInt(req.query.page) || 1;
                    const blogsPerPage = 3;
                    const skipCount = (page - 1) * blogsPerPage;
                    const length = await Review.countDocuments();
                    const fingBlogs = await Review.find().skip(skipCount).limit(blogsPerPage);
                    return res.status(200).send({ length, reviews: fingBlogs });
                } catch (error) {
                    return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
                }
            }
    
            else if(req.query.method === 'get-blog'){
           
    
                try {
    
                    const findBlog = await Blog.findOne({name: req.query.blogName});
                    const suggestedBlogs = await Blog.aggregate([
                        { $match: { name: { $ne: req.query.blogName } } },
                        { $sample: { size: 3 } }
                    ]);
    
                    if(findBlog){
                        return res.status(200).send({blog: findBlog, suggestedBlogs, notFound: false});
                    }else{
                        return res.status(404).send({blog: {}, suggestedBlogs: [], notFound: true})
                    }
                    
                } catch (error) {
                    return res.status(500).send({blog: {}, suggestedBlogs: [], notFound: true})
                }
            }

            else if(req.query.method === 'get-work'){
           
    
                try {
    
                    const findBlog = await Work.findOne({name: req.query.workName});
                    const suggestedWorks = await Work.aggregate([
                        { $match: { name: { $ne: req.query.workName } } },
                        { $sample: { size: 3 } }
                    ]);
    
                    if(findBlog){
                        return res.status(200).send({work: findBlog, suggestedWorks, notFound: false});
                    }else{
                        return res.status(404).send({work: {}, suggestedWorks: [], notFound: true})
                    }
                    
                } catch (error) {
                    return res.status(500).send({work: {}, suggestedWorks: [], notFound: true})
                }
            }

            else if(req.query.method === 'get-review'){
           
    
                try {
    
                    const findBlog = await Review.findOne({name: req.query.reviewName});
                    const suggestedReviews = await Review.aggregate([
                        { $match: { name: { $ne: req.query.reviewName } } },
                        { $sample: { size: 3 } }
                    ]);
    
                    if(findBlog){
                        return res.status(200).send({review: findBlog, suggestedReviews, notFound: false});
                    }else{
                        return res.status(404).send({review: {}, suggestedReviews: [], notFound: true})
                    }
                    
                } catch (error) {
                    return res.status(500).send({review: {}, suggestedReviews: [], notFound: true})
                }
            }
    
            else if(req.query.method === 'check-email-for-permissions'){
                if(!req.query.email){
                    return res.status(400).send({message: 'برجاء ملئ المعلومات المطلوبة'})
                }else{
    
                    try {
                        
                        const getUser = await User.findOne({email: req.query.email}, {_id: false, permissions: true});
                        if(getUser){
                            return res.status(200).send({message: 'الايميل موجود', permissions: getUser.permissions});
                        }else{
                            return res.status(404).send({message: 'الايميل غير موجود'});
                        }
    
                    } catch (error) {
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }
    
                }
            }
    
            else if(req.query.method === 'download-users-data'){
                try {
                    const users = await User.find({});
                    if(users){
                        return res.status(200).send(users);
                    }else{
                        return res.status(500).send([]);
                    }
                } catch (error) {
                    return res.status(500).send([]);
                }
            }
    
            else if(req.query.method === 'get-users-birthdays'){
                try {
                    
                       // Get the current date, extracting the month and day
                       const today = new Date();
                       const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
                       const currentDay = today.getDate().toString().padStart(2, '0'); // Ensure two digits
       
                       // Query MongoDB to find users whose dateOfBirth string matches today's month and day
                       const usersWithBirthdayToday = await User.find({
                       dateOfBirth: {
                           $regex: `-${currentMonth}-${currentDay}$` // Matches the MM-DD part of the dateOfBirth string
                       }
                       }, {_id: false, gender: true, phoneNumber: true, dateOfBirth: true, username: true, email: true});
    
                       if(usersWithBirthdayToday){
                        return res.status(200).send({message: 'تم جمع البيانات بنجاح', users: usersWithBirthdayToday});
                       }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', users: []});
                       }
    
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', users: []});
                }
            }
    
            else if(req.query.method === 'get-blogs-names'){
                try {
                    const findBlogs = await Blog.find({}, {_id: false, name: true});
        
                    return res.status(200).send({message: 'تم جلب البيانات بنجاح', blogsNames: findBlogs})
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', blogsNames: []})
                }
            }


            else if(req.query.method === 'get-reviews-names'){
                try {
                    const findBlogs = await Review.find({}, {_id: false, name: true});
        
                    return res.status(200).send({message: 'تم جلب البيانات بنجاح', reviewNames: findBlogs})
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', reviewNames: []})
                }
            }

            else if(req.query.method === 'get-previous-works-names'){
                try {
                    const findBlogs = await Work.find({}, {_id: false, name: true});
        
                    return res.status(200).send({message: 'تم جلب البيانات بنجاح', previousWorks: findBlogs})
                } catch (error) {
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية', previousWorks: []})
                }
            }
    
        }
      
    

}

export const config = {
    api: {
        externalResolver: true,
    },
};


