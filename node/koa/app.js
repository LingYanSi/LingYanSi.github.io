let app = require('./lib/index')()
let router = require('./lib/router')()


router.get('/', function *(next){
    this.body = '主页'
})
.get('/sex', function *(next) {
    this.body = 'fuck huangcheng'
})
.get('/r', function *(){
    this.redirect('http://www.baidu.com')
})
.all('*', function *(){
    this.body = 'icon'
})

console.log(Object.prototype.toString.call(router.routers) );
app.use(router.routers )
//
// app.use(function*(next) {
//     this.user = {
//         name: 11
//     }
//     // console.log(Object.keys(this.req), this.req.headers);
//     // console.log('第一层', this.user);
//
//     if (this.req.url == '/') {
//         this.cookies.set('hah', 'jiba', {
//             // 'Max-Age': -1, // cookie有效时长，以s为单位, 没有此参数表示session, 小于0表示在网页关闭时消除
//             // Expires 和Max-Age作用相同，不过其使用的是new Date().toUTCString() 字符串
//             // path: '/', 只有在/路径下，操作cookie
//             // httpOnly: true //客户端无法通过js获取到cookie
//             // Secure 只会在https协议下传递cookie 也无法被js获取
//             // domin .google.com可实现跨domin访问cookie
//         })
//     }
//
//     // 需要注意的是，如果说ajax请求，那么js最终会请求 baidu，以至于跨域
//     if(this.req.url == '/r'){
//         console.log('重定向');
//         this.redirect('http://www.baidu.com')
//         return
//     }
//
//     this.res.setHeader('ip', this.ip)
//
//     let hello = yield next
//     // console.log('回到--》第一层:', hello);
//
//     hello += yield new Promise(res => {
//         setTimeout(() => {
//             res('哈哈哈哈');
//         }, 0)
//     })
//
//     // 重定向
//     // this.redirect(`http://xiami.com`)
//     // console.log('body::', this.body, 'cookie::', this.cookies.get('fuck_you'));
//     this.body = `我不相信`
// })

app.use(function*(next) {
    // console.log('第二层', this.user);
    let he = yield next
    // console.log('回到-->第二层', he);

    return '孙小飞'
})

app.use(function*(next) {
    // console.log('第三层');
    return '你好吗'
})

app.listen(10240, () => {
    console.log(new Date().toString(), 'listen 10240 port');
})
