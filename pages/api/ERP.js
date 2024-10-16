import Prices from "@/Models/Prices";
import dbConnect from "@/utils/dbConnect";
import User from "@/Models/User";
import NonUser from "@/Models/NonUser";
import Pay from "@/Models/Pay";
import Outgoing from "@/Models/Outgoing";
import Schedule from "@/Models/Schedule";

export default async function ERP(req, res){
    await dbConnect();


    if(req.method === 'GET'){

        if(req.query.method === 'create-first-prices'){
            try {
                
                const newPrices = new Prices({
                    sessionPrice: 350,
                    examinationPrice: 500,
                    packages: []
                });

                newPrices.save();
                return res.status(200).json({message: 'تم الانشاء بنجاح'})

            } catch (error) {
                return res.status(500).json({message: 'حدث خطأ اثناء التنفيذ'})
            }
        }

       else if(req.query.method === 'get-prices-values'){
            try {
                const getPrices = await Prices.findOne({}, {_id: false, sessionPrice: true, examinationPrice: true});
                if(getPrices){
                    return res.status(200).send({message: 'تم تلقي البيانات بنجاح', session: getPrices.sessionPrice, examination: getPrices.examinationPrice});
                }else{
                    return res.status(404).send({message: 'لا يوجد قيم مُخزّنة'})
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تلقي البيانات'})
            }
        }

        else if(req.query.method === 'get-packages-names'){
            try {
                const getPackages = await Prices.findOne({}, {_id: false, packages: true});
                if(getPackages){
                    return res.status(200).send({message: 'تم تلقي البيانات بنجاح', packages: getPackages.packages});
                }else{
                    return res.status(404).send({message: 'لا يوجد ملعومات', packages: []});
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تفيذ العملية', packages: []});
            }
        }


        else if(req.query.method === 'get-users-search'){
            try {
                const regexPattern = new RegExp(`(?:\\+)?(?:\\s*\\d\\s*)*(${req.query.phoneNumber})`, 'i');
            

                // Find users with matching phone numbers
                const findUsers = await User.find({ phoneNumber: { $regex: regexPattern } }, {_id: false, email: false, password: false, dateOfBirth: false, securityQuestion: false, answerSecurityQuestion: false, permissions: false, role: false, gender: false});
            

            
                // Respond based on the results of the query
                if (findUsers.length > 0) {
                    return res.status(200).send({ users: findUsers });
                } else {
                    return res.status(404).send({ message: 'لا توجد نتائج' });
                }
            } catch (error) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
            }
            
        }

        else if(req.query.method === 'get-non-users-search'){
            try {
                const regexPattern = new RegExp(`(?:\\+)?(?:\\s*\\d\\s*)*(${req.query.phoneNumber})`, 'i');
            

                // Find users with matching phone numbers
                const findUsers = await NonUser.find({ phoneNumber: { $regex: regexPattern } }, {_id: false});
            

            
                // Respond based on the results of the query
                if (findUsers.length > 0) {
                    return res.status(200).send({ users: findUsers });
                } else {
                    return res.status(404).send({ message: 'لا توجد نتائج' });
                }
            } catch (error) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
            }
            
        }

        else if(req.query.method === 'get-pays'){
            try {
                const page = parseInt(req.query.page) || 1;
                const paysPerPage = 20;
                const skipCount = (page - 1) * paysPerPage;
        
                if (req.query.search === 'false') {
                    // Return all records with pagination
                    const length = await Pay.countDocuments();
                    const fingPays = await Pay.find().skip(skipCount).limit(paysPerPage);
                    return res.status(200).send({ length, pays: fingPays });
                } else {
                    // Initialize query object
                    let query = {};
        
                    // Handle date query
                    const date = req.query.date === 'null' ? null : new Date(req.query.date).getTime();
                    if (date) {
                        const startOfDay = new Date(date).setHours(0, 0, 0, 0);  // Start of the day
                        const endOfDay = new Date(date).setHours(23, 59, 59, 999);  // End of the day
                        query.date = { $gte: startOfDay, $lte: endOfDay };
                    }
        
                    // Handle related query (assuming the field is called 'relatedTo' based on your data)
                    const related = req.query.related === 'null' ? null : req.query.related;
                    if (related) {
                        query.relatedTo = related;
                    }
        
                    // Get the total matching records count
                    const length = await Pay.countDocuments(query);
        
                    // Get the matching records with pagination
                    const fingPays = await Pay.find(query).skip(skipCount).limit(paysPerPage);
        
                    return res.status(200).send({ length, pays: fingPays });
                }
        
            } catch (error) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تلقي البيانات' });
            }
        }
        
        else if(req.query.method === 'get-outgoings'){
            try {
                const page = parseInt(req.query.page) || 1;
                const paysPerPage = 20;
                const skipCount = (page - 1) * paysPerPage;
        
                if (req.query.search === 'false') {
                    // Return all records with pagination
                    const length = await Outgoing.countDocuments();
                    const fingPays = await Outgoing.find().skip(skipCount).limit(paysPerPage);
                    return res.status(200).send({ length, pays: fingPays });
                } else {
                    // Initialize query object
                    let query = {};
        
                    // Handle date query
                    const date = req.query.date === 'null' ? null : new Date(req.query.date).getTime();
                    if (date) {
                        const startOfDay = new Date(date).setHours(0, 0, 0, 0);  // Start of the day
                        const endOfDay = new Date(date).setHours(23, 59, 59, 999);  // End of the day
                        query.date = { $gte: startOfDay, $lte: endOfDay };
                    }
        
                    // Handle related query (assuming the field is called 'relatedTo' based on your data)
                    const related = req.query.related === 'null' ? null : req.query.related;
                    if (related) {
                        query.relatedTo = related;
                    }
        
                    // Get the total matching records count
                    const length = await Outgoing.countDocuments(query);
        
                    // Get the matching records with pagination
                    const fingPays = await Outgoing.find(query).skip(skipCount).limit(paysPerPage);
        
                    return res.status(200).send({ length, pays: fingPays });
                }
        
            } catch (error) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تلقي البيانات' });
            }
        }

        else if(req.query.method === 'get-reservation-data'){
            try {

                const reservationSerial = parseInt(req.query.serial);
                
                const schedule = await Schedule.findOne({
                    'doctors.reservations.reservationSerial': reservationSerial
                });

                if (!schedule) {
                    return res.status(404).send({ message: 'لم يتم العثور على الحجز' });
                  }

                  const doctorWithReservation = schedule.doctors.find(doctor => 
                    doctor.reservations.some(reservation => reservation.reservationSerial === reservationSerial)
                  );

                  const reservation = doctorWithReservation.reservations.find(reservation =>
                    reservation.reservationSerial === reservationSerial
                  );

                  return res.status(200).send({sessions: [reservation]});


            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'get-statistics'){
            try {


                // Reservations Payment Status true of the Month => Income
                const getTheReservationTotalPrices = async (month) => {
                    const monthMapping = {
                        "يناير": 1,
                        "فبراير": 2,
                        "مارس": 3,
                        "أبريل": 4,
                        "مايو": 5,
                        "يونيو": 6,
                        "يوليو": 7,
                        "أغسطس": 8,
                        "سبتمبر": 9,
                        "أكتوبر": 10,
                        "نوفمبر": 11,
                        "ديسمبر": 12
                    };
                    const monthNumber = monthMapping[month];
                    const getScheduleDays = await Schedule.find({});

                    var chosenMonthScheduleResults = []
                    var reservationsTotalPrices = 0; 
                    
                    getScheduleDays.map((e) => {
                        const [day, month, year] = e.date.split('/');
                        if(month === `${monthNumber}`){
                            chosenMonthScheduleResults.push(e);
                        }
                    
                    })
                    
                    
                    chosenMonthScheduleResults.map((e) => {
                        e.doctors.map((doctor) => {
                            doctor.reservations.map((reservation) => {
                                if(reservation.paymentStatus){
                                    reservationsTotalPrices += reservation.price;
                                }
                            })
                        })
                    });

                    return reservationsTotalPrices;

                }

                // Total Sum of Pay Schema of the Month => Income
                const getPaymentsSumByMonth = async (month) => {
                    const monthMapping = {
                        "يناير": 0,   // January
                        "فبراير": 1,  // February
                        "مارس": 2,    // March
                        "أبريل": 3,   // April
                        "مايو": 4,    // May
                        "يونيو": 5,   // June
                        "يوليو": 6,   // July
                        "أغسطس": 7,   // August
                        "سبتمبر": 8,  // September
                        "أكتوبر": 9,  // October
                        "نوفمبر": 10, // November
                        "ديسمبر": 11  // December
                    };
            
                    const monthNumber = monthMapping[month];
            
                    // Calculate the start and end dates for the current year
                    const startDate = new Date(new Date().getFullYear(), monthNumber, 1);
                    const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0);
            
                    // Use MongoDB aggregation to filter and sum amounts
                    const result = await Pay.aggregate([
                        {
                            $match: {
                                date: {
                                    $gte: startDate.getTime(), // Convert to milliseconds
                                    $lte: endDate.getTime()     // Convert to milliseconds
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,                   // Grouping by null to get a single result
                                totalAmount: { $sum: "$amount" } // Summing the amount field
                            }
                        }
                    ]);
            
                    return result.length > 0 ? result[0].totalAmount : 0; // Return the total amount or 0 if no records found
                }


                // Total Packages Income From Users of the Month => Income
                const getPaidPackagesOfTheUsers = async (month) => {
                    const monthMapping = {
                    "يناير": 0,   // January
                    "فبراير": 1,  // February
                    "مارس": 2,    // March
                    "أبريل": 3,   // April
                    "مايو": 4,    // May
                    "يونيو": 5,   // June
                    "يوليو": 6,   // July
                    "أغسطس": 7,   // August
                    "سبتمبر": 8,  // September
                    "أكتوبر": 9,  // October
                    "نوفمبر": 10, // November
                    "ديسمبر": 11  // December
                };
            
                const monthNumber = monthMapping[month];
            
                // Calculate the start and end dates for the current year
                const startDate = new Date(new Date().getFullYear(), monthNumber, 1).getTime();
                const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0).getTime();
                
                function isDateInMonth(date, startDate, endDate) {
                  return date >= startDate && date <= endDate;
                }
                
                var totalExistsPackages = 0;
                var totalHistoryPackages = 0;


                const getUsers = await User.find({});
                
                getUsers.map((user) => {
                    if(isDateInMonth(user.package.date, startDate, endDate)){
                        totalExistsPackages += user.package.paid;
                    }
                    
                    user.history.map((historyPackage) => {
                        if(isDateInMonth(historyPackage.date, startDate, endDate)){
                            totalHistoryPackages += historyPackage.paid
                        }
                    })
                });
                
            
                
                return totalHistoryPackages + totalExistsPackages;
                }

                // Total Packages Income From Non Users of the Month => Income
                const getPaidPackagesOfTheNonUsers = async (month) => {
                    const monthMapping = {
                    "يناير": 0,   // January
                    "فبراير": 1,  // February
                    "مارس": 2,    // March
                    "أبريل": 3,   // April
                    "مايو": 4,    // May
                    "يونيو": 5,   // June
                    "يوليو": 6,   // July
                    "أغسطس": 7,   // August
                    "سبتمبر": 8,  // September
                    "أكتوبر": 9,  // October
                    "نوفمبر": 10, // November
                    "ديسمبر": 11  // December
                };
            
                const monthNumber = monthMapping[month];
            
                // Calculate the start and end dates for the current year
                const startDate = new Date(new Date().getFullYear(), monthNumber, 1).getTime();
                const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0).getTime();
                
                function isDateInMonth(date, startDate, endDate) {
                  return date >= startDate && date <= endDate;
                }
                
                var totalExistsPackages = 0;
                var totalHistoryPackages = 0;


                const getUsers = await NonUser.find({});
                
                getUsers.map((user) => {
                    if(isDateInMonth(user.package.date, startDate, endDate)){
                        totalExistsPackages += user.package.paid;
                    }
                    
                    user.history.map((historyPackage) => {
                        if(isDateInMonth(historyPackage.date, startDate, endDate)){
                            totalHistoryPackages += historyPackage.paid
                        }
                    })
                });
                
            
                
                return totalHistoryPackages + totalExistsPackages;
                }



                // Total Packages Outgoings From User History Packages Returns => Outgoing
                const getSumOfOutgoingsOfPackages = async (month) => {
                    const monthMapping = {
                    "يناير": 0,   // January
                    "فبراير": 1,  // February
                    "مارس": 2,    // March
                    "أبريل": 3,   // April
                    "مايو": 4,    // May
                    "يونيو": 5,   // June
                    "يوليو": 6,   // July
                    "أغسطس": 7,   // August
                    "سبتمبر": 8,  // September
                    "أكتوبر": 9,  // October
                    "نوفمبر": 10, // November
                    "ديسمبر": 11  // December
                };
            
                const monthNumber = monthMapping[month];
            
                // Calculate the start and end dates for the current year
                const startDate = new Date(new Date().getFullYear(), monthNumber, 1).getTime();
                const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0).getTime();
                
                function isDateInMonth(date, startDate, endDate) {
                  return date >= startDate && date <= endDate;
                }
                
                var totalReturnsPackages = 0;
                
                const getUsers = await User.find({});
                
                getUsers.map((user) => {
                    
                    user.history.map((historyPackage) => {
                        if(isDateInMonth(historyPackage.date, startDate, endDate)){
                            totalReturnsPackages += historyPackage.returns
                        }
                    })
                });
                
            
                
                return totalReturnsPackages;
                }

                // Total Packages Outgoings From Non User History Packages Returns => Outgoing
                const getSumOfOutgoingsOfNonUsersPackages = async (month) => {
                    const monthMapping = {
                    "يناير": 0,   // January
                    "فبراير": 1,  // February
                    "مارس": 2,    // March
                    "أبريل": 3,   // April
                    "مايو": 4,    // May
                    "يونيو": 5,   // June
                    "يوليو": 6,   // July
                    "أغسطس": 7,   // August
                    "سبتمبر": 8,  // September
                    "أكتوبر": 9,  // October
                    "نوفمبر": 10, // November
                    "ديسمبر": 11  // December
                };
            
                const monthNumber = monthMapping[month];
            
                // Calculate the start and end dates for the current year
                const startDate = new Date(new Date().getFullYear(), monthNumber, 1).getTime();
                const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0).getTime();
                
                function isDateInMonth(date, startDate, endDate) {
                  return date >= startDate && date <= endDate;
                }
                
                var totalReturnsPackages = 0;
                
                const getUsers = await NonUser.find({});
                
                getUsers.map((user) => {
                    
                    user.history.map((historyPackage) => {
                        if(isDateInMonth(historyPackage.date, startDate, endDate)){
                            totalReturnsPackages += historyPackage.returns
                        }
                    })
                });
                
            
                
                return totalReturnsPackages;
                }


                // Total Sum of Outgoings Schema of the Month => Outgoing
                const getOutGoingsSumByMonth = async (month) => {
                    const monthMapping = {
                        "يناير": 0,   // January
                        "فبراير": 1,  // February
                        "مارس": 2,    // March
                        "أبريل": 3,   // April
                        "مايو": 4,    // May
                        "يونيو": 5,   // June
                        "يوليو": 6,   // July
                        "أغسطس": 7,   // August
                        "سبتمبر": 8,  // September
                        "أكتوبر": 9,  // October
                        "نوفمبر": 10, // November
                        "ديسمبر": 11  // December
                    };
            
                    const monthNumber = monthMapping[month];
            
                    // Calculate the start and end dates for the current year
                    const startDate = new Date(new Date().getFullYear(), monthNumber, 1);
                    const endDate = new Date(new Date().getFullYear(), monthNumber + 1, 0);
            
                    // Use MongoDB aggregation to filter and sum amounts
                    const result = await Outgoing.aggregate([
                        {
                            $match: {
                                date: {
                                    $gte: startDate.getTime(), // Convert to milliseconds
                                    $lte: endDate.getTime()     // Convert to milliseconds
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,                   // Grouping by null to get a single result
                                totalAmount: { $sum: "$amount" } // Summing the amount field
                            }
                        }
                    ]);
            
                    return result.length > 0 ? result[0].totalAmount : 0; // Return the total amount or 0 if no records found
                }

                
                // Income Vars
                const totalPaidReservations = await getTheReservationTotalPrices(req.query.month);
                const paymentsForMonth = await getPaymentsSumByMonth(req.query.month);
                const totalPackagesOfUsers = await getPaidPackagesOfTheUsers(req.query.month);
                const totalPackagesOfNonUsers = await getPaidPackagesOfTheNonUsers(req.query.month);
                const totalInComeOfTheMonth = totalPaidReservations + paymentsForMonth + totalPackagesOfUsers + totalPackagesOfNonUsers;



                // Outgoings Vars
                const totalPackagesReturnsOutgoings = await getSumOfOutgoingsOfPackages(req.query.month);
                const totalPackagesReturnsOutgoingsOfNonUsers = await getSumOfOutgoingsOfNonUsersPackages(req.query.month);
                const totalOutgoingsSchema = await getOutGoingsSumByMonth(req.query.month);
                const totalOutGoingsOfTheMonth = totalPackagesReturnsOutgoings + totalOutgoingsSchema + totalPackagesReturnsOutgoingsOfNonUsers;



                return res.status(200).send({income: totalInComeOfTheMonth, outgoing: totalOutGoingsOfTheMonth, totalPackages: {income: totalPackagesOfUsers + totalPackagesOfNonUsers, outgoing: totalPackagesReturnsOutgoings + totalPackagesReturnsOutgoingsOfNonUsers}, individuals: totalPaidReservations})

       

 

            
    
            } catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
            }
            
        }

    }


    else if(req.method === 'POST'){

        if(req.query.method === 'change-session-price-examination-price'){
            try {
                
                const update = await Prices.updateMany({}, {$set: {sessionPrice: parseInt(req.body.sessionPrice), examinationPrice: parseInt(req.body.examination)}});

                if(update.modifiedCount > 0){
                    return res.status(200).send({message: 'تم تغيير القيمة بنجاح'});
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تفيذ العملية'});
                }

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تفيذ العملية'});
            }
        }

        else if(req.query.method === 'create-new-package'){
            try {
                const getPackages = await Prices.findOne({}, {_id: false, packages: true});
                if(getPackages.packages){

                    const filteredPackages = getPackages.packages.find((e) => e.name === req.body.name);
                    if(filteredPackages){
                        return res.status(400).send({message: 'هذه الباكيدچ موجودة بنفس الاسم من قبل'})
                    }else{
                        const pushNewPackage = await Prices.updateMany({}, {$push: {packages: {name: req.body.name, sessions: parseInt(req.body.sessions), price: parseInt(req.body.price)}}});

                        if(pushNewPackage.modifiedCount > 0){
                            return res.status(200).send({message: 'تم انشاء الباكيدچ بنجاح'});
                        }else{
                            return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                        }
                    }

                }else{
                    const pushNewPackage = await Prices.updateMany({}, {$push: {packages: {name: req.body.name, sessions: parseInt(req.body.sessions), price: parseInt(req.body.price)}}});

                    if(pushNewPackage.modifiedCount > 0){
                        return res.status(200).send({message: 'تم انشاء الباكيدچ بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                    }
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

        else if(req.query.method === 'add-package-to-user'){
            try {
                const data = JSON.parse(req.body);

                // Convert string numeric values to numbers
                if (typeof data.package.paid === 'string') {
                    data.package.paid = parseInt(data.package.paid, 10);
                }
                if (typeof data.package.off === 'string') {
                    data.package.off = parseInt(data.package.off, 10);
                }
                if (typeof data.package.remaining === 'string') {
                    data.package.remaining = parseInt(data.package.remaining, 10);
                }
                if (typeof data.package.price === 'string') {
                    data.package.price = parseInt(data.package.price, 10);
                }
                if (typeof data.package.sessions === 'string') {
                    data.package.sessions = parseInt(data.package.sessions, 10);
                }
                if (typeof data.package.date === 'string') {
                    data.package.date = parseInt(data.package.date, 10);
                }
   
                const updateUser = await User.updateOne({phoneNumber: data.phoneNumber}, {$set: {package: data.package}});

                if(updateUser.modifiedCount > 0){
                 return res.status(200).send({message: 'تم اضافة الباكيدچ بنجاح'})
                }else{
             
                 return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }

            } catch (error) {
            
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'add-non-user'){
            try {
 
                const newNonUser = new NonUser({
                    username: req.body.username,
                    phoneNumber: req.body.phoneNumber,
                    package: {
                        sessions: null,
                        name: null,
                        price: null
                    }
                });
                newNonUser.save();
                return res.status(200).send({message: 'تم اضافة العميل بنجاح'})

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }


        else if(req.query.method === 'add-package-to-non-user'){
            try {
                const data = JSON.parse(req.body);

                // Convert string numeric values to numbers
                if (typeof data.package.paid === 'string') {
                    data.package.paid = parseInt(data.package.paid, 10);
                }
                if (typeof data.package.off === 'string') {
                    data.package.off = parseInt(data.package.off, 10);
                }
                if (typeof data.package.remaining === 'string') {
                    data.package.remaining = parseInt(data.package.remaining, 10);
                }
                if (typeof data.package.price === 'string') {
                    data.package.price = parseInt(data.package.price, 10);
                }
                if (typeof data.package.sessions === 'string') {
                    data.package.sessions = parseInt(data.package.sessions, 10);
                }
                if (typeof data.package.date === 'string') {
                    data.package.date = parseInt(data.package.date, 10);
                }
   
                const updateUser = await NonUser.updateOne({phoneNumber: data.phoneNumber}, {$set: {package: data.package}});

                if(updateUser.modifiedCount > 0){
                 return res.status(200).send({message: 'تم اضافة الباكيدچ بنجاح'})
                }else{
             
                 return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }

            } catch (error) {
            
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'add-new-pay'){
            try {
                const data = req.body;
                const serial = Math.floor(100000000 + Math.random() * 900000000);

                if(!data.name || !data.amount || !data.date){
                    return res.status(400).send({message: 'برجاء اضافة المعلومات المطلوبة'});
                }else{
                    if(typeof data.amount === 'string'){
                        data.amount = parseInt(data.amount)
                    }
                    if(typeof data.date === 'string'){
                        const date = new Date(data.date)
                        data.date = date.getTime();
                    }
    
                    
                    const newPay = new Pay({
                        name: data.name,
                        relatedTo: data.relatedTo,
                        amount: data.amount,
                        date: data.date,
                        serial
                    });
    
    
                    newPay.save();
    
                    return res.status(200).send({message: 'تم اضافة الدفع بنجاح'});
                }
                
                
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

        else if(req.query.method === 'add-new-outgoing'){
            try {
                const data = req.body;
                const serial = Math.floor(100000000 + Math.random() * 900000000);

                if(!data.name || !data.amount || !data.date){
                    return res.status(400).send({message: 'برجاء اضافة المعلومات المطلوبة'});
                }else{
                    if(typeof data.amount === 'string'){
                        data.amount = parseInt(data.amount)
                    }
                    if(typeof data.date === 'string'){
                        const date = new Date(data.date)
                        data.date = date.getTime();
                    }
    
                    
                    const newPay = new Outgoing({
                        name: data.name,
                        relatedTo: data.relatedTo,
                        amount: data.amount,
                        date: data.date,
                        serial
                    });
    
    
                    newPay.save();
    
                    return res.status(200).send({message: 'تم اضافة الصادر بنجاح'});
                }
                
                
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

    }



    else if(req.method === 'DELETE'){
        if(req.query.method === 'delete-package'){
            try {
                const pullFromPackages = await Prices.updateMany({}, {$pull: {packages: {name: req.query.package}}});
                if(pullFromPackages.modifiedCount > 0){
                    return res.status(200).send({message: 'تم حذف الباكيد بنجاح'})
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'delete-package-of-user'){
            const regex = /^\+/;
            const localRegex = /^0/;
            const number = !regex.test(req.query.phoneNumber) && !localRegex.test(req.query.phoneNumber) ? `+${req.query.phoneNumber.trim()}` : req.query.phoneNumber;
   

            try {
                const updatePackage = await User.updateOne({phoneNumber: number}, {$set: {package: {name: null, sessions: null, price: null}}});

                if(updatePackage.modifiedCount > 0){
                    return res.status(200).send({message: 'تم حذف الباكيدچ بنجاح'})
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'delete-non-user'){
            try {
                const regex = /^\+/;
                const localRegex = /^0/;
                const number = !regex.test(req.query.phoneNumber) && !localRegex.test(req.query.phoneNumber) ? `+${req.query.phoneNumber.trim()}` : req.query.phoneNumber;
                const deleteUser = await NonUser.deleteOne({phoneNumber: number});
                if(deleteUser.deletedCount > 0){
                    return res.status(200).send({message: 'تم حذف العميل بنجاح'})
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                }
                
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

        else if(req.query.method === 'delete-package-of-non-user'){
            const regex = /^\+/;
            const localRegex = /^0/;
            const number = !regex.test(req.query.phoneNumber) && !localRegex.test(req.query.phoneNumber) ? `+${req.query.phoneNumber.trim()}` : req.query.phoneNumber;
   

            try {
                const updatePackage = await NonUser.updateOne({phoneNumber: number}, {$set: {package: {name: null, sessions: null, price: null}}});

                if(updatePackage.modifiedCount > 0){
                    return res.status(200).send({message: 'تم حذف الباكيدچ بنجاح'})
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'delete-pay'){
            try {
                if(!req.query.number){
                    return res.status(400).send({message: 'برجاء اضافة المعلومات المطلوبة'})
                }else{
                    const number = parseInt(req.query.number);

                    const deletePay = await Pay.deleteOne({serial: number});
                    if(deletePay.deletedCount > 0){
                        return res.status(200).send({message: 'تم حذف الدفع بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                    }
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

        else if(req.query.method === 'delete-outgoing'){
            try {
                if(!req.query.number){
                    return res.status(400).send({message: 'برجاء اضافة المعلومات المطلوبة'})
                }else{
                    const number = parseInt(req.query.number);

                    const deletePay = await Outgoing.deleteOne({serial: number});
                    if(deletePay.deletedCount > 0){
                        return res.status(200).send({message: 'تم حذف الصادر بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                    }
                }
            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }
    }


    else if(req.method === 'PUT'){
        if(req.query.method === 'change-sessions-count-of-user'){
            try {
                const regex = /^\+/;
                const localRegex = /^0/;
                const number = !regex.test(req.query.phoneNumber) && !localRegex.test(req.query.phoneNumber) ? `+${req.query.phoneNumber.trim()}` : req.query.phoneNumber;
                const sessionsCount = parseInt(req.query.sessions);

                if (sessionsCount > 0) {
                    // Update only the sessions field within the package object
                    const updateUser = await User.updateOne(
                        { phoneNumber: number },
                        { $set: { 'package.sessions': sessionsCount } }
                    );

                    if(updateUser.matchedCount > 0){
                        return res.status(200).send({message: 'تم تعديل عدد الجلسات بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }
                } else {
                    // Reset the package to null if sessions count is 0 or less
                    const updateUser = await User.updateOne(
                        { phoneNumber: number },
                        { $set: { package: { name: null, sessions: null, price: null } } }
                    );

                    if(updateUser.matchedCount > 0){
                        return res.status(200).send({message: 'تم تعديل عدد الجلسات بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }
                }


            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
        }

        else if(req.query.method === 'edit-package-of-user'){
            try {
                const regex = /^\+/;
                const localRegex = /^0/;
                const number = !regex.test(req.query.phoneNumber) && !localRegex.test(req.query.phoneNumber) ? `+${req.query.phoneNumber.trim()}` : req.query.phoneNumber;
                const data = req.body.package;

                // Convert string numeric values to numbers
                if (typeof data.paid === 'string') {
                data.paid = parseInt(data.paid, 10);
                }
                if (typeof data.off === 'string') {
                    data.off = parseInt(data.off, 10);
                }
                if (typeof data.remaining === 'string') {
                    data.remaining = parseInt(data.remaining, 10);
                }
                if (typeof data.price === 'string') {
                    data.price = parseInt(data.price, 10);
                }
                if (typeof data.sessions === 'string') {
                    data.sessions = parseInt(data.sessions, 10);
                }
                if (typeof data.date === 'string') {
                    data.date = parseInt(data.date, 10);
                }

                if (typeof data.returns === 'string') {
                    data.returns = parseInt(data.returns, 10);
                }
                

                if(data.sessions === 0){
                    const updateUser = await User.updateOne({phoneNumber: number}, {$set: {package: {name: null, sessions: null, price: null}}, $push: {history: data}});
                    if(updateUser.modifiedCount > 0){
                        return res.status(200).send({message: 'تم تعديل الباكيدچ بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                    }
                }

                const updatePackage = await User.updateOne({phoneNumber: number}, {$set: {package: data}});
                if(updatePackage.modifiedCount > 0){
                    return res.status(200).send({message: 'تم تعديل الباكيدچ بنجاح'})
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                }

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

        else if(req.query.method === 'edit-package-of-non-user'){
            try {
                const regex = /^\+/;
                const localRegex = /^0/;
                const number = !regex.test(req.query.phoneNumber) && !localRegex.test(req.query.phoneNumber) ? `+${req.query.phoneNumber.trim()}` : req.query.phoneNumber;
                const data = req.body.package;

                // Convert string numeric values to numbers
                if (typeof data.paid === 'string') {
                data.paid = parseInt(data.paid, 10);
                }
                if (typeof data.off === 'string') {
                    data.off = parseInt(data.off, 10);
                }
                if (typeof data.remaining === 'string') {
                    data.remaining = parseInt(data.remaining, 10);
                }
                if (typeof data.price === 'string') {
                    data.price = parseInt(data.price, 10);
                }
                if (typeof data.sessions === 'string') {
                    data.sessions = parseInt(data.sessions, 10);
                }
                if (typeof data.date === 'string') {
                    data.date = parseInt(data.date, 10);
                }

                if (typeof data.returns === 'string') {
                    data.returns = parseInt(data.returns, 10);
                }
                

                if(data.sessions === 0 && data.status === 'ملغية'){
                    const updateUser = await NonUser.updateOne({phoneNumber: number}, {$set: {package: {name: null, sessions: null, price: null}}, $push: {history: data}});
                    if(updateUser.modifiedCount > 0){
                        return res.status(200).send({message: 'تم تعديل الباكيدچ بنجاح'})
                    }else{
                        return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                    }
                }

                const updatePackage = await NonUser.updateOne({phoneNumber: number}, {$set: {package: data}});
                if(updatePackage.modifiedCount > 0){
                    return res.status(200).send({message: 'تم تعديل الباكيدچ بنجاح'})
                }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
                }

            } catch (error) {
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'});
            }
        }

        else if(req.query.method === 'update-reservation-payment'){
            try {
                // Parse the serial from the request query
                const reservationSerial = parseInt(req.query.serial);
                const value = req.query.value === 'true' ? true : false;
            
                // Find and update the specific reservation paymentStatus
                const result = await Schedule.updateOne(
                    {
                      "doctors.reservations.reservationSerial": reservationSerial // Match the reservation by reservationSerial
                    },
                    {
                      $set: {
                        "doctors.$[].reservations.$[reservation].paymentStatus": value,  // Fields you want to update
                      }
                    },
                    {
                      arrayFilters: [
                        { "reservation.reservationSerial": reservationSerial } // Filter to update the right reservation
                      ]
                    }
                  );
            
                if (!result) {
                  return res.status(404).send({ message: 'الحجز غير موجود' });
                }
            
                return res.status(200).send({ message: 'تم تعديل الحجز بنجاح'});
              } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'حدث خطأ اثناء تنفيذ العملية' });
              }
        }
    }

}



export const config = {
    api: {
        externalResolver: true,
    },
};
