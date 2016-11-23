
var fs = require('fs')

function getRouter(compilation, entry){
    let assets = Object.keys(compilation.assets)
    let arr = Object.keys(entry)

    const routerMatchStart = 'cache['
    const routerMatchEnd = ']'

    let newEntry = {}
    arr.forEach(item => {
        let pathname = entry[item]
        let str = fs.readFileSync(pathname).toString()
        let routers = str.match(/cache\[([^\]]+)\]/g) || []
        routers = routers.map(router => {
            console.log(router);
            return router.slice(routerMatchStart.length + 1, -(routerMatchEnd.length + 1))
        })
        newEntry[item] = routers
    })

    let routers = {}
    arr.forEach(item => {
        assets.some(filepath => {
            if(filepath.startsWith(`${item}.`)){
                newEntry[item].forEach(router => {
                    routers[router] = filepath
                })
                return true
            }
        })
    })
    fs.writeFileSync('./router.json', JSON.stringify(routers, null, 4))
}

module.exports = getRouter
