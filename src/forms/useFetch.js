import React, { useState, useEffect } from 'react';
import { getAccessToken, baseUrl } from '../token_authorization/getAccessToken';
 
const useFetch = ({ endpoint, method = 'GET', params = {}, render={} }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken(); 

        let url = `${baseUrl}/api/v1${endpoint}`;
        

        if (method === 'GET' && Object.keys(params).length > 0) {
          const queryParams = new URLSearchParams(params);
          url = `${url}?${queryParams}`;
          
        }

        const response = await fetch(url, {
          method: method,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
          
        }

        const result = await response.json();
      

        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [render]);

  return data
};

export default useFetch;
