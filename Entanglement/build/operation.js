// 对{}内字符串的解析

function Operation(str, data){
    console.log(data);
    // 匹配变量
    return str.replace(/\{[^\}]+\}/g, function(item){
        item = item.slice(1,-1)
        // 还要处理点的问题
        // a.b.c
        // eval用起来不能更爽
        with(data){
            return eval(item)
        }

    })
}
