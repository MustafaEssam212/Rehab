import { toast } from "react-toastify";
import { getSession } from "next-auth/react";
import HeadSystem from "@/Components/System/Head";
import { useState, useEffect } from "react";
import LoadingCircle from "@/Components/Loading-Circle";
import { IoMdArrowDropdown } from "react-icons/io";


export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('مسح مدونة')) {

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



const RemoveBlog = () => {

    const [blogsNames, setBlogsNames] = useState([]);
    const [openBlogs, setOpenBlogs] = useState(false);
    const [blog, setBlog] = useState('');
    const [btnLoading, setBtnLoading] = useState('');

    const getData = async () => {
        const res = await fetch(`/api/getData?method=get-blogs-names`);
        const dataOfResponse = await res.json();
        if(res.status === 200){
            setBlogsNames(dataOfResponse.blogsNames);
        }else{
            toast.error(dataOfResponse.message)
        }
    }
    
    useEffect(()=> {
        getData();
    }, [])


    const handleDelete = async () => {
        setBtnLoading(true);
        if(!blog){
            toast.warning('برجاء اختيار المدونة المراد حذفها')
        }else{
            const res = await fetch(`/api/editData?method=delete-blog&blogName=${blog}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const dataOfResponse = await res.json();

            if(res.status === 200){
                toast.success(dataOfResponse.message);
                setBlog('');
                getData();
                setBtnLoading(false);
            }else{
                toast.error(dataOfResponse.message);
                setBtnLoading(false);
            }
        }

    }


    return(
        <div className="remove-blog-page system-page">
            <HeadSystem name={`مسح مدونة`} />
  
            <div className="inner-remove-blog">
                <h1>برجاء اختيار المدونة المراد حذفها</h1>
                <div onClick={()=> setOpenBlogs(!openBlogs)} className="dropmenu"><IoMdArrowDropdown className="icon" /> <p>{blog ? blog : `اسم المدونة`}</p> 
                        {openBlogs &&  <div className="dropmenu-list heighted">
                            
                            {
                                blogsNames.map((e, key) => {
                                    return(
                                        <button key={key} aria-label={e.name} onClick={()=> setBlog(e.name)}>{e.name}</button>
                                    )
                                })
                            }

                    </div>}
                </div>

                <button onClick={handleDelete} className="main-btn">{btnLoading ? <LoadingCircle providedcolor="white" size={`25px`} /> : `مسح`}</button>
            </div>
        </div>
    )
}

export default RemoveBlog;