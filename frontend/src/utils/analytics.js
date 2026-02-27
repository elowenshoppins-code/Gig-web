import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

// Google Analytics Tracking ID - Replace with your actual tracking ID
const TRACKING_ID = 'G-XXXXXXXXXX'; // TODO: Replace with real GA4 tracking ID

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA4
    if (TRACKING_ID && TRACKING_ID !== 'G-XXXXXXXXXX') {
      ReactGA.initialize(TRACKING_ID);
    }
  }, []);

  useEffect(() => {
    // Track page views
    if (TRACKING_ID && TRACKING_ID !== 'G-XXXXXXXXXX') {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location]);

  return null;
};

// Track custom events
export const trackEvent = (category, action, label) => {
  if (TRACKING_ID && TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }
};

// Track APK download
export const trackAPKDownload = () => {
  trackEvent('Download', 'APK Download', 'Android APK');
};

// Track store link clicks
export const trackStoreClick = (store) => {
  trackEvent('Download', `${store} Store Click`, store);
};
