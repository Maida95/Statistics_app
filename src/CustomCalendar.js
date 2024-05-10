// CustomCalender.js
import React from "react";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

export default function CustomCalender({ onSelectDate }) {
  // disable past and future dates
  const yesterday = moment().subtract(7, "day");
  const today = moment();
  const disDates = (current) => {
    return current.isAfter(yesterday) && current.isBefore(today);
  };

  return (
    <div>
      <DatePicker
        timeFormat={false}
        isValidDate={disDates}
        onChange={(date) => onSelectDate(date)}
      />
    </div>
  );
}
