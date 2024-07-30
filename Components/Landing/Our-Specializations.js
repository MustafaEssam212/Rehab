import Image from "next/image";
import SpecializationPicOne from '../../public/specialization1.png';
import SpecializationPicTwo from '../../public/specialization2.jpg';
import SpecializationPicThree from '../../public/specialization3.webp';
import Link from "next/link";


const OurSpecializations = () => {
    return(
        <div className="our-specializations-landing">
            <div className="global-headline">
                <h1>تخصصاتنا</h1>
                <div className="global-headline-line"></div>
            </div>

            <div className="our-specializations-content">
                
                <Link href="/specialization/تأهيل_حالات_العظام_والعمود_الفقري" className="specialization-section" title="تأهيل حالات العظام والعمود الفقري في مركز ريهاب للعلاج الطبيعي">
                    <div className="img-container"><Image sizes="(min-width: 2060px) 550px, (min-width: 1940px) 500px, (min-width: 1720px) 450px, (min-width: 1540px) 400px, (min-width: 1280px) 350px, 300px" src={SpecializationPicOne.src} alt="تأهيل حالات العظام والعمود الفقري في مركز ريهاب للعلاج الطبيعي" fill style={{objectFit: 'cover'}} loading="lazy"></Image></div>
                    <div className="specialization-info">
                        <h2>تأهيل حالات العظام والعمود الفقري</h2>
                        <h4>يعتبر تأهيل حالات العظام والعمود الفقري من الأمور الحيوية التي يحتاجها العديد من الأشخاص الذين يعانون من إصابات أو أمراض تؤثر على الهيكل العظمي والعمود الفقري</h4>
                    </div>
                </Link>


                <Link href="/specialization/تأهيل_حالات_الأعصاب_والشلل_بأنواعه" className="specialization-section" title="تأهيل حالات الأعصاب والشلل بأنواعه في مركز ريهاب للعلاج الطبيعي">
                    <div className="img-container"><Image sizes="(min-width: 2060px) 550px, (min-width: 1940px) 500px, (min-width: 1720px) 450px, (min-width: 1540px) 400px, (min-width: 1280px) 350px, 300px" src={SpecializationPicTwo.src} alt="تأهيل حالات الأعصاب والشلل بأنواعه في مركز ريهاب للعلاج الطبيعي" fill style={{objectFit: 'cover'}} loading="lazy"></Image></div>
                    <div className="specialization-info">
                        <h2>تأهيل حالات الأعصاب والشلل بأنواعه</h2>
                        <h4>تُعتبر تأهيل حالات الأعصاب والشلل بأنواعه من التحديات الكبيرة في مجال العلاج الطبيعي. تُصاب الأعصاب بالعديد من الأمراض والإصابات التي تؤدي إلى فقدان القدرة على الحركة والشعور</h4>
                    </div>
                </Link>



                <Link href="/specialization/قسم_السمنة_وتنسيق_القوام" className="specialization-section" title="قسم السمنة وتنسيق القوام في مركز ريهاب للعلاج الطبيعي">
                    <div className="img-container"><Image sizes="(min-width: 2060px) 550px, (min-width: 1940px) 500px, (min-width: 1720px) 450px, (min-width: 1540px) 400px, (min-width: 1280px) 350px, 300px" src={SpecializationPicThree.src} alt="قسم السمنة وتنسيق القوام في مركز ريهاب للعلاج الطبيعي" fill style={{objectFit: 'cover'}} loading="lazy"></Image></div>
                    <div className="specialization-info">
                        <h2>قسم السمنة وتنسيق القوام</h2>
                        <h4>تُعتبر السمنة وتنسيق القوام من القضايا الصحية والجمالية التي تؤثر على حياة العديد من الأشخاص. يسعى الكثيرون إلى تحقيق وزن صحي وجسم متناسق بطرق فعّالة وآمنة</h4>
                    </div>
                </Link>

            </div>
        </div>
    )
}


export default OurSpecializations;