import { useEffect } from 'react';

const useScript = (url, onLoad) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    if (onLoad) {
      script.onload = onLoad;
    }
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url, onLoad]);
};

export default useScript;
