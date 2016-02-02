
var app = require('koa')()
var router = require('./router/index.js')
var serve = require('koa-static');
var multer = require('koa-multer')

var upload = multer({ dest: 'uploads/' });

// 静态文件夹
app.use( serve('./static') )
// 
// app.use( router.post('/profile', upload.single('avatar')) );
// 请求路由
app.use( router.routes() ).use( router.allowedMethods() )

// app启动
app.listen(3000)
console.log('web应用已启动')
