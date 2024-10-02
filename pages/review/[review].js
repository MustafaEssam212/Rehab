

import Image from "next/image";
import BlogCover from '../../public/reviews-cover.png';
import { FaUserDoctor, FaCalendar } from "react-icons/fa6";
import Link from "next/link";
import SpecializationNormalPic from '../../public/specialization1.png';
import SpecializationNormalPicTwo from '../../public/specialization2.jpg';
import SpecializationNormalPicThree from '../../public/specialization3.webp';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useEffect, useState } from "react";
import { NextSeo } from 'next-seo';

export async function getServerSideProps(context) {
    const { review } = context.params;
    const formatted = review.replace(/_/g, ' ');
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData?method=get-review&reviewName=${formatted}`);
    const data = await res.json();
  
  
    if (data.notFound) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }
  
    return { props: { data } };
}


const Review = ({ data }) => {

    const [images, setImages] = useState([]);


    useEffect(()=> {
        if(data.review.type === 'مجموعة صور'){
            const images = data.review.gallery.map(image => ({
                original: `/api/getImage?method=get-review-image&review=${data.review.name.replace(/ /g, '_')}&image=${image}`,
                thumbnail: `/api/getImage?method=get-review-image&review=${data.review.name.replace(/ /g, '_')}&image=${image}`,
            }));
            setImages(images)
        }
    }, [data])




    return(
        <div className="blog-page-container">


<NextSeo
            title={data.review.name ? `${data.review.name} - مركز ريهاب للعلاج الطبيعي والتأهيل` : 'مركز ريهاب للعلاج الطبيعي والتأهيل'}
            openGraph={{
              url: data.review.name ? `https://rehabeg.clinic/review/${data.review.name.replace(/ /g, '_')}` : '',

            }}
            additionalMetaTags={[
              {
                name: 'keywords',
                content: data.review.keywords?.length ? data.review.keywords.join(', ') : ''
              }
            ]}
            canonical={data.review.name ? `https://rehabeg.clinic/review/${data.review.name.replace(/ /g, '_')}` : ''}
          />

            <div className="blog-page-intro">
                <div className="img-container"><Image src={BlogCover.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image></div>
                <div className="layer-on">
                    <h1>اراء عملائنا</h1>
                </div>
            </div>

  

            <div className="blog-page-second-container">
                <div className="blogs-tags">

                    <h2>اراء سابقة</h2>

                    <div className="recent-blogs">



                      {
                        data.suggestedReviews.map((e, key) => {
                          return(
                            <div key={key} className="blog">
                              <div className="img-container">
                                {

                                    e.type === 'صورة' && <Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={`/api/getImage?method=get-review-image&review=${e.name.replace(/ /g, '_')}&image=${e.pic}`} fill style={{objectFit: 'cover'}} alt={e.name}></Image>

                                }

                                {

                                    e.type === 'مجموعة صور' && <Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={`/api/getImage?method=get-review-image&review=${e.name.replace(/ /g, '_')}&image=${e.gallery[0]}`} fill style={{objectFit: 'cover'}} alt={e.name}></Image>

                                }

                                                                {

                                    e.type === 'فيديو' && <Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={`/api/getImage?method=get-review-image&review=${e.name.replace(/ /g, '_')}&image=${e.videoThumbnail}`} fill style={{objectFit: 'cover'}} alt={e.name}></Image>

                                }
                              </div>
                              <div className="blog-info">
                              <Link href={`/review/${e.name.replace(/ /g, '_')}`} title={e.name}>{e.name}</Link>
                              <div className="bottom-blog-info">
                                  <p><FaUserDoctor className="icon" />مسؤول</p>
                                  <p><FaCalendar className="icon" /> {e.date}</p>
                              </div>
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>

                    <h2>التخصصات</h2>

                    <div className="recent-blogs">

                        <div className="blog">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={SpecializationNormalPicThree.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="blog-info">
                            <Link href="/specialization/قسم_السمنة_وتنسيق_القوام" title="قسم السمنة وتنسيق القوام">قسم السمنة وتنسيق القوام</Link>
                             <div className="bottom-blog-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>


                        <div className="blog">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={SpecializationNormalPicTwo.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="blog-info">
                            <Link href="/specialization/تأهيل_حالات_الأعصاب_والشلل_بأنواعه" title="تأهييل حالات الأعصاب والشلل بأنواعه">تأهيل حالات الاعصاب والشلل بأنواعه</Link>
                             <div className="bottom-blog-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>

                        <div className="blog">
                            <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={SpecializationNormalPic.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Clinic"></Image></div>
                            <div className="blog-info">
                            <Link href={`/specialization/تأهيل_حالات_العظام_والعمود_الفقري`} title="تأهييل حالات العظام والعمود الفقري">تأهيل حالات العظام والعمود الفقري</Link>
                             <div className="bottom-blog-info">
                                <p><FaUserDoctor className="icon" />مسؤول</p>
                                <p><FaCalendar className="icon" /> 21-7-2024</p>
                             </div>
                            </div>
                        </div>

                    </div>

                    <h2>العلامات</h2>

                    <div className="tags">
                        {data.review.keywords.map((e, key) => {
                            return(
                                <h3 key={key} title={e}>{e}</h3>
                            )
                        })}
                    </div>

                </div>

                <div className="blog-page-info">



              

                    <div className="work-content">

                        {
                            data.review.type === 'صورة' && <div className="img-container"><Image sizes="(min-width: 1120px) 48.99vw, 70vw" src={`/api/getImage?method=get-review-image&review=${data.review.name.replace(/ /g, '_')}&image=${data.review.pic}`} fill style={{objectFit: 'cover'}} alt={data.review.name}></Image></div>
                        }

                        {
                            data.review.type === 'فيديو' && <div className="img-container">
                                <video controls>
                                    <source src={`/api/getImage?method=get-video-review&review=${data.review.name.replace(/ /g, '_')}&video=${data.review.video}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        }

                        {
                            data.review.type === 'مجموعة صور' && <ImageGallery
                            items={images}
                  
                            showThumbnails={false}
                            showBullets
                            showPlayButton
                            />
                        }
                        
                        <h1>{data.review.name}</h1>
                        <h3>{data.review.description}</h3>

                    </div>



                
                </div>
            </div>
        </div>
    )
}

export default Review;