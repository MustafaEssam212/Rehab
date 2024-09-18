import HeadSystem from "@/Components/System/Head";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingCircle from "@/Components/Loading-Circle";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('اعياد الميلاد')) {

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


const UsersBirthdays = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch(`/api/getData?method=get-users-birthdays`);
            const dataOfResponse = await res.json();

            if(res.status === 200){
                setUsers(dataOfResponse.users);
                setLoading(false);
            }else{
                setLoading(false);
            }
        }

        getUsers()
    }, [])

    return(
        <div className="users-birthdays-page system-page">
            <HeadSystem name={`اعياد الميلاد`} />

            <div className="inner-users-birthdays">
                {!loading && users.length === 0 && <p className="no-length">لا يوجد اعياد ميلاد اليوم</p>}
                {loading && users.length === 0 && <div className="loading-birthdays"><LoadingCircle providedcolor="#309C53" size={`45px`} /></div>}
                {
                    !loading && users.length > 0 && <div className="users-birthdays">
                        {users.map((e, key) => (
                            <div key={key} className="user">
                                <div>{e.gender}</div>
                                <div>{e.dateOfBirth}</div>
                                <div>{e.phoneNumber}</div>
                                <div>{e.email}</div>
                                <div>{e.username}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}


export default UsersBirthdays;