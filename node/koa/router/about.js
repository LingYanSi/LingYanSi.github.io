let router = require(`${global.FUCK.lib}/router`)
// 使用react router

router.get('/about', function *(next){
    this.body = 'about' 
})

router.get('/about/time', function *(next){
    this.body = 'time'
})

router.get('/about/time/1987', function *(next){
    this.body = '/about/time/1987'
})

module.exports = router
