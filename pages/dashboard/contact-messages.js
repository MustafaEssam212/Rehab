import { FaUser, FaCalendar, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import HeadSystem from "@/Components/System/Head";
import LoadingCircle from "@/Components/Loading-Circle";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin' || !session.user.permissions.includes('رسائل التواصل')) {

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



const ContactMessages = () => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMessages = async () => {
            const res = await fetch(`/api/getData?method=get-contact-messages`);
            const dataOfResponse = await res.json();
            if(res.status === 200){
                setMessages(dataOfResponse.messages);
                setLoading(false);
            }else{
                setMessages([]);
                setLoading(false);
                toast.error(dataOfResponse.message)
            }
        }

        getMessages();
    }, [])

    return(
        <div className="contact-messages-page-container system-page">
                <HeadSystem name={`رسائل التواصل`} />

                <div className="messages-container">

                    {!loading && messages.length > 0 && <div className="inner-messages-container">

                            {
                                messages.map((e, key) => {
                                    return(
                                        <div key={key} className="message-container">
                                        <div className="left-message">
                                            <h2><span>الموضوع:</span> {e.subject}</h2>
                                            <h4>{e.message}</h4>
                                        </div>
            
                                        <div className="right-message">
                                            <div className="right-message-section">
                                                <p><FaUser className="icon" /> {e.name}</p>
                                                <p><FaPhone className="icon" /> {e.phoneNumber}</p>
                                            </div>
                                            <div className="right-message-section">
                                                <p><FaCalendar className="icon" /> {e.date}</p>
                                                <p><MdEmail className="icon email-icon" /> {e.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }

                    </div>}


                </div>



                {loading && messages.length === 0 && <div className="loading"><LoadingCircle providedcolor="#309C53" size={`45px`}/></div>}

                {!loading && messages.length === 0 && <p className="alert-parag">لا يوجد رسائل</p>}
        </div>
    )
}


export default ContactMessages;