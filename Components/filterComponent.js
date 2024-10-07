
import { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const FilterComponent = ({sendDataToParent}) => {


    const [openMenu, setOpenMenu] = useState(false);
    const [category, setCategory] = useState('الكل');
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {

                setOpenMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(()=> {
        sendDataToParent(category)
    }, [category])


    return(
        <div className="filter-component-container">


            <div className="right">
                <div className="dropmenu-container-filter"> 
                    <div onClick={() => setOpenMenu(!openMenu)} className="dropmenu">
                        <IoMdArrowDropdown className="icon" />
                        <p>{category ? category : 'قم بإختيار الفئة'}</p>
                        {openMenu && (
                        <div ref={menuRef} className="dropmenu-list heighted">
                            <button onClick={() => setCategory('الكل')}>الكل</button>
                            <button onClick={() => setCategory('تأهيل امراض الأعصاب وجراحاتها')}>تأهيل امراض الأعصاب وجراحاتها</button>
                            <button onClick={() => setCategory('تأهيل امراض العظام والعمود الفقري وجراحاتها')}>تأهيل امراض العظام والعمود الفقري وجراحاتها</button>
                            <button onClick={() => setCategory('تأهيل اصابات الرياضيين')}>تأهيل اصابات الرياضيين</button>
                            <button onClick={() => setCategory('التغذية العلاجية ونحت وتنسيق القوام')}>التغذية العلاجية ونحت وتنسيق القوام</button>
                            <button onClick={() => setCategory('تأهيل امراض الصدر')}>تأهيل امراض الصدر</button>
                            <button onClick={() => setCategory('تأهيل امراض النسا والولادة')}>تأهيل امراض النسا والولادة</button>
                            <button onClick={() => setCategory('تأهيل امراض القلب')}>تأهيل امراض القلب</button>
                            <button onClick={() => setCategory('تأهيل امراض الباطنة والمسنين')}>تأهيل امراض الباطنة والمسنين</button>
                            <button onClick={() => setCategory('اخرى')}>اخرى</button>
                        </div>
                        )}
                    </div>
                </div>

                <h2>تصفية</h2>
            </div>

        </div>
    )
}


export default FilterComponent;