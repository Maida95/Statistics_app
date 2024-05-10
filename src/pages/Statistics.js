import React, { useState } from 'react';
import SelectChannel from './dropmenu/SelectChannel';
import SelectProgram from './dropmenu/SelectProgram';
import CustomCalender from '../CustomCalendar';
import GetLiveChannelStatistics from './dropmenu/GetLiveChannelStatistics';


const Statistics = () => {
  const [selectedChannelUid, setSelectedChannelUid] = useState('');
  const [selectedChannelName, setSelectedChannelName] = useState('');
  const [selectedProgramUid, setSelectedProgramUid] = useState('');
  const [selectedProgramName, setSelectedProgramName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProgramStart, setSelectedProgramStart] = useState('');

  const handleChannelSelect = (selectedChannelUid, selectedChannelName ) => {
    setSelectedChannelUid(selectedChannelUid);
    setSelectedChannelName(selectedChannelName);
  };

  const handleProgramSelect = (selectedProgramUid, selectedProgramName, selectedProgramStart) => {
    setSelectedProgramUid(selectedProgramUid);
    setSelectedProgramName(selectedProgramName);
    setSelectedProgramStart(selectedProgramStart);
  };

  return (
    <div className="form">
      <form>
        <SelectChannel onSelectChannel={handleChannelSelect} />
        <p>Selected channel UID: {selectedChannelUid}</p>
        <p>Selected channel name: {selectedChannelName}</p>
        <label>Select Date:</label>
        <CustomCalender onSelectDate={(e) => setSelectedDate(e.format('YYYY-MM-DD'))} />
        <SelectProgram selectedChannelUid={selectedChannelUid} selectedDate={selectedDate} onSelectProgram={handleProgramSelect} />
        <p>Selected program UID: {selectedProgramUid}</p>
        <p>Selected program name: {selectedProgramName}</p>
        <button>Prikaži statistiku</button>
       

      </form>
    </div>
  );
};

export default Statistics;
