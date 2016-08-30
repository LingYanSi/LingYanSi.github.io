module.exports = function(url = ''){
    url = url || ''
    let query = {}
    try{
        url.split('&').forEach(item => {
            let [key, value] = item.split('=').map(ele => decodeURIComponent(ele).trim())
            if (key) {
                query[key] = value
            }
        })
    }catch(err){
        console.log(err);
    }

    return query
}
