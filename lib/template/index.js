// <%%>


function Parser(template, data){
    // 匹配open tag
    var OPEN_TAG = Parser.OPEN_TAG
    var CLOSE_TAG = Parser.CLOSE_TAG
    var CODE = Parser.CODE

    var arr = []
    while ( template.indexOf(OPEN_TAG) >= 0) {
        var start = template.indexOf(OPEN_TAG)
        var str = template.slice(0, start)
        str = str.replace(/\s+/g, ' ').trim()
        str = '\'' + str + '\''
        arr.push({
            type: 'string',
            expr: str
        })

        template = template.slice( start + OPEN_TAG.length )

        var end = template.indexOf(CLOSE_TAG)

        var express = template.slice(0, end)
        express = express.replace(/\s+/g, ' ').replace(/\$/g, 'data.').trim()

        if(/(if|for|while|do|switch|else|\})/.test(express)) {
            arr.push({
                type: 'logic',
                expr: CODE + express
            })
        } else {
            // 对表达式进行处理
            arr.push({
                type: 'js',
                expr: express
            })
        }

        template = template.slice( end + CLOSE_TAG.length )
    }

    // 使用new Function方法来处理数据
    var a = new Function('data', Parser.getFunctionString(arr) )

    return a(data)
}

Parser.OPEN_TAG = '<%'
Parser.CLOSE_TAG = '%>'
Parser.NO_TRANS = '='
Parser.CODE = '-'

Parser.config = function(option){
    // Parser
    ['OPEN_TAG', 'CLOSE_TAG', 'NO_TRANS', 'CODE'].forEach(function (key) {
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

    //
    return 'var __result__=[]; ' + str + 'return __result__.join("")'
}
