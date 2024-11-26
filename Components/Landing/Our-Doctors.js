import Image from "next/image";
import DocOne from '../../public/doc-mohamed-2.png';
import DocTwo from '../../public/doc2.png';

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
                            <Image sizes="(min-width: 2060px) 600px, (min-width: 1940px) 500px, (min-width: 1720px) 450px, (min-width: 980px) 400px, (min-width: 860px) 350px, (min-width: 760px) 300px, 280px" loading="lazy" src={DocOne.src} fill style={{objectFit: 'contain'}} alt="Doctor In Rehab EG Center"></Image>
                        </div>

                        <div className="bottom-doctor-card">
                            <h2><span>/د</span> محمد يحي جمال الدين</h2>
                            <h3>دكتوراه علاج طبيعي</h3>
                        </div>

                    </div>


                    <div className="doctor-card">
                        
                        <div className="top-doctor-card">
                            <Image sizes="(min-width: 2060px) 600px, (min-width: 1940px) 500px, (min-width: 1720px) 450px, (min-width: 980px) 400px, (min-width: 860px) 350px, (min-width: 760px) 300px, 280px" loading="lazy" src={DocTwo.src} fill style={{objectFit: 'contain'}} alt="Doctor In Rehab EG Center"></Image>
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