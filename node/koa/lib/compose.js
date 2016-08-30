module.exports = function(middleware){
    return function *(next){
        middleware.reverse()
        middleware.forEach(md => {
            next = md.call(this, next)
        })

        yield next
    }
}
