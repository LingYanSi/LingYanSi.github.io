// url_match(`aaa/:id/:title`, `aaa/21/eeeee/111111`)

function url_match(url_1='', url_2=''){
    // 把重复的//替换成单个/
    url_1 = url_1.trim().replace(/\/{2,}/g, '/')
    url_2 = url_2.trim().replace(/\/{2,}/g, '/')

    const arr_1 = url_1.split('/')
    const arr_2 = url_2.split('/')

    // 实际参数小于声明参数，必然不匹配
    if(arr_2.length < arr_1.length) return

    // 获取参数
    let params = {}
    let matched = true
    arr_1.forEach((item, index) => {
        if(/:.+/.test(item) && arr_2[index]){
            params[item.slice(1)] = arr_2[index]
        }else{
            // / 可以匹配 /index 
            matched = item === arr_2[index] || !item
        }
    })

    return matched && params
}

// url_match(`aaa/:：/:title`, `aaa/21/eeeee/111111`)

export default url_match
