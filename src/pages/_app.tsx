import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import { GoogleAnalytics } from "nextjs-google-analytics";
import * as Fathom from 'fathom-client';
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom
    // Add your Tracking Code and your Domain here
    Fathom.load('FATHOM_TRACKING_CODE', {
      includedDomains: ['yourdomain.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    // Record a Pageview
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Stop the event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };

  }, []);

  return (
    <div>
      <GoogleAnalytics trackPageViews strategy="lazyOnload" />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
