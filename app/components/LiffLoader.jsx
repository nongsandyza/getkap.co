'use client';

import { useEffect } from 'react';

export default function LiffLoader() {
  useEffect(() => {
    // Load Liff SDK if Liff ID is configured
    const liffId = localStorage.getItem('liff_id');
    
    if (!liffId) {
      // Liff ID not configured, skip loading
      return;
    }

    // Check if Liff is already loaded
    if (window.liff) {
      return;
    }

    // Load Liff SDK script
    const script = document.createElement('script');
    script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
    script.async = true;
    script.onload = () => {
      // Initialize Liff with the stored Liff ID
      if (window.liff) {
        window.liff
          .init({ liffId })
          .then(() => {
            console.log('✅ Liff initialized successfully');
          })
          .catch((err) => {
            console.error('❌ Liff initialization error:', err);
          });
      }
    };
    script.onerror = () => {
      console.error('❌ Failed to load Liff SDK');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}
