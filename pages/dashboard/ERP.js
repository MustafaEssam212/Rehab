import { getSession } from "next-auth/react";
import ERPStatistics from "@/Components/System/ERP-Statistics";
import { IoIosStats } from "react-icons/io";
import { useState } from "react";
import {FaMoneyBill, FaUserAltSlash} from 'react-icons/fa'
import { GiSwapBag } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import TopBar from "@/Components/System/Top-Bar";
import Package from "@/Components/System/Package";
import NonUsers from "@/Components/System/Non-Users";
import Pay from "@/Components/System/Pay";
import OutgoingComponent from "@/Components/System/Outgoing";
import { MdCurrencyExchange } from "react-icons/md";
import SessionPayment from "@/Components/System/Session-Payment";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('ERP')) {

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


const ERP = () => {

    const [section, setSection] = useState('statistics');

    return(
        <div className="ERP-page-container system-page">

            <div className="left-ERP">
                  <button onClick={()=> setSection('statistics')} className={section === 'statistics' ? "active" : ""} aria-label="احصائيات"><IoIosStats className="icon" /> <span>احصائيات</span></button>
                  <button onClick={()=> setSection('billing')} className={section === 'billing' ? "active" : ''} aria-label="الدفع"><FaMoneyBill className="icon" /> <span>الدفع</span></button> 
                  <button onClick={()=> setSection('session-payment')} className={section === 'session-payment' ? "active" : ""} aria-label="تغيير حالة الحجز"><MdCurrencyExchange className="icon" /> <span>تغيير حالة الحجز</span></button>
                  <button onClick={()=> setSection('non-users')} className={section === 'non-users' ? "active" : ""} aria-label="العملاء غير المسجلين"><FaUserAltSlash className="icon" /> <span>العملاء غير المسجلين</span></button> 
                  <button onClick={()=> setSection('packages')} className={section === 'packages' ? "active" : ""} aria-label="باكيدچ"><GiSwapBag className="icon" /> <span>باكيدچ</span></button>
                  <button onClick={()=> setSection('outgoing')} className={section === 'outgoing' ? "active" : ""} aria-label="الصادرات"><FaMoneyBillTrendUp className="icon" /> <span>الصادرات</span></button>
            </div>


            <div className="right-ERP">
                
                <TopBar />
                {section === 'packages' && <Package />}
                {section === 'non-users' && <NonUsers />}
                {section === 'billing' && <Pay />}
                {section === 'outgoing' && <OutgoingComponent />}
                {section === 'session-payment' && <SessionPayment />}
                {section === 'statistics' && <ERPStatistics />}
            </div>


        </div>
    )
}


export default ERP;