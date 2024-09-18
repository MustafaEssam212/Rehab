
import '@/styles/main.scss';
import Layout from '@/Layouts/Layout';
import { AppProvider } from '@/utils/contextAPI';
import Loading from '@/Components/Loading';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import '../styles/icofont/webapp.css';
import '../styles/icofont/medical.css';
import '../styles/icofont/person.css';
import '../styles/icofont/device.css';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { Flip} from 'react-toastify';
import '@/styles/ReactToastify.css';
import { SessionProvider } from "next-auth/react"



const ToastContainer = dynamic(
  () => import('react-toastify').then(mod => mod.ToastContainer),
  { ssr: false }
);

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Handle initial load
    const handleInitialLoad = () => {
      setLoading(false);
    };

    handleInitialLoad(); // Call immediately after component mounts

    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (

    <AppProvider >
      <SessionProvider session={session} >
      <Layout>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZNKCRSGR30"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZNKCRSGR30');
          `}
        </Script>
        <DefaultSeo {...SEO} />
        {loading && <Loading />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition= {Flip}
          />
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </AppProvider>

  );
}
