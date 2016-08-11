var fs = require('fs')
var path = require('path')


// 去除html标签
function removeTags(str){
    str = str.replace(/\<[^\<^\>]+\>/g,'')
    str = str.slice(0, 100)
    return str
}

module.exports = function(pathname){
    var store = {}
    store.list = fs.readdirSync(pathname).map(function(item){
        var str = fs.readFileSync(path.resolve(pathname , item), 'utf-8')
        var data = JSON.parse(str)

        data.content = removeTags(data.content)
        return data
    }).reverse()

    // fs.writeFileSync( path.resolve(pathname, '../list.json'), JSON.stringify(data), 'utf-8')
    console.log('列表读取完成');
    return {
        data: store,
        post(data){
            data = Object.assign({}, data)
            data.content = removeTags(data.content)
            store.list.unshift(data)
        },
        delete(id){
            store.list = store.list.filter(item => item.id != id)
        },
        put(data){
            data = Object.assign({}, data)

            store.list.some((item, index) => {
                if(item.id === data.id){
                    data.content = removeTags(data.content)
                    store.list[index] = data
                    return true
                }
            })
        }
    }
}
