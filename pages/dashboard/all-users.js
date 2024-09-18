import HeadSystem from "@/Components/System/Head";
import { useEffect, useState } from "react";
import LoadingCircle from "@/Components/Loading-Circle";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('جميع المستخدمين')) {

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



const AllUsers = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [page, setPage] = useState(1);
    const [data, setData] = useState({
        length: 0,
        users: []
    });

    const getData = async (pageNumber) => {
        const res = await fetch(`/api/getData?method=get-all-users&page=${pageNumber}`);
        const dataOfResponse = await res.json();
        if (res.status === 200) {
            setData(prevData => ({
                length: dataOfResponse.length,
                users: pageNumber === 1 
                    ? dataOfResponse.users 
                    : [...prevData.users, ...dataOfResponse.users]
            }));
            setLoadingPage(false);
            setBtnLoading(false);
        } else {
            setLoadingPage(false);
            setBtnLoading(false);
        }
    }

    useEffect(() => {
        getData(page);
    }, [page]);

    return (
        <div className="all-users-container system-page">
            <HeadSystem name={`عدد المستخدمين`} />

            <div className="all-users-head">
                <h1>{data.length}</h1>
                <h1>الإجمالي</h1>
            </div>

            <div className="users">
                {data.users.map((e, key) => (
                    <div key={key} className="user">
                        <div>{e.gender}</div>
                        <div>{e.dateOfBirth}</div>
                        <div>{e.phoneNumber}</div>
                        <div>{e.email}</div>
                        <div>{e.username}</div>
                    </div>
                ))}
            </div>

            <div className="load-more">
                <button 
                    aria-label="المذيد" 
                    onClick={() => { 
                        setBtnLoading(true); 
                        setPage(prevPage => prevPage + 1); 
                    }}
                >
                    {btnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `المذيد`}
                </button>
            </div>

            <div className="loading-page-users">
                {loadingPage ? 
                    <LoadingCircle providedcolor="#309C53" size={`45px`} /> 
                    : <>{data.length === 0 && <p>لا يوجد معلومات حالياً</p>}</>
                }
            </div>
        </div>
    );
}

export default AllUsers;
