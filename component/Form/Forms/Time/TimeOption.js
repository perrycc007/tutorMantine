const time = [
  { value: "0800", label: "08" },
  { value: "0900", label: "09" },
  { value: "1000", label: "10" },
  { value: "1100", label: "11" },
  { value: "1200", label: "12" },
  { value: "1300", label: "13" },
  { value: "1400", label: "14" },
  { value: "1500", label: "15" },
  { value: "1600", label: "16" },
  { value: "1700", label: "17" },
  { value: "1800", label: "18" },
  { value: "1900", label: "19" },
  { value: "2000", label: "20" },
  { value: "2100", label: "21" },
  { value: "2200", label: "22" },
];
const datetimekey = ["一", "二", "三", "四", "五", "六", "日"];
const datetime = {
  MON: time,
  TUE: time,
  WED: time,
  THU: time,
  FRI: time,
  SAT: time,
  SUN: time,
};

const dateAndTime = [datetime, datetimekey];
export default dateAndTime;
