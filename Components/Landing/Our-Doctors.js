import Image from "next/image";
import DocOne from '../../public/doc1.jpg';
import DocTwo from '../../public/doc2.jpg';

const OurDoctors = () => {
    return(
        <div className="landing-our-doctors-container">
            <div className="global-headline">
                <h1>أطباؤنا</h1>
                <div className="global-headline-line"></div>
            </div>

            <div className="landing-our-doctors-content">

                    <div className="doctor-card">
                        
                        <div className="top-doctor-card">
                            <Image src={DocOne.src} fill style={{objectFit: 'contain'}} alt="Doctor In Rehab EG Center"></Image>
                        </div>

                        <div className="bottom-doctor-card">
                            <h2><span>/د</span> محمد يحي جمال الدين</h2>
                            <h3>اخصائي علاج طبيعي</h3>
                        </div>

                    </div>


                    <div className="doctor-card">
                        
                        <div className="top-doctor-card">
                            <Image src={DocTwo.src} fill style={{objectFit: 'contain'}} alt="Doctor In Rehab EG Center"></Image>
                        </div>

                        <div className="bottom-doctor-card">
                            <h2><span>/د</span> محمد احمد محمود</h2>
                            <h3>اخصائي علاج طبيعي</h3>
                        </div>

                    </div>



            </div>
        </div>
    )
}


export default OurDoctors;