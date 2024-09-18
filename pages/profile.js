import { IoMdSettings, IoMdLock} from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import LoadingCircle from "@/Components/Loading-Circle";
import dynamic from "next/dynamic";
import { useState } from "react";
import { getSession } from "next-auth/react";


export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {

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

const PreviousReservations = dynamic(() => import('@/Components/Profile/Previous-Reservations'), {
    loading: () => (
        <div className="loading">
            <LoadingCircle providedcolor="#309C53" size="45px" />
        </div>
    ),
});


const ProfileSettings = dynamic(() => import('@/Components/Profile/Settings'), {
    loading: () => (
        <div className="loading">
            <LoadingCircle providedcolor="#309C53" size="45px" />
        </div>
    ),
});


const PasswordChange = dynamic(()=> import('@/Components/Profile/Change-Password'), {
    loading: ()=> (
        <div className="loading">
            <LoadingCircle providedcolor="#309C53" size="45px" />
        </div>
    )
})

const Profile = () => {

    const [section, setSection] = useState('reservations');

    return(
        <div className="profile-page-contianer">

            <div className="content">
                {
                    section === 'reservations' && <PreviousReservations />
                }
                {
                    section === 'information' && <ProfileSettings />
                }
                {
                    section === 'password' && <PasswordChange />
                }
    
            </div>
                

            <div className="buttons">
                <button onClick={()=> setSection('reservations')} className={section === 'reservations' ? "active" : ""} aria-label="حجوزاتي">حجوزاتي <IoTicket className="icon" /></button>
                <button onClick={()=> setSection('information')} className={section === 'information' ? "active" : ""} aria-label="تعديل المعلومات">تعديل المعلومات <IoMdSettings className="icon" /></button>
                <button onClick={()=> setSection('password')} className={section === 'password' ? "active" : ""} aria-label="تغيير كلمة المرور">تغيير كلمة المرور <IoMdLock className="icon" /></button>
            </div>

        </div>
    )
}


export default Profile;