import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useContext } from "react";
import { AppContext } from "@/utils/contextAPI";

const Cookies = () => {
  const AppContxt = useContext(AppContext);

  useEffect(() => {
    const checkAcceptance = () => {
      const check = localStorage.getItem('cookies-acceptance');

      if (check === 'Yes') {
        AppContxt.setCookiesAcceptance(true);
      } else {
        AppContxt.setCookiesAcceptance(false);
      }
    };

    checkAcceptance();
  }, [AppContxt]);

  return (
    <>
      {!AppContxt.cookiesAcceptance && (
        <div className="cookies-acceptace-container">
          <IoMdCloseCircle
            onClick={() => {
              localStorage.setItem('cookies-acceptance', 'Yes');
              AppContxt.setCookiesAcceptance(true);
            }}
            className="Icon"
          />
          <p>
            من خلال الاستمرار في استخدام هذا الموقع، فإنك توافق على استخدام ملفات تعريف الارتباط وفقًا لسياسة{' '}
            <Link href="#">ملفات تعريف الارتباط</Link> الخاصة بنا.
          </p>
        </div>
      )}
    </>
  );
};

export default Cookies;
