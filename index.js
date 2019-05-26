var fs = require('fs');
var FundGetter = require('./fundGetter');

var fundGetter = new FundGetter();


fundGetter.getAllIndexFunds()
  .then(funds => {
    fs.writeFile('allIndexFunds.json', decodeUnicode(funds), (error) => {
      if (error) console.warn("write file failed!");
      else console.log('write file success!')
    });
  });


fundGetter.getBroadBasedMarketIndexByName('嘉实中证500etf联接a');

// 解码  
function decodeUnicode(str) {
  str = str.replace(/\\/g, "%");
  return unescape(str);
}  