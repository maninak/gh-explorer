import { useState, useEffect } from 'react';

export function useHttp(url, dependencies = []) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);
    console.log('Sending Http request to URL: ' + url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, url]);

  return { isLoading, fetchedData };
};