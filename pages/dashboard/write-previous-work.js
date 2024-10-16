import { getSession } from "next-auth/react";
import HeadSystem from "@/Components/System/Head";
import { useState, useRef, useEffect } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import LoadingCircle from "@/Components/Loading-Circle";
import { toast } from "react-toastify";
import { IoMdArrowDropdown } from "react-icons/io";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('سابقة اعمالنا')) {

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  


    return {
      props: {},
    };
}


const WritePerviousWork = () => {

    const [data, setData] = useState({
        name: '',
        description: '',
        keywords: [],
        type: 'صورة',
        pic: '',
        gallery: [],
        video: '',
        category: ''
    });

    const [videoThumbnail, setVideoThumbnail] = useState('');
    const [videoThumbnailPreview, setVideoThumbnailPreview] = useState('');
    const thumbnailInputRef = useRef();

    useEffect(() => {
        if (videoThumbnail) {
            const coverPictureUrl = URL.createObjectURL(videoThumbnail);
            setVideoThumbnailPreview(coverPictureUrl);
        }else{
            setVideoThumbnailPreview('');
        }
    }, [videoThumbnail]);


    const [keyword, setKeyword] = useState('');
    const [picPreview, setPicPreview] = useState('');
    const picInputRef = useRef();
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const galleryInputRef = useRef();
    const videoInputRef = useRef();
    const [videoPreview, setVideoPreview] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    
    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);
    
        // Generate image preview URLs for display
        const galleryImages = files.map((file) => URL.createObjectURL(file));
    
        // Set preview URLs for the gallery
        setGalleryPreviews((prevPreviews) => [...prevPreviews, ...galleryImages]);
    
        // Set the actual file objects into data.gallery
        setData((prevData) => ({
            ...prevData,
            gallery: [...prevData.gallery, ...files]  // Ensure you're passing file objects here
        }));
    };

    const handleRemoveImage = (indexToRemove) => {

        setGalleryPreviews((prevPreviews) =>
            prevPreviews.filter((_, index) => index !== indexToRemove)
        );

        setData((prevData) => ({
            ...prevData,
            gallery: prevData.gallery.filter((_, index) => index !== indexToRemove)
        }));
    };

    useEffect(() => {
        if (data.pic) {
            const coverPictureUrl = URL.createObjectURL(data.pic);
            setPicPreview(coverPictureUrl);
        }else{
            setPicPreview('');
        }
    }, [data.pic]);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };


    const handleAddKeyword = () => {
        if (keyword.trim() && !data.keywords.includes(keyword.trim())) {
          setData(prevData => ({
            ...prevData,
            keywords: [...prevData.keywords, keyword.trim()]
          }));
          setKeyword(''); // Clear the input field
        }
      };


      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent default behavior (like form submission)
          handleAddKeyword();
        }
      };


      const handleRemoveKeyword = (kw) => {
        setData(prevData => ({
          ...prevData,
          keywords: prevData.keywords.filter(keyword => keyword !== kw)
        }));
      };


      useEffect(()=> {
        setData({...data, pic: '', gallery: [], video: ''});
        setGalleryPreviews([]);
        setVideoPreview('');
        setVideoThumbnailPreview('');
        setVideoThumbnail('');
      }, [data.type]);



      const handleSubmit = async () => {

        setBtnLoading(true);

        const { type, pic, gallery, video, ...rest } = data;


        let skipFields = [];
        if (type === "صورة") {
            skipFields = ['gallery', 'video'];
        } else if (type === "مجموعة صور") {
            skipFields = ['pic', 'video'];
        } else if (type === "فيديو") {
            skipFields = ['pic', 'gallery'];
        }
    

        const isAnyFieldEmpty = Object.entries(data).some(([key, value]) => {

            if (skipFields.includes(key)) return false;
    

            return value === '' || 
                   (Array.isArray(value) && value.length === 0) || 
                   value === undefined || value === null;
        });
    
        if (isAnyFieldEmpty) {
            setBtnLoading(false);
            toast.warning('برجاء ملئ كافة المعلومات المطلوبة')
            return;
        }
    
       const formData = new FormData();
       formData.append('name', data.name);
       formData.append('description', data.description);
       formData.append('keywords', JSON.stringify(data.keywords));
        data.gallery.forEach((file) => {
            formData.append("gallery", file);
        });
       formData.append('pic', data.pic);
       formData.append('video', data.video);
       formData.append('type', data.type);
       formData.append('thumbnail', videoThumbnail);
       formData.append('category', data.category);

       const res = await fetch(`/api/upload?method=add-previous-work`, {
        method: 'POST',
        body: formData
        });

        const dataOfResponse = await res.json();

        if(res.status === 200){
            toast.success(dataOfResponse.message);
            setData({
                name: '',
                description: '',
                keywords: [],
                type: 'صورة',
                pic: '',
                gallery: [],
                video: '',
                category: ''
            });
            setGalleryPreviews([]);
            setVideoPreview('');
            setVideoThumbnailPreview('');
            setVideoThumbnail('');
            setBtnLoading(false);
        }else{
            toast.error(dataOfResponse.message);
            setBtnLoading(false);
        }


    };

  
    return(
        <div className="write-previous-work-page system-page">
            <HeadSystem name={`كتابة سابقة اعمالنا`} />
            
        
            <div className="innter-write-previous-work">

                <h1>قم بملئ المعلومات المطلوبة</h1>


                <div className="choose-type">
                    <div className="left">
                        <button onClick={() => setData({ ...data, type: 'صورة' })} className={data.type === 'صورة' ? "active" : undefined}>صورة</button>
                        <button onClick={() => setData({ ...data, type: 'فيديو' })} className={data.type === 'فيديو' ? "active" : undefined}>فيديو</button>
                        <button onClick={() => setData({ ...data, type: 'مجموعة صور' })} className={data.type === 'مجموعة صور' ? "active" : undefined}>مجموعة صور</button>
                    </div>

                    <h2>نوع العمل</h2>
                </div>

                <div className="input-container">
                    <input value={data.name} onChange={(s)=> setData({...data, name: s.target.value})} type="text" placeholder="اسم العمل" aria-label="اسم العمل" onBlur={() => setData({ ...data, name: data.name.trim() })}></input>
                    <h2>اسم العمل</h2>
                </div>

                <div className="input-container">
                    <textarea value={data.description} onChange={(s)=> setData({...data, description: s.target.value})} placeholder="وصف العمل" aria-label="وصف العمل"></textarea>
                    <h2>وصف العمل</h2>
                </div>


                <div className="input-container">

                    <div className="keywords-container">

                    {
                        data.keywords.length > 0 && <div className="previous-work-keywords-container">
                        {data.keywords.map((kw, index) => (

                            <p key={index} onClick={() => handleRemoveKeyword(kw)}>{kw} <IoIosRemoveCircle className="icon" /></p>

                        ))}
                    </div>
                    }

                    <input
                        type="text"
                        value={keyword}
                        onChange={handleKeywordChange}
                        onKeyDown={handleKeyDown}
                        placeholder="اكتب كلمة مفتاحية ثم اضغط على زر انتر لاضافتها على الاقل 5 كلمات"
                        className="keyword-input"
                    />

                    </div>
                
                    <h2>الكلمات المفتاحية</h2>
                </div>

                <div className="input-container">
                    <div onClick={() => setOpenMenu(!openMenu)} className="dropmenu">
                        <IoMdArrowDropdown className="icon" />
                        <p>{data.category ? data.category : 'قم بإختيار الفئة'}</p>
                        {openMenu && (
                        <div className="dropmenu-list heighted">
                            <button onClick={() => setData({...data, category: 'تأهيل امراض الأعصاب وجراحاتها'})}>تأهيل امراض الأعصاب وجراحاتها</button>
                            <button onClick={() => setData({...data, category: 'تأهيل امراض العظام والعمود الفقري وجراحاتها'})}>تأهيل امراض العظام والعمود الفقري وجراحاتها</button>
                            <button onClick={() => setData({...data, category: 'تأهيل اصابات الرياضيين'})}>تأهيل اصابات الرياضيين</button>
                            <button onClick={() => setData({...data, category: 'التغذية العلاجية ونحت وتنسيق القوام'})}>التغذية العلاجية ونحت وتنسيق القوام</button>
                            <button onClick={() => setData({...data, category: 'تأهيل امراض الصدر'})}>تأهيل امراض الصدر</button>
                            <button onClick={() => setData({...data, category: 'تأهيل امراض النسا والولادة'})}>تأهيل امراض النسا والولادة</button>
                            <button onClick={() => setData({...data, category: 'تأهيل امراض القلب'})}>تأهيل امراض القلب</button>
                            <button onClick={() => setData({...data, category: 'تأهيل امراض الباطنة والمسنين'})}>تأهيل امراض الباطنة والمسنين</button>
                            <button onClick={() => setData({...data, category: 'اخرى'})}>اخرى</button>
                        </div>
                        )}
                    </div>
                    <h2>الفئة</h2>
                </div>


                <div className="input-container">
                    
                    {
                        data.type === 'صورة' && <div className="pic-file-input">
                        <input ref={picInputRef} accept="image/*" className="input-file" type="file" onChange={(s)=> setData({...data, pic: s.target.files[0]})}></input>
                        {
                             picPreview ? <Image loading="lazy" fill src={picPreview} alt="pic"></Image> : <button onClick={()=> picInputRef.current.click()}><FaPlus className="icon" /></button>
                        }

                        </div>
                    }

                    {
                        data.type === 'مجموعة صور' && (
                            <div className="gallery-files-input">
                                <input
                                    ref={galleryInputRef}
                                    accept="image/*"
                                    multiple
                                    className="input-file"
                                    type="file"
                                    onChange={handleGalleryUpload}
                                />

                                <button onClick={()=> galleryInputRef.current.click()}>اضغط هنا لإضافة صور <FaPlus className="icon" /></button>
                                {
                                    galleryPreviews.length > 0 && (
                                        <div className="gallery-previews">
                                            {galleryPreviews.map((src, index) => (
                                                <Image
                                                    key={index}
                                                    loading="lazy"
                                                    src={src}
                                                    alt={`gallery-pic-${index}`}
                                                    width={100}
                                                    height={100}
                                                    onClick={() => handleRemoveImage(index)}
                                                    title="احذف الصورة"
                                                />
                                            ))}
                                        </div>
                                    ) 
                                }
                            </div>
                        )
                    }

                    {
                        data.type === 'فيديو' && (
                            <div className="video-big-container">
                            
                                <div className="video-file-input">

                                <input
                                    onChange={(s) => {
                                        const file = s.target.files[0];
                                        setData({...data, video: file});
                                        
                                        // Create video preview URL
                                        const videoURL = URL.createObjectURL(file);
                                        setVideoPreview(videoURL); // set the video preview URL
                                    }}
                                    className="input-file"
                                    type="file"
                                    accept="video/mp4"
                                    ref={videoInputRef}
                                />

                                <button onClick={() => videoInputRef.current.click()}>
                                    <FaPlus className="icon" /> اضغط هنا لإضافة فيديو بصيغة <span>MP4</span>
                                </button>

                                {
                                    videoPreview && (
                                        <div className="video-preview">
                                        {
                                            videoPreview && (
                                                <video width="320" height="240" controls>
                                                    <source src={videoPreview} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )
                                        }
                                    </div>
                                    )
                                }

                                </div>

                                <div className="pic-file-input" style={{marginTop: '15px'}}>
                                <input ref={thumbnailInputRef} accept="image/*" className="input-file" type="file" onChange={(s)=> setVideoThumbnail(s.target.files[0])}></input>
                                {
                                    videoThumbnailPreview ? <Image loading="lazy" fill src={videoThumbnailPreview} alt="pic"></Image> : <button onClick={()=> thumbnailInputRef.current.click()}>قم بإضافة صورة غلاف للفيديو</button>
                                }

                                </div>
                            
                            
                            </div>
                        )
                    }

                    <h2>مرفقات العمل</h2>
                </div>

                <div className="main-button-div">
                    <button onClick={handleSubmit}>{btnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `تأكيد`}</button>
                </div>

            </div>

        </div>
    )
}


export default WritePerviousWork;