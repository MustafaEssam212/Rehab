import dbConnect from "@/utils/dbConnect";
import bcrypt from 'bcryptjs';
import User from "@/Models/User";
import isValidEmail from "@/utils/isValidEmail";
import isValidEgyptianPhoneNumber from "@/utils/isValidEgyptianNumber";

 export default async function Register(req, res) {
     await dbConnect();
     
     if(req.method === 'POST'){


          if(req.query.lang === 'ar'){


            const hasEmptyFields = Object.values(req.body).some(value => value === '');
            if(hasEmptyFields){
              return res.status(400).send({message: `برجاء ملئ جميع المعلومات المطلوبة`})
            }else{


              if(!isValidEmail(req.body.email)){
                return res.status(400).send({message: `برجاء ادخال ايميل صحيح`})
              }
              else if(req.body.confirmPassword !== req.body.password){
                return res.status(400).send({message: `تأكيد الرقم السري غير متطابق`})
              }
              
              else if(isValidEgyptianPhoneNumber(req.body.phoneNumber) === false){
                return res.status(400).send({message: `برجاء ادخال رقم هاتف صحيح`})
              }

              else if(req.body.password.length <= 7){
                return res.status(400).send({message: `برجاء ادخال كلمة مرور اكبر من 7 احرف او ارقام`})
              }
              
              else{


                 try {

                    // Checking if Email already Exists

                    const checkEmail = await User.findOne({email: req.body.email});
                    const checkPhoneNumber = await User.findOne({phoneNumber: req.body.phoneNumber});
                  if(checkEmail){
                    return res.status(400).send({message: `هذا الايميل موجود بالفعل`})
                  }
                  
                  else if(checkPhoneNumber){
                    return res.status(400).send({message: `رقم الهاتف مستعمل من قبل`})
                  }
                  
                  else{


                        // Hashing Password
                        const salt = await bcrypt.genSalt(10);
                        const hash = await bcrypt.hash(req.body.password, salt);


                        var {password, confirmPassword, ...user} = req.body;
                        user.password = hash;

                        const newUser = new User(user)
                        newUser.save();

                        return res.status(200).send({message: `تم التسجيل بنجاح`})


                  }


                  
                 } catch (error) {
                    return res.status(500).send({message: `حدث خطأ اثناء عملية التسجيل`})
                 }


              }


            }


          }


     }

    
 }




 export const config = {
    api: {
      externalResolver: true,
    },
  }