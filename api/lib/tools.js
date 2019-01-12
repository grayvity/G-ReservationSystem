var moment = require("moment");

function creatNewId() {
  var epoch = moment(new Date()).unix();
  let rand = Math.floor(Math.random() * 100);
  return parseInt(epoch + "" + rand);
}

function eng_weekday_to_mn(weekday) {
  switch (weekday) {
    case "Mon":
      return "Дав";
    case "Tue":
      return "Мяг";
    case "Wed":
      return "Лха";
    case "Thu":
      return "Пүр";
    case "Fri":
      return "Баа";
    case "Sat":
      return "Бям";
    case "Sun":
      return "Ням";
    default:
      return weekday;
  }
}

module.exports = { creatNewId, eng_weekday_to_mn };
