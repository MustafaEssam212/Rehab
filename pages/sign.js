import AuthModal from "@/Components/Auth-Modal/Modal";
import { getSession } from "next-auth/react";


export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (session) {

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


const Sign = () => {
    return(
        <div className="sign-page-container">
            <AuthModal />
        </div>
    )
}


export default Sign;