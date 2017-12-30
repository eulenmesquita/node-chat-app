const moment = require('moment');

var date = moment();

// 10:35 am
// 6:01 am
console.log(date.format('hh:mm a'));
console.log(date.format('h:mm a'));