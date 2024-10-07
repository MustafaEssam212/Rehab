
import { useState, useRef, useEffect } from "react";
import HeadSystem from "@/Components/System/Head";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import LoadingCircle from "@/Components/Loading-Circle";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
import { IoMdArrowDropdown } from "react-icons/io";


export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('كتابة مدونة')) {

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



const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const WriteBlog = () => {

 
    const coverInputRef = useRef();
    const [data, setData] = useState({
        name: '',
        coverPicture: '',
        description: '',
        keywords: [],
        category: ''
    });
    const [coverPreviewURL, setCoverPreviewURL] = useState('');
    const [keyword, setKeyword] = useState('');
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        if (data.coverPicture) {
            const coverPictureUrl = URL.createObjectURL(data.coverPicture);
            setCoverPreviewURL(coverPictureUrl);
        }else{
            setCoverPreviewURL('');
        }
    }, [data.coverPicture]);

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




      const [editorValue, setEditorValue] = useState('');

      const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }], // Header options
          ['bold', 'italic', 'underline'], // Text styles
          [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
          [{ 'align': [] }], // Alignment options
          ['link'], // Link option
          ['clean'] // Clear formatting
        ]
      };


      const [confirmLoading, setConfirmLoading] = useState(false);


      const isDataValid = () => {
        // Check if any string value is empty
        const hasEmptyString = Object.values(data).some(value => {
            if (typeof value === 'string') {
                return value === '';
            }
            return false;
        });
    
        // Check if the keywords array is valid (length > 5)
        const isKeywordsValid = Array.isArray(data.keywords) && data.keywords.length >= 5;
    
        // Combine the checks: no empty strings and keywords array must be valid
        return !hasEmptyString && isKeywordsValid;
      };


      const handleSubmit = async () => {
        setConfirmLoading(true);
        if(isDataValid() && editorValue.length > 50){
          const formData = new FormData();
          formData.append('cover', data.coverPicture);
          formData.append('name', data.name);
          formData.append('description', data.description);
          formData.append('keywords', JSON.stringify(data.keywords));
          formData.append('html', editorValue);
          formData.append('category', data.category);

          const res = await fetch(`/api/upload?method=add-blog`, {
            method: 'POST',
            body: formData
          });

          const dataOfResponse = await res.json();

          if(res.status === 200){
            toast.success(dataOfResponse.message);
            setEditorValue('');
            setData({
              name: '',
              coverPicture: '',
              description: '',
              keywords: [],
              category: ''
          });
          setCoverPreviewURL('');
          setKeyword('');
          setConfirmLoading(false);
          }else{
            toast.error(dataOfResponse.message);
            setConfirmLoading(false);
          }

        }else{
          toast.warning('برجاء ادخال المعلومات المطلوبة');
          setConfirmLoading(false);
        }
      }
      

  return (
    <div className="write-blog-page system-page">
        <HeadSystem name={`كتابة مدونة`} />

        <div className="inner-write-blog">


            <div className="left">
                <h1>معلومات المدونة</h1>
                <div className="top-left">
                    <input value={data.name} type="text" aria-label="اسم المدونة" placeholder="اسم المدونة" onChange={(s)=> setData({...data, name: s.target.value})}></input>
                    <textarea value={data.description} placeholder="وصف المدونة" aria-label="وصف المدونة" onChange={(s)=> setData({...data, description: s.target.value})}></textarea>

                    {
                        data.keywords.length > 0 && <div className="blog-keywords-container">
                        {data.keywords.map((kw, index) => (

                            <p key={index} onClick={() => handleRemoveKeyword(kw)}>{kw} <IoIosRemoveCircle className="icon" /></p>

                        ))}
                    </div>
                    }

                    <input
                        type="text"
                        value={keyword}
                        onChange={handleKeywordChange}
                        onKeyDown={handleKeyDown} // Add the onKeyDown handler here
                        placeholder="اكتب كلمة مفتاحية ثم اضغط على زر انتر لاضافتها على الاقل 5 كلمات"
                        className="keyword-input"
                    />


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

                </div>

                <div className="bottom-left">
                    <h1>صورة المدونة</h1>

                    <div onClick={()=> coverInputRef.current.click()} className="cover-picture">
                            <button aria-label="وضع صورة غلاف"><FaPlus className="icon" /></button>
                            {coverPreviewURL && <div className="img-preview"><Image src={coverPreviewURL} fill  alt="Image"></Image></div>}
                        </div>
                        <input accept="image/*" className="input-cover" onChange={(s)=> setData({...data, coverPicture: s.target.files[0]})} ref={coverInputRef} type="file" aria-label="وضع صورة غلاف" placeholder="add"></input>
                </div>

                <button aria-label="اضافة" className="main-button" onClick={handleSubmit}>{confirmLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `اضافة`}</button>

            </div>

            <div className="right">

                    {editorValue.length > 0 && <div className="content-display" dangerouslySetInnerHTML={{ __html: editorValue }} />}


                <h1>اكتب المدونة</h1>
                
                <div className="editor-container">

                  <ReactQuill
                    value={editorValue}
                    onChange={setEditorValue}
                    modules={modules}
                    placeholder="...اكتب مدونتك هنا"
                  />

                </div>

            </div>


        </div>
    </div>
  );
};





export default WriteBlog;
