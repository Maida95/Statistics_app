import React, { useEffect, useState } from 'react';
import SelectChannel from './dropmenu/SelectChannel';
import SelectProgram from './dropmenu/SelectProgram';
import CustomCalender from '../CustomCalendar';
import GetLiveChannelStatistics from './dropmenu/GetLiveChannelStatistics';
import {fetchData} from '../forms/fetchData';

const Statistics = () => {
  const [channelList, setChannelList] = useState([]);
  const [selectedChannelUid, setSelectedChannelUid] = useState('');
  const [selectedChannelName, setSelectedChannelName] = useState('');
  const [selectedProgramUid, setSelectedProgramUid] = useState('');
  const [selectedProgramName, setSelectedProgramName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProgramStart, setSelectedProgramStart] = useState('');
  const [programList, setProgramList] = useState([]);
  const [liveStatistics, setLiveStatistics] = useState([]);

  useEffect(() =>{
    // Fetch channel list
    fetchData('/getChannelList', 'GET').then(response =>{
      if(response.success){
        setChannelList(response.data.channelList.result);
      }else{
        console.error("Error fetching channels");
      }
    })
  }, []);

  useEffect(() =>{
    const fetchPrograms = async () => {
      console.log(selectedChannelUid);
      console.log(selectedDate);
      try{
        const response = await fetchData(`/getChannelPrograms?regionUid=mojatv&channelUid=${selectedChannelUid}&date=${selectedDate}`, 'GET');
        if(response.success){
          setProgramList(response.data.programList.result);
        }
      }catch(error){
        console.log("Error fetching data");
      }
    };
    if(selectedChannelUid && selectedDate){
      fetchPrograms();
    }
  }, [selectedChannelUid, selectedDate]);

  const handleChannelSelect = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedChannelUid(selectedOption.value);
    setSelectedChannelName(selectedOption.dataset.name);
  };

  const handleProgramSelect = (e) =>{
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedProgramName(selectedOption.dataset.title);
    setSelectedProgramStart(selectedOption.dataset.start);
  };

  const handleLiveStatistics = async () =>{
    if(selectedChannelUid && selectedDate && programList){
      try{
        const response = await fetchData(`/getLiveChannelStatistics?channelName=${selectedChannelName}&programName=${selectedProgramName}
        &date=${selectedProgramStart}`, 'GET');
        if(response.success){
          setLiveStatistics(response.data.liveTVstatistics.result);
        }
      }catch(error){
        console.log("Error fetching data");
      }
    }
  }

  return (
    <div className="form">
      <form>
      <div>
      <label>Odaberite kanal:</label>
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
        <label>Odaberite datum:</label>
        <CustomCalender onSelectDate={(e) => {setSelectedDate(e.format('YYYY-MM-DD'))}} />
        <label>Odaberite program:</label>
      <select
        className="form-control"
        
        onChange={handleProgramSelect}
      >
        <option value="">Lista programa</option>

        {programList.map(program => {
              const startTime = new Date(program.schedulePeriod.start);
              const endTime = new Date(program.schedulePeriod.end);

              const formattedStartTime = `${startTime.toISOString().slice(0, 16).replace('T', ' ')}`;
              const formattedEndTime = `${endTime.toISOString().slice(0, 16).replace('T', ' ')}`;

              const formattedSchedule = `${formattedStartTime} - ${formattedEndTime}`;

              return (
                <option value={program.programUid} key={program.programUid} data-title={program.title} data-start={formattedStartTime} >
                  {`${program.title} ${formattedSchedule}`}
                </option>
              );
              })}
      </select>
        
        <button type="button" onClick={handleLiveStatistics}>Prikaži statistiku</button>

      </form>
      <div>
        {liveStatistics.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                {/* Assuming you have specific columns to display, add them here */}
                <th>Statistic 1</th>
                {/* Add more columns as necessary */}
              </tr>
            </thead>
            <tbody>
              {liveStatistics.map((stat, index) => (
                <tr key={index}>
                  {/* Assuming stat object has properties to display, replace these with actual property names */}
                  <td>{stat.regionUid}</td>
                  <td>{stat['count distinct device']}</td>
                  {/* Add more columns as necessary */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No statistics available</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
