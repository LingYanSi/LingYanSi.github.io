// parser 的作用在于对字符串进行分析
// :id 表示变量
// ::dd=^\d+\b+ 表示正则匹配

function parser(url) {
    var router = {}
    //
    let orign = url
    //
    url = url.trim()
    url = url.replace(/\/+/g, '/')
    // 掐头去尾
    url = url.replace(/(^\/)|(\/$)/g, '')

    let arr = url.split('/').map(item => {
        item = item.trim()
        if(!/:.+/.test(item)) {
            return {
                type: 'string',
                value: item
            }
        } else if (/:[^:]+/.test(item)) {
            return {
                type: 'var',
                value: item.slice(1)
            }
        } else {
            let [key, reg] = item.slice(2).split('=')
            return {
                type: 'reg',
                value: key,
                reg
            }
        }
    })

    return arr
}

function compare(router, url_arr) {
    let router_arr = parser(router)

    let params = {}

    if( router_arr.length != url_arr.length) {
        return false
    }
    let matched = url_arr.some( (item, index) => {
        let {type, value, reg} = router_arr[index]

        switch (type) {
            case 'string':
                if(value !== item.value) {
                    return true
                }
                break;
            case 'var':
                if(undefined === item.value) {
                    return true
                }
                params[value] = item.value
                break;
            case 'reg':
                if(undefined === item.value) {
                    return true
                }
                params[value] = item.value
                break;
            default:

        }
    })

    return !matched && params
}

function compareArr(url, routerObject) {
    let url_arr = parser(url)

    const routerArr = Object.keys(routerObject)

    let result, path, params
    result = routerArr.some(router => {
        path = router
        params = compare(router, url_arr)
        return params
    })

    return result && {
        path ,
        orign: url,
        params,
        value: routerObject[path]
    }
}

const url = {
    '/': '首页啊',
    '/a/:b/:aaa/fuck': '你的呀额',
    '/about/detail/:id/': '哈哈',
    '/:c/:b/': '你说什么呢',
    '*': '匹配全部'
}

console.log( compareArr(`/a/尼玛/他爹呀/fuck`, url) );
console.log( compareArr(`/about/detail/1666666`, url) );
