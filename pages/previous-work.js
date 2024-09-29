import Image from "next/image";
import BlogCover from '../public/previous-work-cover.webp';
import { FaUserDoctor, FaCalendar } from "react-icons/fa6";
import Link from "next/link";
import { NextSeo } from 'next-seo';
import { useState, useEffect } from 'react';
import LoadingCircle from '@/Components/Loading-Circle';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";

export async function getServerSideProps() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData?method=get-works&page=1`);
    const data = await res.json();
  
  
    return { props: { data } };
  }


const PerviousWork = ({ data }) => {

    const [blogs, setBlogs] = useState(data.works);
    const [page, setPage] = useState(1);
    const [btnLoading, setBtnLoading] = useState(false);

    const getData = async (pageNum) => {
        setBtnLoading(true);
        const res = await fetch(`/api/getData?method=get-works&page=${pageNum}`);
        const dataOfResponse = await res.json();

        if(res.status === 200){
            setBlogs(pageNum === 1 
                ? dataOfResponse.blogs 
                : [...blogs, ...dataOfResponse.works]);
            setBtnLoading(false);
        } else {
            setBtnLoading(false);
        }
    };

    useEffect(() => {
        if (page > 1) {
            getData(page);
        }
    }, [page]);


    return(
        <div className="blogs-page-container">
            <NextSeo title={'سابقة اعمالنا - مركز ريهاب للعلاج الطبيعي والتأهيل'} />
            <div className="blogs-page-intro">
                <div className="img-container"><Image src={BlogCover.src} fill style={{objectFit: 'cover'}} alt="Rehab EG Center"></Image></div>
                <div className="layer-on">
                    <h1>سابقة اعمالنا</h1>
                </div>
            </div>

            <div className='blogs-container'>

                <div className='inner-blogs-container'>

                    


                    {
                        blogs.length > 0 && <>
                        
                        {
                            blogs.map((e, key) => {
                                return(

                                    <div className="blog" key={key}>

                                    <div className="blog-img">

                                        {
                                            e.type === 'صورة' && <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 440px) 350px, calc(79.17vw + 18px)" loading="lazy" src={`/api/getImage?method=get-work-image&work=${e.name.replace(/ /g, '_')}&image=${e.pic}`} fill style={{objectFit: 'cover'}} alt={e.name}></Image>
                                        }

                                        {
                                            e.type === 'مجموعة صور' && <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 440px) 350px, calc(79.17vw + 18px)" loading="lazy" src={`/api/getImage?method=get-work-image&work=${e.name.replace(/ /g, '_')}&image=${e.gallery[0]}`} fill style={{objectFit: 'cover'}} alt={e.name}></Image>
                                        }


{
                                            e.type === 'فيديو' && <Image sizes="(min-width: 2060px) calc(1.7vw + 549px), (min-width: 1720px) calc(4.06vw + 417px), (min-width: 1540px) 400px, (min-width: 1380px) 350px, (min-width: 1120px) calc(13.75vw + 163px), (min-width: 440px) 350px, calc(79.17vw + 18px)" loading="lazy" src={`/api/getImage?method=get-work-image&work=${e.name.replace(/ /g, '_')}&image=${e.videoThumbnail}`} fill style={{objectFit: 'cover'}} alt={e.name}></Image>
                                        }

                                    </div>
            
                                    <Link href={`/work/${e.name.replace(/ /g, '_')}`} title={e.name} className="blog-info">
                                        <h2>{e.name}</h2>
                                        <h3>{e.description.length > 175 ? e.description.slice(0, 175) + '...'  : e.description}</h3>
                                    </Link>
            
                                    <div className="blog-line"><div className="inner-line"></div></div>
            
                                    <div className="blog-details">
                                        <p>{e.date} <FaRegCalendarDays className="icon" /></p>
                                        <Link href="/previous-works">اقرأ المذيد <FaLongArrowAltLeft className="icon"/></Link>
                                    </div>
                                </div>

                                )
                            })
                        }
                        
                        </>
                    }
                </div>
                
                {data.length > 3 && blogs.length !== data.length && <button onClick={btnLoading ? ()=> {return} : ()=> setPage(prevPage => prevPage + 1)} className='load-more-btn' aria-label='اعرض المذيد'>{btnLoading ? <LoadingCircle providedcolor='white' size={`25px`} /> : `اعرض المذيد`}</button>}


            </div>


        </div>
    )
}

export default PerviousWork;