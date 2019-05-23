var fs = require('fs');
var FundGetter = require('./fundGetter');

var fundGetter = new FundGetter();

fundGetter.getAllIndexFunds()
  .then(funds => {
    fs.writeFile('allIndexFunds.json', JSON.stringify(funds), (error) => {
      if (error) console.warn("write file failed!");
      else console.log('write file success!')
    });
  });