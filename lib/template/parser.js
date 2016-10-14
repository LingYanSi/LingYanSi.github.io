// <%%>
function Parser(template, state, props){
    // 匹配open tag
    var OPEN_TAG = Parser.OPEN_TAG
    var CLOSE_TAG = Parser.CLOSE_TAG
    var CODE = Parser.CODE

    var arr = []
    while ( template) {
        var start = template.indexOf(OPEN_TAG)
        start = start< 0 ? template.length : start

        var str = template.slice(0, start)
        str = str.replace(/\s+/g, ' ').trim()

        template = template.slice( start + OPEN_TAG.length )
        // 字符串为空，就没有添加的必要了
        if(str){
            str = '\'' + str + '\''
            arr.push({
                type: 'string',
                expr: str
            })
        }

        var end = template.indexOf(CLOSE_TAG)
        end = end< 0 ? template.length : end

        var express = template.slice(0, end)
        express = express.replace(/\s+/g, ' ').trim()

        // 对express中的VAR进行替换
        Parser.VAR.forEach(function(item, index){
            express = express.replace(item, 'data.data_'+index+'.')
        })

        template = template.slice( end + CLOSE_TAG.length )
        if (express) {
            if (/(if|for|while|do|switch|else|\}|case|break)/.test(express)) {
                express && arr.push({
                    type: 'logic',
                    expr: CODE + express
                })
            } else {
                // 对表达式进行处理
                express && arr.push({
                    type: 'js',
                    expr: express
                })
            }
        }
    }

    // 使用new Function方法来处理数据
    var a = new Function('data', Parser.getFunctionString(arr) )

    // 对参数进行处理，因为new Function无法做动态参数的处理，因此这里会所有的数据，放置到data下面
    var data = {}
    ;[].slice.call(arguments).slice(1).forEach(function(item, index){
        data['data_'+ index] = item
    })

    return a(data)
}

Parser.OPEN_TAG = '<%'
Parser.CLOSE_TAG = '%>'
Parser.NO_TRANS = '='
Parser.CODE = '-'
// 变量表示服，我们可以使用多变量标识符
// Parser.VAR = ['$', '@']
// Parser(template, state, props , ...)
Parser.VAR = [/\$/g, /@/g]

Parser.config = function(option){
    // Parser
    ['OPEN_TAG', 'CLOSE_TAG', 'NO_TRANS', 'CODE', 'VAR'].forEach(function (key) {
        option[key] && (Parser[key] = option[key])
    })
}

Parser.getFunctionString = function(arr){
    // 对切割后的字符串进行处理
    var str = arr.map(function(item){
        //
        var type = item.type
        var expr = item.expr

        // 模板中的html标签或者字符串
        if (type == 'string'){
            return `__result__.push(${expr})`
        }

        // 运算相关
        if (type == 'js' || type == 'logic') {
            // 代码
            if(new RegExp('^\\' + Parser.CODE ).test(expr)){
                return expr.slice(1)

            } else if(new RegExp('^\\' + Parser.NO_TRANS ).test(expr)) {
                // 直接输出
                return `__result__.push("${expr.slice(1).trim()}")`
            } else {
                // 需要从变量中获取值
                return `__result__.push(${expr})`
            }
        }
    }).join('\n')

    // 返回Function字符串
    return 'var __result__=[]; \n' + str + '\n return __result__.join("")'
}
