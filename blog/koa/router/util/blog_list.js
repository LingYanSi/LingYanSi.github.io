var fs = require('fs')
var path = require('path')
 

// 去除html标签
function removeTags(str){
    str = str.replace(/\<[^\<^\>]+\>/g,'')
    str = str.slice(0, 100)
    return str
}

module.exports = function(pathname){
    var summary = fs.readdirSync(pathname).map(function(item){
        var str = fs.readFileSync(path.resolve(pathname , item), 'utf-8')
        var data = JSON.parse(str)

        data.content = removeTags(data.content)
        return data
    }).reverse()

    var data = {}
    data.list = summary

    fs.writeFileSync( path.resolve(pathname, '../list.json'), JSON.stringify(data), 'utf-8')
    console.log('列表读取完成');
    return data
}
