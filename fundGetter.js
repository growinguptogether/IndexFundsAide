var request = require('request');

function FundGetter() {
  this.getAllIndexFunds = function() {
    return new Promise((resolve, reject) => {
      request.get(`http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=zs&rs=&gs=0&sc=zzf&st=desc
              &sd=2018-05-19&ed=2019-05-19&qdii=|&tabSubtype=,,,,,&pi=1&pn=1000&dx=1&v=0.005844696750874734`,
        (err, httpResponse, body) => {
          if (err) reject(err);
          else resolve(body);
        });
    }).then(body => {
      var rankData = eval(`${body}rankData`);
      return Promise.resolve(rankData.datas);
    });
  }
}

module.exports = FundGetter;