## 一个简单的node服务
### 目标抓取【达盖尔的旗帜】最新图片，启动本地服务

#### 1. 抓取数据
```
var http = require('http');
var option = {
    hostname: 'cl.wocl.me',
    path: '/thread0806.php?fid=16',
    method: 'GET',
    Connection: 'keep-alive',
    headers: {
        'Content-Type': 'text/html' ,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36'
    }
}
var request = http.request(option,(respond)=>{
    var arr = []
    respond.on('data', function(chunck){
        arr.push(chunck)
    });
    respond.on('end', function(){
        arr = Buffer.concat( arr);
    })
});

request.on('error', function( error){
    console.log( error.msg)
});


var server = http.Server(function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/plain',
                          'Trailer': 'Content-MD5' });
    res.write(fileData);
    res.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});
    res.end();
});
server.listen(9002);
server.timeout(3000);

```
