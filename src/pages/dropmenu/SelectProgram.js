import React, { useState, useEffect } from 'react';
import useFetch from '../../forms/useFetch';


const SelectProgram = ({ selectedChannelUid, selectedDate, onSelectProgram }) => {
  const [programList, setProgramList] = useState([]);

  const handleProgramSelect = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedProgramUid = selectedOption.value;
    const selectedProgramTitle = selectedOption.dataset.title;
    const selectedProgramStart = selectedOption.dataset.start
    onSelectProgram(selectedProgramUid, selectedProgramTitle, selectedProgramStart);
  };


  // Fetch Programs for the Selected Channel
  const fetchedPrograms = useFetch({
    endpoint: '/getChannelPrograms',
    method: 'GET',
    params: { regionUid: 'mojatv', channelUid: selectedChannelUid, date: selectedDate },
    render: selectedDate
  });

  console.log('programs: ', fetchedPrograms);

  useEffect(() => {
    if (fetchedPrograms) {
      setProgramList(fetchedPrograms.programList.result || []);

    }
  }, [fetchedPrograms,selectedChannelUid, selectedDate]);

  return (
    <div>
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
    </div>
  );
};

export default SelectProgram;
