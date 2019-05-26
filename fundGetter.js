var request = require('request');

// 宽基指数介绍
//
// 上证50：
//   上海证券市场规模最大、流动性好的最具代表性的50只股票组成的样本。
//
// 上证180：
//   选择最具市场代表性的上海证券交易所上市的180种样本股票。
//
// 上证380：
//   剔除上证180指数样本股外，还剔除了未分配利润为负的公司，
//   以及五年未派发现金红利或送股的公司，然后按照营业收入增长率、
//   净资产收益率、成交金额和总市值的综合排名，根据行业配比原则
//   确定各二级行业内上市公司家数，选择排名前380的公司作为上证
//   380指数样本股。
//
// 沪深300：
//   A股中规模大、流动性好的最具代表性的300只股票组成，综合反映A股
//   市场上股票价格的整体表现，是反映沪深两个市场整体走势的晴雨表
// 
// 中证100：
//   从沪深300指数样本中挑选出规模最大的100只股票组成样本股
//
// 中证200：
//   沪深300中非中证100的200家成份股
// 
// 中证500：
//   全部A股中剔除沪深300指数，及总市值排名前300名的股票后，
//   总市值排名靠前的500只股票组成
// 
// 中证700：
//   中证200和中证500一起构成
//
// 中证800：
//   中证500和沪深300一起构成，反映沪深证券市场内大中小市值
//   公司的整体状况
//
// 中证1000：
//   选择中证800指数样本股之外规模偏小且流动性好的1000只股票组成。
//
// 创业板50：
//   从创业板指数100只样本股中，选出考察期内流动性指标最优的50只股票。
//
// 深证100：
//   深圳A股市场规模最大、流动性好、最具有代表性的100只股票
//
// 深证300：
//   深圳A股市场规模最大、流动性好、最具有代表性的300只股票
//
// 中小300：
//   300家具有代表性的中小板公司组成
// 
// 巨潮100：
//   中国最具有影响力的100家主板上市公司的股票组合
//
// 中创100：
//   在中小板和创业板中选取规模和流动性综合排名前100家公司组成样本
//
// 中创400：
//   由中创500剔除中创100后剩下的400只股票
//
// 中创500：
//   在中小板和创业板中选取规模和流动性综合排名前500家公司组成样本
// 
var broadBasedMarketIndex = [
  "上证50",
  "上证180",
  "上证380",
  "沪深300",
  "中证100",
  "中证200",
  "中证500",
  "中证700",
  "中证800",
  "中证1000",
  "创业板50",
  "深证100",
  "深证300",
  "中小300",
  "巨潮100",
  "中创100",
  "中创400",
  "中创500"
];

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

  // 爬取对应指数的市盈率
  // TODO: 浏览器访问能够得到结果，而通过request无法得到想要的结果
  this.getBroadBasedMarketIndexByName = function(indexName) {
    return new Promise((resolve, reject) => {
      var url = 'http://www.iwencai.com/stockpick/search?typed=0&preParams=&ts=1&f=1&qs=result_original&selfsectsn=&querytype=stock&searchfilter=&tid=stockpick&w=' + indexName + '市盈率';
      url = encodeURI(url);
      request(url, 
        (err, httpResponse, body) => {
          if (err) reject(err);
          else {
            resolve(body);
          }
        })
    });
  }
}

module.exports = FundGetter;