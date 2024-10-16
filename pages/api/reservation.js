import dbConnect from "@/utils/dbConnect";
import Schedule from "@/Models/Schedule";
import User from "@/Models/User";



export default async function Reservation(req, res) {
    await dbConnect();

    if(req.method === 'POST'){
        if(req.query.method === 'post-reservation'){
           
            try {
             

           const getCounter = await Schedule.aggregate([

            {
              $match: {
                date: req.body.date
              }
            },
          
 
            { $unwind: "$doctors" },
            { $unwind: "$doctors.reservations" },
            
     
            {
              $match: {
                "doctors.reservations.userID": req.body.userID
              }
            },
            

            {
              $group: {
                _id: null,
                reservationCount: { $sum: 1 }
              }
            },

            {
              $project: {
                _id: 0,
                reservationCount: 1
              }
            }
          ]);


          if(getCounter[0]){
            if(getCounter[0].reservationCount >= 2){
              return res.status(400).send({message: `لقد قمت بالحجز مرتين ليوم ${req.body.date} وهو اقصى حد للحجز في اليوم الواحد`})
            }else{
  
  
              const reservationSerial = Math.floor(100000000 + Math.random() * 900000000);
              const newReservation = {
                  reservationName: req.body.reservationName,
                  reservationTime: req.body.reservationTime,
                  reservationSerial,
                  userNumber: req.body.userNumber,
                  userID: req.body.userID,
                  category: req.body.category,
                  whatsAppNumber: req.body.whatsAppNumber,
                  paymentStatus: req.body.paymentStatus,
                  price: parseInt(req.body.price)
              }
  
              const update = await Schedule.updateOne(
                  {
                    date: req.body.date, 
                    "doctors.doctor": req.body.doctorSerial
                  },
                  {
                    $push: { "doctors.$.reservations": newReservation }
                  }
              );

              if(req.body.paymentStatus){
                const getUserInfo = await User.findOne({_id: req.body.userID}, {_id: false, package: true});

                if(getUserInfo.package.sessions - 1 !== 0){
                    const updateUser = await User.updateOne(
                      { _id: req.body.userID},
                      { $inc: { "package.sessions": -1 } }
                    );
  
                    if(updateUser.modifiedCount > 0 && update.modifiedCount > 0){
                      return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
                    }else{
                      return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }
  
                }else{
                  const updateUser = await User.updateOne(
                    { _id: req.body.userID},
                    { $set: {package: {name: null, sessions: null, price: null}} }
                  );
  
                  if(updateUser.modifiedCount > 0 && update.modifiedCount > 0){
                    return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
                  }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                  }
                }
              }else{
                if(update.modifiedCount > 0){
                  return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
                }else{
                  return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
              }




  

  
            }
          }else{


            
            const reservationSerial = Math.floor(100000000 + Math.random() * 900000000);
            const newReservation = {
                reservationName: req.body.reservationName,
                reservationTime: req.body.reservationTime,
                reservationSerial,
                userNumber: req.body.userNumber,
                userID: req.body.userID,
                category: req.body.category,
                whatsAppNumber: req.body.whatsAppNumber,
                paymentStatus: req.body.paymentStatus,
                price: parseInt(req.body.price)
            }

            const update = await Schedule.updateOne(
                {
                  date: req.body.date, 
                  "doctors.doctor": req.body.doctorSerial
                },
                {
                  $push: { "doctors.$.reservations": newReservation }
                }
              );

              if(req.body.paymentStatus){
                const getUserInfo = await User.findOne({_id: req.body.userID}, {_id: false, package: true});

                if(getUserInfo.package.sessions - 1 !== 0){
                    const updateUser = await User.updateOne(
                      { _id: req.body.userID},
                      { $inc: { "package.sessions": -1 } }
                    );
  
                    if(updateUser.modifiedCount > 0 && update.modifiedCount > 0){
                      return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
                    }else{
                      return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                    }
  
                }else{
                  const updateUser = await User.updateOne(
                    { _id: req.body.userID},
                    { $set: {package: {name: null, sessions: null, price: null}} }
                  );
  
                  if(updateUser.modifiedCount > 0 && update.modifiedCount > 0){
                    return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
                  }else{
                    return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                  }
                }
              }else{
                if(update.modifiedCount > 0){
                  return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
                }else{
                  return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
                }
              }

          }
              

            } catch (error) {
              console.log(error)
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
