
import Link from "next/link";
import { FaUserDoctor, FaUsers, FaArrowsRotate, FaDownload } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";
import { RiCalendarScheduleFill, RiMessage2Fill } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaUnlock, FaBloggerB, FaBirthdayCake, FaTrash, FaCoins} from "react-icons/fa";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BiSolidBookAdd, BiSolidCommentAdd } from "react-icons/bi";
import { MdWork } from "react-icons/md";


export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin') {

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData?method=check-email-for-permissions&email=${session.user.email}`);
    const dataOfResponse = await res.json();
    const permissions = dataOfResponse.permissions;


    return {
      props: {permissions},
    };
  }

const Dashboard = ({permissions}) => {

  const [number, setNumber] = useState(0);
  const [birthdaysNum, setBirthdaysNum] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getNumbers = async () => {
      const res = await fetch(`/api/getData?method=getNumbers`);
      const dataOfResponse = await res.json();
      if(res.status === 200){
        setNumber(dataOfResponse.number);
        setBirthdaysNum(dataOfResponse.birthdaysNum);
      }else{
        setNumber(0)
      }
    }
    getNumbers()
  }, []);

  
 
  const handleRoute =  (check, href) => {
    if(permissions.includes(check)){
      router.push(href);
    }else{
      toast.error('غير مصرح لك بالدخول')
    }

  }

    return(
        <div className="dashboard-page-container">
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('اعطاء صلاحيات', '/dashboard/permissions')}} aria-label="اعطاء صلاحيات" title="اعطاء صلاحيات"><FaUnlock className="icon" />اعطاء صلاحيات</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('اضافة دكتور', '/dashboard/add-doctor')}} aria-label="اضافة دكتور" title="اضافة دكتور"><FaUserDoctor className="icon" /> اضافة دكتور</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('مسح دكتور', '/dashboard/remove-doctor')}} aria-label="مسح دكتور" title="مسح دكتور"><FaTrash className="icon" /> مسح دكتور</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('اضافة جدول يومي', '/dashboard/schedule')}} aria-label="اضافة جدول يومي" title="اضافة جدول يومي"><AiFillSchedule className="icon" /> اضافة جدول يومي</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('اضافة جدول شهري', '/dashboard/schedule-monthly')}} aria-label="اضافة جدول شهري" title="اضافة جدول شهري"><BsCalendar2MonthFill className="icon" /> اضافة جدول شهري</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('مسح دكتور من الجدول', '/dashboard/delete-doctor-from-schedule')}} aria-label="مسح دكتور من الجدول" title="مسح دكتور من الجدول"><FaTrash className="icon" /> مسح دكتور من الجدول</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('جدول وحجوزات', '/dashboard/schedule-booking')}} aria-label="جدول و حجوزات" title="جدول و حجوزات"><RiCalendarScheduleFill className="icon" /> جدول و حجوزات</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('اضافة حجز', '/dashboard/add-reservation')}} aria-label="اضافة حجز" title="اضافة حجز"><BiSolidBookAdd className="icon" />اضافة حجز</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('تعديل حجز', '/dashboard/reservation')}} aria-label="تعديل حجز" title="تعديل حجز"><IoTicket className="icon" />تعديل حجز</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('مسح حجز', '/dashboard/delete-reservation')}} aria-label="مسح حجز" title="مسح حجز"><FaTrash className="icon" />مسح حجز</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('تبديل حجز', '/dashboard/switch-reservation')}} aria-label="تبديل حجز" title="تبديل حجز"><FaArrowsRotate className="icon" /> تبديل حجز</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('المواعيد المتاحة', '/dashboard/available-appointments')}} aria-label="المواعيد المتاحة" title="المواعيد المتاحة"><MdEventAvailable className="icon" /> المواعيد المتاحة</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('جميع المستخدمين', '/dashboard/all-users')}} aria-label="جميع المستخدمين" title="جميع المستخدمين"><FaUsers className="icon" /> جميع المستخدمين</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('كتابة اراء عملائنا', '/dashboard/write-review')}} aria-label="كتابة اراء عملائنا" title="كتابة اراء عملائنا"><BiSolidCommentAdd className="icon" /> كتابة اراء عملائنا</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('مسح اراء عملائنا', '/dashboard/delete-review')}} aria-label="مسح اراء عملائنا" title="مسح اراء عملائنا"><FaTrash className="icon" />مسح اراء عملائنا</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('سابقة اعمالنا', '/dashboard/write-previous-work')}} aria-label="سابقة اعمالنا" title="سابقة اعمالنا"><MdWork className="icon" /> سابقة اعمالنا</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('مسح سابقة اعمالنا', '/dashboard/delete-previous-work')}} aria-label="مسح سابقة اعمالنا" title="مسح سابقة اعمالنا"><FaTrash className="icon" />مسح سابقة اعمالنا</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('كتابة مدونة', '/dashboard/write-blog')}} aria-label="كتابة مدونة" title="كتابة مدونة"><FaBloggerB className="icon" /> كتابة مدونة</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('مسح مدونة', '/dashboard/remove-blog')}} aria-label="مسح مدونة" title="مسح مدونة"><FaTrash className="icon" /> مسح مدونة</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('رسائل التواصل', '/dashboard/contact-messages')}} aria-label="رسائل التواصل" title="رسائل التواصل"><RiMessage2Fill className="icon" /> رسائل التواصل <span>{number}</span></Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('تحميل بيانات العملاء', '/dashboard/download-data')}} aria-label="تحميل بيانات العملاء" title="تحميل بيانات العملاء"><FaDownload className="icon" /> تحميل بيانات العملاء</Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('اعياد الميلاد', '/dashboard/users-birthdays')}} aria-label="اعياد الميلاد" title="اعياد الميلاد"><FaBirthdayCake className="icon" /> اعياد الميلاد <span>{birthdaysNum}</span></Link>
            <Link href="#" onClick={(e)=> {e.preventDefault(); handleRoute('ERP', '/dashboard/ERP')}} aria-label="ERP" title="ERP"><FaCoins className="icon" />ERP </Link>

        </div>
    )
}


export default Dashboard;