var koa = require('koa');  
var serve = require('koa-static') ;
var path = require('path');
var render = require('koa-ejs');

var app = koa();

app.use(serve(__dirname + '/public')); //设置静态资源路径

var filters = {
  format: function (time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
  }
};

render(app, {
  root: path.join(__dirname, 'view'), // 模板所放位置
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true,
  filters: filters
});

var router = require('./routes/index');

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000); 
