const https = require('https');

exports.getNews = (req, res) => {
    let data =[];
    const userAgent = req.get('user-agent');
    const options = {
        host: 'newsapi.org',
        path: '/v2/top-headlines?country=in&apiKey=e26561f14f0f4041ad184f49da1a6fc6',
        headers: {
            'User-Agent': userAgent
        }
    }
    https.get(options, function (response) {
        response.on('data', d => {
            data.push(d); 
        }).on('error',e => {
            console.log(e);
        });
        response.on('end',()=>{
            const newsData = JSON.parse(Buffer.concat(data).toString()); 
            console.log(newsData);
            res.send(newsData);
        }) 
    })
};