import Doctor from "@/Models/Doctor";
import dbConnect from "@/utils/dbConnect";
import { IncomingForm } from 'formidable';
import mv from 'mv';
import fs from 'fs/promises';
import Blog from "@/Models/Blog";

export default async function Upload(req, res) {
    await dbConnect();
    const form = new IncomingForm();

    if (req.method === 'POST' && req.query.method === 'add-doctor') {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تحليل البيانات' });
            }

            const doctorName = fields.name[0];
            const doctorCover = files.cover[0];

            if (!doctorName || !doctorCover) {
                return res.status(400).send({ message: 'من فضلك قم بإدخال المعلومات المطلوبة' });
            }

            try {
                const doctorSerial = Math.floor(100000000 + Math.random() * 900000000);
                const directoryPath = `./uploads/doctors/${doctorSerial}`;
                const coverName = Date.now() + doctorCover.originalFilename.replace(/\s/g, '');
                
                await fs.mkdir(directoryPath, { recursive: true });

                const newPathOfCover = `${directoryPath}/${coverName}`;

                await new Promise((resolve, reject) => {
                    mv(doctorCover.filepath, newPathOfCover, (err) => {
                        if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                        resolve();
                    });
                });



                const newDoctor = new Doctor({
                    name: doctorName,
                    cover: `${coverName}`,
                    serial: doctorSerial,
                });

                await newDoctor.save();
                res.status(200).send({ message: 'تم اضافة الدكتور بنجاح' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'حدث خطأ اثناء تنفيذ العملية' });
            }
        });
    }
    
    else if(req.method === 'POST' && req.query.method === 'add-blog'){
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).send({ message: 'حدث خطأ اثناء تحليل البيانات' });
            }

            try {

       
            const blogNameForStorage = fields.name[0].replace(/ /g, '_');
            const blogNameForDatabase = fields.name[0];
            const blogSerial = Math.floor(100000000 + Math.random() * 900000000);
            const blogKeywords = JSON.parse(fields.keywords[0]);;
            const blogDescription = fields.description[0];
            const blogHTML = fields.html[0];
            const directoryPath = `./uploads/blogs/${blogNameForStorage}`;
            const coverName = Date.now() + files.cover[0].originalFilename.replace(/\s/g, '');
            const newPathOfCover = `${directoryPath}/${coverName}`;


            const findBlog = await Blog.findOne({name: blogNameForDatabase});
            if(findBlog){
                return res.status(400).send({message: `هناك مدونة موجودة مسبقاً بنفس الإسم`})
            }else{


                await fs.mkdir(directoryPath, { recursive: true });

                await new Promise((resolve, reject) => {
                    mv(files.cover[0].filepath, newPathOfCover, (err) => {
                        if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                        resolve();
                    });
                });
    
    
                const formatDate = (timestamp) => {
                    const date = new Date(timestamp); // Create a Date object from the timestamp
                
                    // Extract day, month, and year
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // Months are 0-based, so add 1
                    const year = date.getFullYear();
                
                    // Format day and month to ensure two digits if needed
                    const formattedDay = day < 10 ? `0${day}` : day;
                    const formattedMonth = month < 10 ? `0${month}` : month;
                
                    // Return the formatted date string
                    return `${formattedDay}/${formattedMonth}/${year}`;
                };
    
                const newBlog = new Blog({
                    name: blogNameForDatabase,
                    cover: `${coverName}`,
                    serial: blogSerial,
                    keywords: blogKeywords,
                    description: blogDescription,
                    html: blogHTML,
                    date: formatDate(Date.now())
                });
    
                await newBlog.save();
                return res.status(200).send({message: 'تم اضافة المدونة بنجاح'})

            }

            

                
            } catch (error) {
                console.log(error)
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
      

        });
    }

    else {
        res.status(405).send({ message: 'غير مسموح بطريقة الطلب' });
    }
}

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
    },
};
