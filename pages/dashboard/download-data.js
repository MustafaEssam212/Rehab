import HeadSystem from "@/Components/System/Head";
import { getSession } from "next-auth/react";
import { FaDownload } from "react-icons/fa6";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('تحميل بيانات العملاء')) {

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



const DownloadData = () => {


    const handleDownload = async () => {  
        try {
          const response = await fetch('/api/getData?method=download-users-data');
          const users = await response.json();

      
          if (!Array.isArray(users)) {
            toast.error('حدث خطأ اثناء تنفيذ العملية');
            return;
          }
      
          // Format user data with Arabic headers
          const formattedUsers = users.map(user => ({
            'الجنس': user.gender,
            'تاريخ الميلاد': user.dateOfBirth,
            'رقم الهاتف': user.phoneNumber,
            'الايميل': user.email,
            'الاسم': user.username,
            }));
      
          // Create a new workbook and worksheet
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(formattedUsers);
      
          // Set the worksheet direction to RTL
          worksheet['!rtl'] = true;
      
          // Auto-fit the column widths based on content
          const maxLengths = Object.keys(formattedUsers[0]).map(key => {
            return Math.max(...formattedUsers.map(user => (user[key] || '').toString().length), key.length);
          });
      
          worksheet['!cols'] = maxLengths.map(length => ({ wch: length + 5 })); // Adding extra padding to width
      
          // Append the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'العملاء');
      
          // Trigger download of the Excel file
          XLSX.writeFile(workbook, 'العملاء.xlsx');
        } catch (error) {
          toast.error('حدث خطأ اثناء تنفيذ العملية');
        }
      };
 
    return(
        <div className="download-data-page system-page">
            <HeadSystem name={`تحميل بيانات العملاء`} />


            <div className="inner-download-data">
                <h1>يمكنك تحميل بيانات العملاء من قاعدة البيانات على هيئة <span>ملف اكسيل</span> فقط قم بالضغط على زر &quot;تحميل&quot; ليبدأ تحميل الملف</h1>

                <button onClick={handleDownload} aria-label="تحميل">تحميل <FaDownload className="icon" /></button>
            </div>
        </div>
    )
}


export default DownloadData;