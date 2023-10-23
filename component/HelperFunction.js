const readDate = (notFormat) => {
  const time = notFormat.split("t");
  let dayOfWeek = [];
  let startingTime = `${time[1]}:00`;
  switch (time[0]) {
    case "d1":
      dayOfWeek = "星期一";
      break;
    case "d2":
      dayOfWeek = "星期二";
      break;
    case "d3":
      dayOfWeek = "星期三";
      break;
    case "d4":
      dayOfWeek = "星期四";
      break;
    case "d5":
      dayOfWeek = "星期五";
      break;
    case "d6":
      dayOfWeek = "星期六";
      break;
    case "d7":
      dayOfWeek = "星期日";
      break;

    default:
    // code block
  }

  const result = [dayOfWeek, startingTime];
  return result;
};

export default readDate;
