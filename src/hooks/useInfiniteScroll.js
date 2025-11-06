import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (callback, hasMore, loading) => {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop 
        !== document.documentElement.offsetHeight || loading || !hasMore) {
      return;
    }
    callback();
  }, [callback, hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};