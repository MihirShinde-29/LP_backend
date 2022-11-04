const https = require('https');

exports.getNews = (req, res) => {
    let data =[];
    const userAgent = req.get('user-agent');
    const options = {
        host: 'newsapi.org',
        path: '/v2/top-headlines?country=in&apiKey=' + process.env.NEWS_API_KEY,
        headers: {
            'User-Agent': userAgent
        }
    }
    https.get(options, function (response) {
        response.on('data', d => {
            data.push(d); 
        }).on('error',e => {
            res.status(500).send({ message: e, success: false });
            console.log(e);
        });
        response.on('end',()=>{
            const newsData = JSON.parse(Buffer.concat(data).toString()); 
            console.log(newsData);
            res.send(newsData);
        }) 
    })
};