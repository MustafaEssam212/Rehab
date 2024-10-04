import Doctor from "@/Models/Doctor";
import dbConnect from "@/utils/dbConnect";
import { IncomingForm } from 'formidable';
import mv from 'mv';
import fs from 'fs/promises';
import Blog from "@/Models/Blog";
import Work from "@/Models/Work";
import Review from "@/Models/Review";

export default async function Upload(req, res) {
    await dbConnect();
    const form = new IncomingForm();
    form.multiples = true; 

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
            const blogKeywords = JSON.parse(fields.keywords[0]);
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
      
                return res.status(500).send({message: 'حدث خطأ اثناء تنفيذ العملية'})
            }
      

        });
    }

    else if(req.method === 'POST' && req.query.method === 'add-previous-work'){
        form.parse(req, async (err, fields, files) => {


            const workNameForStorage = fields.name[0].replace(/ /g, '_');
            const workNameForDatabase = fields.name[0];
            const workKeywords = JSON.parse(fields.keywords[0]);
            const workDescription = fields.description[0];
            const directoryPath = `./uploads/works/${workNameForStorage}`;
            const workType = fields.type[0];


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


            const findWork = await Work.findOne({name: workNameForDatabase});

            if(findWork){
                return res.status(400).send({message: 'هذا الاسم موجود في عمل سابق'})
            }else{

                if(workType === 'صورة'){

                    const picName = Date.now() + files.pic[0].originalFilename.replace(/\s/g, '');
                    const newPathOfPic = `${directoryPath}/${picName}`;
    
                    await fs.mkdir(directoryPath, { recursive: true });
    
                    await new Promise((resolve, reject) => {
                        mv(files.pic[0].filepath, newPathOfPic, (err) => {
                            if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                            resolve();
                        });
                    });
        
        
                    const newWork = new Work({
                        name: workNameForDatabase,
                        pic: `${picName}`,
                        keywords: workKeywords,
                        description: workDescription,
                        date: formatDate(Date.now()),
                        type: workType
                    });
        
                    await newWork.save();
                    return res.status(200).send({message: 'تم اضافة العمل بنجاح'})
    
                }

                else if(workType === 'مجموعة صور'){
                

                    const galleryFiles = files.gallery;
                    const galleryPicNames = [];
        
   
                    await fs.mkdir(directoryPath, { recursive: true });
        
                    for (let i = 0; i < galleryFiles.length; i++) {
                        const picName = Date.now() + galleryFiles[i].originalFilename.replace(/\s/g, '');
                        const newPathOfPic = `${directoryPath}/${picName}`;
        
    
                        await new Promise((resolve, reject) => {
                            mv(galleryFiles[i].filepath, newPathOfPic, (err) => {
                                if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                                resolve();
                            });
                        });
        
 
                        galleryPicNames.push(picName);
                    }
        
       
                    const newWork = new Work({
                        name: workNameForDatabase,
                        gallery: galleryPicNames,
                        keywords: workKeywords,
                        description: workDescription,
                        date: formatDate(Date.now()),
                        type: workType,
                    });
        
                    await newWork.save();
                    return res.status(200).send({ message: 'تم اضافة العمل بنجاح' });

                }

                else if(workType === 'فيديو'){
                    const videoName = Date.now() + files.video[0].originalFilename.replace(/\s/g, '');
                    const videoThumbnail = Date.now() + files.thumbnail[0].originalFilename.replace(/\s/g, '');
                    const newPathOfVideo = `${directoryPath}/${videoName}`;
                    const newPathOfThumbnail = `${directoryPath}/${videoThumbnail}`;
    
                    await fs.mkdir(directoryPath, { recursive: true });
    
                    await new Promise((resolve, reject) => {
                        mv(files.video[0].filepath, newPathOfVideo, (err) => {
                            if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                            resolve();
                        });
                    });

                    await new Promise((resolve, reject) => {
                        mv(files.thumbnail[0].filepath, newPathOfThumbnail, (err) => {
                            if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                            resolve();
                        });
                    });
        
        
                    const newWork = new Work({
                        name: workNameForDatabase,
                        video: `${videoName}`,
                        keywords: workKeywords,
                        description: workDescription,
                        date: formatDate(Date.now()),
                        type: workType,
                        videoThumbnail: videoThumbnail
                    });
        
                    await newWork.save();
                    return res.status(200).send({message: 'تم اضافة العمل بنجاح'})
                }

            }

            
        })
    }


    else if(req.method === 'POST' && req.query.method === 'add-review'){
        form.parse(req, async (err, fields, files) => {

            console.log(fields, files)
            const workNameForStorage = fields.name[0].replace(/ /g, '_');
            const workNameForDatabase = fields.name[0];
            const workKeywords = JSON.parse(fields.keywords[0]);
            const workDescription = fields.description[0];
            const directoryPath = `./uploads/reviews/${workNameForStorage}`;
            const workType = fields.type[0];


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


            const findWork = await Work.findOne({name: workNameForDatabase});

            if(findWork){
                return res.status(400).send({message: 'هذا الاسم موجود في عمل سابق'})
            }else{

                if(workType === 'صورة'){

                    const picName = Date.now() + files.pic[0].originalFilename.replace(/\s/g, '');
                    const newPathOfPic = `${directoryPath}/${picName}`;
    
                    await fs.mkdir(directoryPath, { recursive: true });
    
                    await new Promise((resolve, reject) => {
                        mv(files.pic[0].filepath, newPathOfPic, (err) => {
                            if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                            resolve();
                        });
                    });
        
        
                    const newWork = new Review({
                        name: workNameForDatabase,
                        pic: `${picName}`,
                        keywords: workKeywords,
                        description: workDescription,
                        date: formatDate(Date.now()),
                        type: workType
                    });
        
                    await newWork.save();
                    return res.status(200).send({message: 'تم اضافة الرأي بنجاح'})
    
                }

                else if(workType === 'مجموعة صور'){
                

                    const galleryFiles = files.gallery;
                    const galleryPicNames = [];
        
   
                    await fs.mkdir(directoryPath, { recursive: true });
        
                    for (let i = 0; i < galleryFiles.length; i++) {
                        const picName = Date.now() + galleryFiles[i].originalFilename.replace(/\s/g, '');
                        const newPathOfPic = `${directoryPath}/${picName}`;
        
    
                        await new Promise((resolve, reject) => {
                            mv(galleryFiles[i].filepath, newPathOfPic, (err) => {
                                if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                                resolve();
                            });
                        });
        
 
                        galleryPicNames.push(picName);
                    }
        
       
                    const newWork = new Review({
                        name: workNameForDatabase,
                        gallery: galleryPicNames,
                        keywords: workKeywords,
                        description: workDescription,
                        date: formatDate(Date.now()),
                        type: workType,
                    });
        
                    await newWork.save();
                    return res.status(200).send({ message: 'تم اضافة الرأي بنجاح' });

                }

                else if(workType === 'فيديو'){
                    const videoName = Date.now() + files.video[0].originalFilename.replace(/\s/g, '');
                    const videoThumbnail = Date.now() + files.thumbnail[0].originalFilename.replace(/\s/g, '');
                    const newPathOfVideo = `${directoryPath}/${videoName}`;
                    const newPathOfThumbnail = `${directoryPath}/${videoThumbnail}`;
    
                    await fs.mkdir(directoryPath, { recursive: true });
    
                    await new Promise((resolve, reject) => {
                        mv(files.video[0].filepath, newPathOfVideo, (err) => {
                            if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                            resolve();
                        });
                    });

                    await new Promise((resolve, reject) => {
                        mv(files.thumbnail[0].filepath, newPathOfThumbnail, (err) => {
                            if (err) return reject('حدث خطأ اثناء تنفيذ العملية');
                            resolve();
                        });
                    });
        
        
                    const newWork = new Review({
                        name: workNameForDatabase,
                        video: `${videoName}`,
                        keywords: workKeywords,
                        description: workDescription,
                        date: formatDate(Date.now()),
                        type: workType,
                        videoThumbnail: videoThumbnail
                    });
        
                    await newWork.save();
                    return res.status(200).send({message: 'تم اضافة الرأي بنجاح'})
                }

            }

            
        })
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
