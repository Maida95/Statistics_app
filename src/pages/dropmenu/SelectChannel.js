import React, { useState, useEffect } from 'react';
import useFetch from '../../forms/useFetch';

const SelectChannel = ({ onSelectChannel }) => {
  const [channelList, setChannelList] = useState([]);

  const handleChannelSelect = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedChannelUid = selectedOption.value;
    const selectedChannelName = selectedOption.dataset.name;
    onSelectChannel(selectedChannelUid, selectedChannelName);
  };

  // Fetch channel list
  const channelResult = useFetch({
    endpoint: '/getChannelList',
    method: 'GET',
    params: {},
    render: {}
  });
  
  useEffect(() => {
    if (channelResult) {
      setChannelList(channelResult.channelList.result || []);

    }
  }, [channelResult]);
  
  return (
    <div>
      <select
        className="form-control"
        onChange={handleChannelSelect}
      >
        <option value="">Lista kanala</option>

        {channelList.map((channel) => (
          <option
            value={channel.channelUid}
            key={channel.channelUid}
            data-name={channel.name} // Store the name as a data attribute
          >
            {channel.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectChannel;