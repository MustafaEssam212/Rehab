import Prices from "@/Models/Prices";
import dbConnect from "@/utils/dbConnect";
import User from "@/Models/User";


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
                            return res.status(200).send({message: 'تم انشاء الباكيدچ بنجاح'})
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
                const updateUser = await User.updateOne({phoneNumber: data.user.phoneNumber}, {$set: {package: {name: data.package.name, sessions: parseInt(data.package.sessions), price: parseInt(data.package.price)}}});

                if(updateUser.modifiedCount > 0){
                 return res.status(200).send({message: 'تم اضافة الباكيدچ بنجاح'})
                }else{
             
                 return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }


            } catch (error) {
            
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
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
    }

}



export const config = {
    api: {
        externalResolver: true,
    },
};
