
import DotsBG from '../../public/dots.png';
import Image from 'next/image';
import CountUp from 'react-countup';
import { useEffect, useRef, useState } from 'react';

const Statistics = () => {


    const [isCountingStarted, setCountingStarted] = useState(false);
    const countRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
          const { current } = countRef;
          if (current && !isCountingStarted) {
            const elementTop = current.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            if (elementTop < viewportHeight) {
              setCountingStarted(true);
            }
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [isCountingStarted]);

    return(
        <div className="statistics-landing-page">
            <div ref={countRef} className="innter-statistics-landing-page">
                <div className='img-container'><Image priority sizes="(min-width: 1120px) 85vw, calc(100vw - 40px)" src={DotsBG.src} fill style={{objectFit: 'cover'}} alt='Rehab EG Clinic'></Image></div>

                <div className='statistics-layer-on'>
                    <div className='statistics-section'><i className="icofont-patient-bed icon"></i> <h1>{isCountingStarted && <CountUp end={7} duration={4} />}</h1> <h2>سرير متاح</h2></div>
                    <div className='statistics-section'><i className="icofont-first-aid icon"></i> <h1>+{isCountingStarted && <CountUp end={160000} duration={4} />}</h1> <h2>الجلسات</h2></div>
                    <div className='statistics-section'><i className="icofont-people icon"></i> <h1>+{isCountingStarted && <CountUp end={20000} duration={4} />}</h1> <h2>عملائنا</h2></div>
                    <div className='statistics-section'><i className="icofont-doctor-alt icon"></i> <h1>{isCountingStarted && <CountUp end={10} duration={4} />}</h1> <h2>الأطباء</h2></div>
                    <div className='statistics-section'><i className="icofont-badge icon"></i> <h1>{isCountingStarted && <CountUp end={21} duration={4} />}</h1> <h2>سنوات الخبرة</h2></div>
                </div>
            </div>
        </div>
    )
}


export default Statistics;