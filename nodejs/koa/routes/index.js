
var app = require('koa') ;
var Router = require('koa-router');
var route = new Router();

route.get('/',function *(next){

	yield this.render('index',{title:'谈笑风生',content:'西方哪个国家我没去过'});
});
route.get('/hei',function *(next){
	this.body= this.request.query ;
	//this.body = this.request.accept.headers ;
	//this.body = '杜鲁门' ;
});

route.get('/11/:id', function *(next){
	this.body= this.params.id ;
	//this.redirect('http://www.cnblogs.com/chenchenluo/p/4192282.html');
});

route.get('/api',function *(next){
	// 所谓反向代理，也就是当浏览器端又请求数据过来时，服务器再请求一次，并将返回过来的数据，返回给浏览器
	this.body = ({cunt:'wet'});
});

module.exports = route;

/*
	this.body类似于express的this.send 用于发送 字符串, buffer, stream, 对象, 或者null也行
*/

