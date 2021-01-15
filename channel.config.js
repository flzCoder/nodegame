module.exports = {
  route: '/touch/sports/',
  isHyperlink: 0,
  alias: 'sports',
  name: '娱乐',
  path: 'https://3g.163.com/wap/special/0040ad/wap_ad_sports.js',
  data: {
    channelId: '0003'
  },
  childroute: [
    {
      route: '/touch/sports/',
      name: '首页',
      path: 'https://3g.163.com/wap/special/0040ad/wap_ad_sports.js',
      isHyperlink: 0,
      alias: 'index'
    },
    {
      route: '/touch/sports/sub/television/',
      name: '电视',
      path: '',
      isHyperlink: 0,
      alias: 'television'
    }
  ]
}
