import React, { useState, useRef } from 'react';
import BackgroundOne from '../../public/bg1.jpg';
import BackgroundTwo from '../../public/bg2.jpg';
import BackgroundThree from '../../public/bg4.jpg';
import Image from 'next/image';
import BackgroundAssetFive from '../../public/doc-mohamed.png';
import BackgroundAssetSeven from '../../public/doc-mohamed-2.png';
import BackgroundAssetEight from '../../public/doc-mohamed-3.png';
import { FiCalendar } from 'react-icons/fi';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import Link from 'next/link';
import NewDocOne from '../../public/new-doctor.png';
import NewDocTwo from '../../public/new-doctor2.png';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [animation, setAnimation] = useState(true);
  const carouselInnerRef = useRef(null);
  const reservationPageRef = useRef();

  const slides = [
    {
      key: 1,
      element: (
        <div className='inner-item'>
          <Link className='reservation-page' ref={reservationPageRef} href={`/reservation`} title='احجز الأن' aria-label='احجز الأن'>احجز الأن</Link>
          <div className='img-container'>
            <Image priority src={BackgroundTwo.src} fill style={{ objectFit: 'cover' }} alt='Rehab EG Clinic' />
          </div>
          <div className='layer-on'>
            <div className='layer-on-left'>
              <Image sizes="50vw" src={BackgroundAssetFive.src} fill style={{ objectFit: 'contain' }} alt='Rehab EG Clinic' />
              <div className='layer-on-asset'></div>
            </div>
            <div className='layer-on-right'>
              <h2>مركز ريهاب للعلاج الطبيعي</h2>
              <h1>أفضل حل للحياة المؤلمة</h1>
              <h3>
                مركز ريهاب للعلاج الطبيعي وأمراض المخ والأعصاب والعمود الفقري وخشونة المفاصل ولإعادة تأهيل إصابات النخاع الشوكي
                والجلطات وغيرها من حالات العلاج الطبيعي. احجز الأن موعدك من خلال موقعنا مع نُخبة من أفضل الدكاترة في مصر
              </h3>
              <button onClick={()=> reservationPageRef.current.click()} aria-label="احجز الأن">
                احجز الأن <FiCalendar className='Icon' />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 2,
      element: (
        <div className='inner-item'>
          <Link className='reservation-page' ref={reservationPageRef} href={`/reservation`} title='احجز الأن' aria-label='احجز الأن'>احجز الأن</Link>
          <div className='img-container'>
            <Image  src={BackgroundOne.src} fill style={{ objectFit: 'cover' }} alt='Rehab EG Clinic' />
          </div>
          <div className='layer-on'>
            <div className='layer-on-left'>
              <Image sizes='50vw' src={NewDocOne.src} fill style={{ objectFit: 'contain' }} alt='Rehab EG Clinic' />
              <div className='layer-on-asset'></div>
            </div>
            <div className='layer-on-right'>
              <h2>مركز ريهاب للعلاج الطبيعي</h2>
              <h1>نعيد تأهيلك لحياة أفضل</h1>
              <h3>
                متخصص في علاج الإصابات الرياضية واضطرابات العمود الفقري. تتمثل مهمة المركز في تزويد المرضى بمرفق يقوم فيه الأطباء الخبراء
                بأداء أحدث التقنيات بأحدث المعدات المبتكرة . لتسهيل إعادة التأهيل وإعادة المرضى إلى مستوى نشاطهم السابق بأسرع طريقة ممكنة
                وأكثرها أمانًا.
              </h3>
              <button onClick={()=> reservationPageRef.current.click()} aria-label="احجز الأن">
                احجز الأن <FiCalendar className='Icon' />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 3,
      element: (
        <div className='inner-item'>
          <Link className='reservation-page' ref={reservationPageRef} href={`/reservation`} title='احجز الأن' aria-label='احجز الأن'>احجز الأن</Link>
          <div className='img-container'>
            <Image src={BackgroundThree.src} fill style={{ objectFit: 'cover' }} alt='Rehab EG Clinic' />
          </div>
          <div className='layer-on'>
            <div className='layer-on-left'>
              <Image sizes='50vw' src={BackgroundAssetSeven.src} fill style={{ objectFit: 'contain' }} alt='Rehab EG Clinic' />
              <div className='layer-on-asset'></div>
            </div>
            <div className='layer-on-right'>
              <h2>مركز ريهاب للعلاج الطبيعي</h2>
              <h1>تعافيك هي أولويتنا</h1>
              <h3>
                يتكون فريقنا من أخصائيي العلاج الطبيعي والمدربين الرياضيين وأطباء القوة والأطباء الرياضيين وقد صمموا مجموعة كاملة من برامج
                إعادة التأهيل والأداء الخاصة بالرياضات لمساعدتك
              </h3>
              <button onClick={()=> reservationPageRef.current.click()} aria-label="احجز الأن">
                احجز الأن <FiCalendar className='Icon' />
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const getPositionX = (event) => (event.type.includes('mouse') ? event.pageX : event.touches[0].clientX);

  const handleDragStart = (event) => {
    setIsDragging(true);
    setStartPosition(getPositionX(event));
    setAnimation(false);
  };

  const handleDragMove = (event) => {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      setCurrentTranslate(prevTranslate + currentPosition - startPosition);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setAnimation(true);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    if (movedBy > 100 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }

    setPrevTranslate(currentIndex * -carouselInnerRef.current.offsetWidth);
    setCurrentTranslate(currentIndex * -carouselInnerRef.current.offsetWidth);
  };

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTranslate((currentIndex - 1) * -carouselInnerRef.current.offsetWidth);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentTranslate((currentIndex + 1) * -carouselInnerRef.current.offsetWidth);
    }
  };

  return (
    <div
      className='carousel'
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className='carousel-btns'>
        <button className='prevButton' onClick={goToPreviousSlide} aria-label="الذهاب للصورة السابقة">
            <MdNavigateBefore className='icon' />
        </button>
        <button className='nextButton' onClick={goToNextSlide} aria-label="الذهاب للصورة التالية">
            <MdNavigateNext className='icon' />
        </button>
      </div>

      <div
        ref={carouselInnerRef}
        className='carouselInner'
        style={{
          transform: `translateX(${currentTranslate}px)`,
          transition: animation ? 'transform 0.5s ease' : 'none',
        }}
      >
        {slides.map((slide) => (
          <div className='carouselItem' key={slide.key}>
            {slide.element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
