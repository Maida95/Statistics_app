import React, { useState, useEffect } from 'react';
import useFetch from '../../forms/useFetch';


const GetLiveChannelStatistics = () => {
  const [data, setData] = useState([]);

  // Fetch Programs for the Selected Channel
  const fetchedData = useFetch({
    endpoint: '/getLiveChannelStatistics',
    method: 'GET',
    params: { channelName: 'FTV HD', programName: 'Princ iz Eleja', date: '2024-03-04 19:20' },
    render: {}
  });
  

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData || []);
      console.log('data: ', data);
    }
  }, [fetchedData]);

  return (
    <div>
      {data && data.success && (
        <div>
          <h2>Live Channel Statistics</h2>
          <ul>
            {data.liveTVstatistics.result.map((item, index) => (
              <li key={index}>
                {item.regionUid}: {item['count distinct device']}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetLiveChannelStatistics;