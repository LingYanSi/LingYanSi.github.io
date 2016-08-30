let fs = require('fs')
let router = require(`${global.FUCK.lib}/router`)
let html = fs.readFileSync(`${global.FUCK.base}/index.html`).toString('utf8')


// 使用react router
router.get('/', function *(next){
    console.log('什么歌', next, this.url);
    this.body = html
    yield next
})
.get('/ip', function *(next) {
    this.body = this.ip
})
.get('/sex', function *(next) {
    this.body = 'fuck huangcheng'
})
.get('/r', function *(next){
    this.redirect('http://www.baidu.com')
})

module.exports = router
