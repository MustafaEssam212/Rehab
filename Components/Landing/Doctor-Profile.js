
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
                        <Image sizes="(min-width: 1120px) calc(42.5vw - 50px), 95vw" src={DoctorProfileImage.src} fill style={{objectFit: 'contain'}} alt="Doctor In Rehab EG Center"></Image>
                    </div>

                </div>


                <div className="doctor-landing-right">
                    <div className="doctor-right-container">
                        <motion.div initial={{y: 0}} animate={{y: 50}} transition={{ease: 'linear', duration: 1.5, repeat: Infinity, repeatType:"reverse"}} className="background-doctor-right"><Image sizes="(min-width: 1120px) calc(42.5vw - 50px), 100vw" src={ToolPic.src} fill style={{objectFit: 'contain'}} alt="Rehab EG Center"></Image></motion.div>
                        <div className="layer-on-background">
                            <h1>دكتور محمد يحي جمال الدين</h1>
                            <h2>استشاري العلاج الطبيعي - دكتوراه علاج طبيعي وتأهيل</h2>

                            <div className="layer-on-notes">
                                <div className="note"><span className="dot"></span> <h3>دكتوراه العلاج الطبيعي والتأهيل جامعة القاهرة</h3></div>
                                <div className="note"><span className="dot"></span> <h3>(MSA) مدرس بكلية العلاج الطبيعي جامعة اكتوبر للعلوم الحديثة والآداب</h3></div>
                                <div className="note"><span className="dot"></span> <h3>دبلومة التغذية العلاجية المعهد القومي للتغذية جامعة القاهرة</h3></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default DoctorProfile;