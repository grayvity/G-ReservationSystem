var moment = require("moment");

function creatNewId() {
  var epoch = moment(new Date()).unix();
  let rand = Math.floor(Math.random() * 100);
  return parseInt(epoch + "" + rand);
}

module.exports = { creatNewId };
