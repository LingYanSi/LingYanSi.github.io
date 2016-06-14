var pug = require('pug')
var fs = require('fs')
var tpl = fs.readFileSync('./koa/jade/index.jade')
var router = require('./router_config.js')

fs.writeFileSync('./index.html', pug.render(tpl, {MIN: 'min.', router:router }))
