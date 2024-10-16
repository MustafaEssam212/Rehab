
import Image from "next/image";
import SpecializationCoverPicOne from '../../public/specialization-1-cover.png';
import SpecializationCoverPicTwo from '../../public/specialization-2-cover.png';
import SpecializationCoverPicThree from '../../public/specialization-3-cover.png';
import SpecializationNormalPic from '../../public/specialization1.png';
import SpecializationNormalPicTwo from '../../public/specialization2.jpg';
import SpecializationNormalPicThree from '../../public/specialization3.webp';
import Link from "next/link";
import { FaUserDoctor, FaCalendar } from "react-icons/fa6";
import { NextSeo } from 'next-seo';
import BlogOneImage from '../../public/blog1.jpg';
import BlogTwoImage from '../../public/blog2.jpg';
import BlogThreeImage from '../../public/blog3.webp';


export async function getServerSideProps(context) {
    const { specialization } = context.params;
    const formatted = specialization.replace(/_/g, ' ');
  
    const getData = (param) => {
      switch (param) {
        case 'تأهيل حالات العظام والعمود الفقري':
          return {
            title: 'تأهيل حالات العظام والعمود الفقري',
            sections: [
              {
                header: 'مقدمة',
                content: 'يعتبر تأهيل حالات العظام والعمود الفقري من الأمور الحيوية التي يحتاجها العديد من الأشخاص الذين يعانون من إصابات أو أمراض تؤثر على الهيكل العظمي والعمود الفقري. تتضمن هذه الإصابات مشاكل مثل الانزلاق الغضروفي، الكسور، التهاب المفاصل، وأمراض العمود الفقري المزمنة. يلعب العلاج الطبيعي دورًا كبيرًا في تأهيل هذه الحالات، حيث يوفر نهجًا شاملًا لتحسين جودة الحياة والحد من الألم.',
              },
              {
                header: 'دور مركز ريهاب للعلاج الطبيعي',
                content: 'يقدم مركز ريهاب للعلاج الطبيعي خدمات متكاملة ومتخصصة لتأهيل حالات العظام والعمود الفقري. يضم المركز فريقًا من الأطباء المختصين والمعالجين الطبيعيين الذين يتمتعون بخبرة واسعة في التعامل مع مختلف الإصابات والحالات الصحية. يهدف المركز إلى تقديم رعاية شاملة ومخصصة لكل مريض لضمان تحقيق أفضل النتائج الممكنة.',
              },
              {
                header: 'أساليب التأهيل في مركز ريهاب للعلاج الطبيعي',
                subsections: [
                  {
                    subheader: 'العلاج اليدوي',
                    content: 'يستخدم المعالجون الطبيعيون في مركز ريهاب تقنيات العلاج اليدوي لتحسين حركة المفاصل والعضلات، والتخفيف من الألم. تشمل هذه التقنيات التدليك، تحريك المفاصل، وتحرير الأنسجة العضلية.',
                  },
                  {
                    subheader: 'التمارين العلاجية',
                    content: 'عد التمرين جزءًا أساسيًا من برامج التأهيل في مركز ريهاب للعلاج الطبيعي. يتم تصميم برامج التمارين وفقًا لاحتياجات كل مريض، وتهدف إلى تقوية العضلات، تحسين التوازن، وزيادة المرونة.',
                  },
                  {
                    subheader: 'العلاج الكهربائي',
                    content: 'يستخدم العلاج الكهربائي في مركز ريهاب للعلاج الطبيعي لتخفيف الألم وتحفيز عملية الشفاء. تشمل هذه التقنيات التحفيز الكهربائي للأعصاب والعضلات، والعلاج بالموجات فوق الصوتية.',
                  },
                ],
              },
              {
                header: 'فوائد التأهيل في مركز ريهاب للعلاج الطبيعي',
                content: [
                  'تخفيف الألم بشكل فعال',
                  'تحسين حركة المفاصل والعضلات',
                  'زيادة المرونة والقوة العضلية',
                  'تحسين التوازن ومنع السقوط',
                  'تعزيز القدرة على القيام بالأنشطة اليومية بشكل مستقل',
                ],
              },
              {
                header: 'خاتمة',
                content: 'يعد تأهيل حالات العظام والعمود الفقري أمرًا بالغ الأهمية للعديد من الأشخاص الذين يعانون من مشاكل في الهيكل العظمي والعمود الفقري. من خلال زيارة مركز ريهاب للعلاج الطبيعي، يمكن للمرضى الحصول على رعاية متخصصة وشاملة تساعدهم على تحسين جودة حياتهم والتعافي بشكل أفضل وأسرع. يوفر المركز برامج علاجية مخصصة لكل مريض، ويستخدم أحدث التقنيات والأساليب لضمان تحقيق أفضل النتائج الممكنة.',
              },
            ],
            tags: ['تأهيل_العظام', 'علاج_العمود_الفقري', 'آلام_الظهر', 'علاج_الألم', 'علاج_الكسور', 'تقوية_العظام', 'علاج_الغضاريف', 'علاج_الجنف', 'عناية_بالعظام', 'إعادة_التأهيل',]
          };
        case 'تأهيل حالات الأعصاب والشلل بأنواعه':
          return {
            title: 'تأهيل حالات الأعصاب والشلل بأنواعه',
            sections: [
              {
                header: 'مقدمة',
                content: 'تُعتبر تأهيل حالات الأعصاب والشلل بأنواعه من التحديات الكبيرة في مجال العلاج الطبيعي. تُصاب الأعصاب بالعديد من الأمراض والإصابات التي تؤدي إلى فقدان القدرة على الحركة والشعور، ما يتطلب تدخلًا متخصصًا لاستعادة الوظائف الحيوية وتحسين جودة الحياة. مركز ريهاب للعلاج الطبيعي يُقدّم نهجًا شاملًا ومتكاملًا لتأهيل هذه الحالات، بالاعتماد على خبرات واسعة وتقنيات حديثة.',
              },
              {
                header: 'دور مركز ريهاب للعلاج الطبيعي',
                content: 'يُقدّم مركز ريهاب للعلاج الطبيعي خدمات متخصصة وشاملة لتأهيل حالات الأعصاب والشلل. يعمل فريق المركز المتخصص على تصميم برامج علاجية مخصصة لكل مريض، بهدف تحسين القدرة على الحركة، تخفيف الألم، وتعزيز القدرة على القيام بالأنشطة اليومية بشكل مستقل. يضم المركز مجموعة من المعالجين الطبيعيين المتمرسين الذين يستخدمون أحدث التقنيات والأساليب العلاجية.',
              },
              {
                header: 'أساليب التأهيل في مركز ريهاب للعلاج الطبيعي',
                subsections: [
                  {
                    subheader: 'العلاج الطبيعي المكثف',
                    content: 'يشمل العلاج الطبيعي المكثف جلسات علاجية متعددة ومكثفة تهدف إلى تحسين وظائف الأعصاب والعضلات. تُستخدم تقنيات مثل التمارين العلاجية المكثفة، التحفيز الكهربائي، والعلاج بالحرارة والبرودة لتحقيق أفضل النتائج.',
                  },
                  {
                    subheader: 'العلاج الوظيفي',
                    content: 'يركّز العلاج الوظيفي في مركز ريهاب على تحسين قدرة المريض على القيام بالأنشطة اليومية بشكل مستقل. يتم ذلك من خلال تدريبات مخصصة لتحسين التوازن، التنسيق، والمهارات الحركية الدقيقة.',
                  },
                  {
                    subheader: 'العلاج بالماء',
                    content: 'يوفر العلاج بالماء بيئة مثالية لتحسين حركة العضلات والمفاصل دون الضغط الزائد على الجسم. يُساعد الماء في تخفيف الألم وتحسين القدرة على الحركة بفضل خاصية الطفو.',
                  },
                ],
              },
              {
                header: 'فوائد التأهيل في مركز ريهاب للعلاج الطبيعي',
                content: [
                  'تحسين القدرة على الحركة والتنقل',
                  'تخفيف الألم وتحسين الراحة العامة',
                  'تعزيز القدرة على القيام بالأنشطة اليومية بشكل مستقل',
                  'تحسين التوازن ومنع السقوط',
                  'تعزيز الثقة بالنفس وزيادة الاستقلالية',
                ],
              },
              {
                header: 'قصص نجاح',
                content: 'لقد ساعد مركز ريهاب للعلاج الطبيعي العديد من المرضى على تحقيق تقدم ملحوظ في تأهيل حالات الأعصاب والشلل. من خلال البرامج العلاجية المخصصة والدعم المستمر، تمكّن العديد من المرضى من استعادة قدراتهم على الحركة والتحكم بأجسادهم، مما ساعدهم على العيش بحياة أفضل وأكثر استقلالية.',
              },
              {
                header: 'خاتمة',
                content: 'تعد تأهيل حالات الأعصاب والشلل بأنواعه من الجوانب الحيوية في مجال العلاج الطبيعي. بزيارة مركز ريهاب للعلاج الطبيعي، يمكن للمرضى الحصول على رعاية متخصصة وشاملة تُساعدهم على تحسين وظائف الأعصاب والعضلات، واستعادة القدرة على الحركة والقيام بالأنشطة اليومية بشكل مستقل. يُقدّم المركز برامج علاجية مخصصة لكل مريض، ويستخدم أحدث التقنيات والأساليب لضمان تحقيق أفضل النتائج الممكنة.',
              },
            ],
            tags: ['تأهيل_الأعصاب', 'شلل', 'إعادة_تأهيل', 'علاج_طبيعي', 'علاج_الأعصاب', 'تحسين_الحركة', 'جلسات_علاجية', 'تأهيل_عضلي', 'تقوية_الأعصاب', 'تأهيل_الشلل',]
          };
        case 'قسم السمنة وتنسيق القوام':
          return {
            title: 'قسم السمنة وتنسيق القوام',
            sections: [
              {
                header: 'مقدمة',
                content: 'تُعتبر السمنة وتنسيق القوام من القضايا الصحية والجمالية التي تؤثر على حياة العديد من الأشخاص. يسعى الكثيرون إلى تحقيق وزن صحي وجسم متناسق بطرق فعّالة وآمنة. يلعب مركز ريهاب للعلاج الطبيعي دورًا بارزًا في تقديم حلول مبتكرة وشاملة لمعالجة السمنة وتنسيق القوام باستخدام أحدث التقنيات مثل جهاز كاڤيتاشين والليزر البارد.',
              },
              {
                header: 'دور مركز ريهاب للعلاج الطبيعي',
                content: 'يوفر مركز ريهاب للعلاج الطبيعي قسمًا مخصصًا لمعالجة السمنة وتنسيق القوام، يُدار من قبل فريق من الأطباء والمعالجين المختصين. يقدم القسم برامج علاجية متكاملة تهدف إلى تقليل الدهون الزائدة وتحسين مظهر الجسم بطريقة آمنة وفعّالة. يتم استخدام تقنيات متقدمة مثل جهاز كاڤيتاشين والليزر البارد لتحقيق أفضل النتائج الممكنة.',
              },
              {
                header: 'تقنيات نحت الجسم في مركز ريهاب',
                subsections: [
                  {
                    subheader: 'جهاز كاڤيتاشين',
                    content: 'يُعد جهاز كاڤيتاشين من أحدث التقنيات المستخدمة في نحت الجسم وتنسيق القوام. يعمل الجهاز على إرسال موجات فوق صوتية إلى مناطق محددة من الجسم لتفتيت الدهون وتحويلها إلى مواد يسهل على الجسم التخلص منها. يتميز جهاز كاڤيتاشين بقدرته على تحقيق نتائج ملموسة في وقت قصير دون الحاجة إلى جراحة.',
                  },
                  {
                    subheader: 'الليزر البارد',
                    content: 'يُستخدم الليزر البارد في مركز ريهاب كوسيلة فعّالة وآمنة لتنسيق القوام. يعمل الليزر البارد على تحفيز الخلايا الدهنية لتحرير الدهون بشكل طبيعي، مما يساعد على تقليل محيط الجسم وتحسين مظهره. يُعد الليزر البارد خيارًا ممتازًا للأشخاص الذين يرغبون في نحت جسمهم دون الشعور بالألم أو الحاجة لفترة استشفاء طويلة.',
                  },
                ],
              },
              {
                header: 'فوائد العلاج في قسم السمنة وتنسيق القوام',
                content: [
                  'تقليل الدهون الزائدة في الجسم بشكل فعّال وآمن',
                  'تحسين مظهر الجسم وزيادة الثقة بالنفس',
                  'تحقيق نتائج ملموسة في وقت قصير',
                  'عدم الحاجة إلى جراحة أو فترة استشفاء طويلة',
                  'برامج علاجية مخصصة تتناسب مع احتياجات كل مريض',
                ],
              },
              {
                header: 'قصص نجاح',
                content: 'حقق العديد من المرضى الذين زاروا قسم السمنة وتنسيق القوام في مركز ريهاب للعلاج الطبيعي نجاحات كبيرة في تحقيق أهدافهم الصحية والجمالية. بفضل التقنيات المتقدمة والدعم المستمر من الفريق الطبي، تمكن هؤلاء المرضى من تقليل الدهون الزائدة وتحسين مظهر أجسامهم بطريقة آمنة وفعّالة.',
              },
              {
                header: 'خاتمة',
                content: 'يُعتبر قسم السمنة وتنسيق القوام في مركز ريهاب للعلاج الطبيعي الخيار الأمثل للأشخاص الذين يسعون إلى تحقيق جسم متناسق وصحي. باستخدام أحدث التقنيات مثل جهاز كاڤيتاشين والليزر البارد، يمكن للمرضى تحقيق نتائج رائعة دون الحاجة إلى جراحة أو فترة استشفاء طويلة. يقدم المركز برامج علاجية شاملة ومخصصة لكل مريض، لضمان تحقيق أفضل النتائج الممكنة وتحسين جودة الحياة.',
              },
            ],
            tags: ['السمنة', 'تنسيق_القوام', 'إنقاص_الوزن', 'رجيم', 'تغذية_صحية', 'لياقة_بدنية', 'جسم_مثالي', 'حرق_الدهون', 'تمارين_رياضية', 'عناية_بالجسم',]
          };
        default:
          return {};
      }
    };
  
    const data = getData(formatted);
  
    return { props: { data } };
  }

const Specialization = ({data}) => {

    const imgs = {
        'تأهيل حالات العظام والعمود الفقري': SpecializationCoverPicOne.src,
        'تأهيل حالات الأعصاب والشلل بأنواعه': SpecializationCoverPicThree.src,
        'قسم السمنة وتنسيق القوام': SpecializationCoverPicTwo.src
    }

    const normalImg = {
        'تأهيل حالات العظام والعمود الفقري': SpecializationNormalPic.src,
        'تأهيل حالات الأعصاب والشلل بأنواعه': SpecializationNormalPicTwo.src,
        'قسم السمنة وتنسيق القوام': SpecializationNormalPicThree.src
    }

    return(
        <div className="specialization-page-container">
            <NextSeo title={data.title + ' - ' + "مركز ريهاب للعلاج الطبيعي والتأهيل"} />

            <div className="specialization-page-intro">
                <div className="img-container"><Image src={imgs[data.title]} fill style={{objectFit: 'cover'}} alt={data.title}></Image></div>
                <div className="layer-on">
                    <h1>{data.title}</h1>
                </div>
            </div>

            <div className="specialization-page-second-container">

                <div className="specializations-tags">

                    <h2>التخصصات</h2>

                    <div className="recent-specializations">

                        <div className="specialization">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={SpecializationNormalPicThree.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="specialization-info">
                             <Link href="/specialization/قسم_السمنة_وتنسيق_القوام" title="قسم السمنة وتنسيق القوام">قسم السمنة وتنسيق القوام</Link>
                             <div className="bottom-specialization-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>


                        <div className="specialization">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={SpecializationNormalPicTwo.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="specialization-info">
                             <Link href="/specialization/تأهيل_حالات_الأعصاب_والشلل_بأنواعه" title="تأهييل حالات الأعصاب والشلل بأنواعه">تأهيل حالات الاعصاب والشلل بأنواعه</Link>
                             <div className="bottom-specialization-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>

                        <div className="specialization">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={SpecializationNormalPic.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="specialization-info">
                             <Link href={`/specialization/تأهيل_حالات_العظام_والعمود_الفقري`} title="تأهييل حالات العظام والعمود الفقري">تأهيل حالات العظام والعمود الفقري</Link>
                             <div className="bottom-specialization-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>

                    </div>

                    <h2>أحدث المدونات</h2>

                    <div className="recent-specializations">

                        <div className="specialization">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={BlogThreeImage.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="specialization-info">
                            <Link href="/blog/تأهيل_حالات_ما_بعد_الجلطات" title="تأهيل حالات ما بعد الجلطات">تأهيل حالات ما بعد الجلطات</Link>
                             <div className="bottom-specialization-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>


                        <div className="specialization">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={BlogTwoImage.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="specialization-info">
                            <Link href="/blog/تأهيل_حالات_الرباط_الصليبي_قبل_وبعد_العملية" title="تأهيل حالات الرباط الصليبي قبل وبعد العملية">تأهيل حالات الرباط الصليبي قبل وبعد العملية</Link>
                             <div className="bottom-specialization-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>

                        <div className="specialization">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={BlogOneImage.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="specialization-info">
                            <Link href={`/blog/جهاز_شد_الفقرات_الإلكتروني`} title="جهاز شد الفقرات الإلكتروني">جهاز شد الفقرات الإلكتروني</Link>
                             <div className="bottom-specialization-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>

                    </div>

                    <h2>العلامات</h2>

                    <div className="tags">
                        {data.tags.map((e, key) => {
                            return(
                                <h3 key={key} title={e}>{e}</h3>
                            )
                        })}
                    </div>

                </div>


                <div className="specialization-page-info">

                <div className="img-container"><Image sizes="(min-width: 1120px) 48.99vw, 70vw" src={normalImg[data.title]} fill style={{objectFit: 'cover'}} alt="First Rehab EG Clinic"></Image></div>
                {data.title && <h1>{data.title}</h1>}
                {data.sections && data.sections.map((section, index) => (
                <div key={index}>
                    {section.header && <h2>{section.header}</h2>}
                    {Array.isArray(section.content) ? (
                    <ul>
                        {section.content.map((item, idx) => (
                        <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    ) : (
                    <p>{section.content}</p>
                    )}
                    {section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                        <h3>{subsection.subheader}</h3>
                        <p>{subsection.content}</p>
                    </div>
                    ))}
                </div>
                ))}
                </div>


            </div>
        </div>
    )
}


export default Specialization;