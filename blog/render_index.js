var pug = require('pug')
var fs = require('fs')
var tpl = fs.readFileSync('./koa/jade/index.jade')

fs.writeFileSync('./index.html', pug.render(tpl))
