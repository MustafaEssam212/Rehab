
import Image from "next/image";
import BlogCover from '../../public/blog-cover.png';
import { FaUserDoctor, FaCalendar } from "react-icons/fa6";
import Link from "next/link";
import { NextSeo } from 'next-seo';

import SpecializationNormalPic from '../../public/specialization1.png';
import SpecializationNormalPicTwo from '../../public/specialization2.jpg';
import SpecializationNormalPicThree from '../../public/specialization3.webp';


export async function getServerSideProps(context) {
  const { blog } = context.params;
  const formatted = blog.replace(/_/g, ' ');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData?method=get-blog&blogName=${formatted}`);
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
  


const BlogPost = ({ data }) => {



    return (
        <div className="blog-page-container">

          <NextSeo
            title={data.blog.name ? `${data.blog.name} - مركز ريهاب للعلاج الطبيعي والتأهيل` : 'مركز ريهاب للعلاج الطبيعي والتأهيل'}
            openGraph={{
              url: data.blog.name ? `https://rehabeg.clinic/blog/${data.blog.name.replace(/ /g, '_')}` : '',
              images: data.blog.name ? [{ 
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/getImage?method=get-blog-image&blog=${data.blog.name.replace(/ /g, '_')}&image=${data.blog.cover}`, 
                alt: data.blog.name ? data.blog.name : ""
              }] : []
            }}
            additionalMetaTags={[
              {
                name: 'keywords',
                content: data.blog.keywords?.length ? data.blog.keywords.join(', ') : ''
              }
            ]}
            canonical={data.blog.name ? `https://rehabeg.clinic/blog/${data.blog.name.replace(/ /g, '_')}` : ''}
          />



          <div className="blog-page-intro">
                <div className="img-container"><Image src={BlogCover.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image></div>
                <div className="layer-on">
                    <h1>تفاصيل المدونة</h1>
                </div>
            </div>


            <div className="blog-page-second-container">

                <div className="blogs-tags">

                    <h2>احدث المدونات</h2>

                    <div className="recent-blogs">



                      {
                        data.suggestedBlogs.map((e, key) => {
                          return(
                            <div key={key} className="blog">
                              <div className="img-container"><Image sizes="(min-width: 2060px) 190px, (min-width: 1720px) 180px, (min-width: 1540px) 150px, (min-width: 640px) 130px, calc(10.94vw + 62px)" loading="lazy" src={`/api/getImage?method=get-blog-image&blog=${e.name.replace(/ /g, '_')}&image=${e.cover}`} fill style={{objectFit: 'cover'}} alt={e.name}></Image></div>
                              <div className="blog-info">
                              <Link href={`/blog/${e.name.replace(/ /g, '_')}`} title={e.name}>{e.name}</Link>
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
                        {data.blog.keywords.map((e, key) => {
                            return(
                                <h3 key={key} title={e}>{e}</h3>
                            )
                        })}
                    </div>

                </div>


                <div className="blog-page-info">

                <div className="img-container"><Image sizes="(min-width: 1120px) 48.99vw, 70vw" src={`/api/getImage?method=get-blog-image&blog=${data.blog.name.replace(/ /g, '_')}&image=${data.blog.cover}`} fill style={{objectFit: 'cover'}} alt={data.blog.name}></Image></div>
                <h1>{data.blog.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: data.blog.html }} />
                </div>


            </div>



        </div>
    );
  };
  
  export default BlogPost;
  