let request = require('request')

Array.from({length: 100}).forEach(() => {
    let paths = ['/main', '/recommend', '/exclusive', '/touch/news', '/touch/news/sub/domestic', '/touch/news/sub/international'];
    // let paths = ['/touch/news'];
    let path = paths[Math.floor(Math.random() * paths.length)];
    setTimeout(() => {
        // let url = `http://dev.3g.163.com:8181${path}?t=${Date.now()}`
        let url = `http://10.179.1.223:8181${path}?t=${Date.now()}`
        console.log('-----------------------------', url);
        request.get(url);
    }, 10000 * Math.random());
})

// 5min内每秒20QPS压测
// 获取当前时间和5分钟内时间，在这个时间段内，每秒发20次请求，
// 每秒setInterval
// 发20次,foreach 或 循环20次，每个循环request.get一次。
