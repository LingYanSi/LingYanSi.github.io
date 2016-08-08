var pug = require('pug')
var fs = require('fs')
var tpl = fs.readFileSync('./koa/jade/index.jade')
var source = require('./../router_config.js')

const loadfile = function(path){
    return source[path] || path
}
loadfile.source = source
loadfile.sourceStr = JSON.stringify(source)

fs.writeFileSync('./index.html', pug.render(tpl, { loadfile:loadfile }))
