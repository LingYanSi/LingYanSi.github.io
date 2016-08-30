module.exports = function *(next){
    let cookie = this.req.headers.cookie || ''

    let cache = {}
    cookie.split(';').forEach(item => {
        let arr = item.split('=').map(item => {
            return decodeURIComponent(item).trim()
        })
        arr[0] && (cache[arr[0]] = arr[1])
    })

    console.log(cache);
    let res = this.res
    let setCookie = []

    this.cookies = {
        get(key){
            return cache[key]
        },
        set(key, value, option = {}){
            key = encodeURIComponent(key.trim())
            value = encodeURIComponent(value.trim())
            if(!key || !value) return

            let str = ''
            for(let key in option){
                str += `${key}=${option[key]};`
            }
            setCookie.push(`${key}=${value}; ${str} `)
            res.setHeader('Set-Cookie', setCookie)
        }
    }

    yield next
}
