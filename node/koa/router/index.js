let router = require(`${global.FUCK.lib}/router`)
let body = require(`${global.FUCK.lib}/body`)
// 可以引入子路由
require('./1')
require('./about')

// 使用react router
router.post('/r', body, function *(next){
    // this.redirect('http://www.baidu.com')
})

router.get('*', function *(next){
    this.body = 'icon'
})

module.exports = router
