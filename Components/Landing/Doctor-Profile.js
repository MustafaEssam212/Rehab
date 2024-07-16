
import Image from "next/image";
import DoctorProfileImage from '../../public/doc-mohamed.png';
import { motion } from "framer-motion";
import ToolPic from '../../public/tool.png';


const DoctorProfile = () => {
    
    return(
        <div className="doctor-landing-container">
            
            <div className="doctor-landing-inner">

                <div className="doctor-landing-left">

                    <div className="background-doctor"><motion.div initial={{y: 0, x: 0}} animate={{y: 30, x: 30}} transition={{ease: 'linear', duration: 1.5, repeat: Infinity, repeatType:"reverse"}} className="background-one"></motion.div> <motion.div initial={{y: 0, x: 0}} animate={{y: -30, x: -30}} transition={{ease: 'linear', duration: 1.5, repeat: Infinity, repeatType:"reverse"}} className="background-two"></motion.div></div>
                    <div className="img-container">
                        <Image src={DoctorProfileImage.src} fill style={{objectFit: 'contain'}} alt="Doctor In Rehab EG Center"></Image>
                    </div>

                </div>


                <div className="doctor-landing-right">
                    <div className="doctor-right-container">
                        <motion.div initial={{y: 0}} animate={{y: 50}} transition={{ease: 'linear', duration: 1.5, repeat: Infinity, repeatType:"reverse"}} className="background-doctor-right"><Image sizes="(min-width: 1120px) calc(42.5vw - 50px), 100vw" src={ToolPic.src} fill style={{objectFit: 'contain'}} alt="Rehab EG Center"></Image></motion.div>
                        <div className="layer-on-background">
                            <h1>دكتور محمد يحي جمال الدين</h1>
                            <h2>دكتوراه علاج طبيعي</h2>

                            <div className="layer-on-notes">
                                <div className="note"><span className="dot"></span> <h3>حاصل على دكتوراه اكلينيكية في العلاج الطبيعي لامراض المخ والاعصاب جامعة القاهره</h3></div>
                                <div className="note"><span className="dot"></span> <h3>حاصل علي دبلومة التاهيل من منظمة اصابات الحبل الشوكي الدوليه</h3></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default DoctorProfile;