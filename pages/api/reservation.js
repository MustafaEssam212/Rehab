import dbConnect from "@/utils/dbConnect";
import Schedule from "@/Models/Schedule";



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
                  whatsAppNumber: req.body.whatsAppNumber
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
  
                if(update){
                  return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
                }else{
                  return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
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
                whatsAppNumber: req.body.whatsAppNumber
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

              if(update){
                return res.status(200).send({message: 'لقد تم الحجز بنجاح'})
              }else{
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
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
