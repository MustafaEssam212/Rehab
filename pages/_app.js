
import '@/styles/main.scss';
import Layout from '@/Layouts/Layout';
import { AppProvider } from '@/utils/contextAPI';
import Loading from '@/Components/Loading';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import '../styles/icofont/webapp.css';
import '../styles/icofont/medical.css';
import '../styles/icofont/person.css';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';


export default function App({ Component, pageProps }) {

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
      <Layout>
        <DefaultSeo {...SEO} />
        {loading && <Loading />}
        <Component {...pageProps} />
      </Layout>
    </AppProvider>

  );
}
