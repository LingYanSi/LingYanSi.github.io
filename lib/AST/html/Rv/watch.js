/**
 * [getWatchedVarible 获取可被监听到的变量]
 * @method getWatchedVarible
 * @param  {[type]}          str [description]
 * @return {[type]}              [description]
 */
function getWatchedVarible(str){
    let current = 0
    let token = []

    function next(){
        return str[current++]
    }
    let char = next()

    while (current <= str.length) {

        let VARIABLE = /[a-zA-Z_$]/
        if (VARIABLE.test(char)) {
            let chars = char
            char = next()
            while (/[\w_$\.]/.test(char) && current <= str.length){
                chars += char
                char = next()
            }

            if (chars.endsWith('.')) {
                throw new Error(`${chars} should not endsWith .`)
            }
            token.push({
                type: 'VARIABLE',
                value: chars
            })
            continue
        }

        let DOUBLE_QUET = /"/
        if ( DOUBLE_QUET.test(char) ) {
            let chars = ''
            char = next()
            while (!/"/.test(char) && current <= str.length){
                chars += char
                char = next()
            }
            char = next()
            token.push({
                type: 'STRING',
                value: chars
            })
            continue
        }

        let SINGLE_QUET = /'/
        if (SINGLE_QUET.test(char)) {
            let chars = ''
            char = next()
            while (!/'/.test(char) && current <= str.length){
                chars += char
                char = next()
            }
            char = next()
            token.push({
                type: 'STRING',
                value: chars
            })
            continue
        }

        let OPERATOR = /[\+\-\*\/\%\!\=?:]/
        if (OPERATOR.test(char)) {
            token.push({
                type: 'OPERATOR',
                value: char
            })
            char = next()
            continue
        }

        let AND = /&/
        if (AND.test(char)) {
            char = next()
            if (/&/.test(char)) {
                char = next()
                token.push({
                    type: 'AND',
                    value: '&&'
                })
                continue
            }
            throw new Error('the behind of & should be a &')
        }

        let OR = /\|/
        if (OR.test(char)) {
            char = next()
            if (/\|/.test(char)) {
                char = next()
                token.push({
                    type: 'OR',
                    value: '||'
                })
                continue
            }
            throw new Error('the behind of | should be a |')
        }

        let SPACE = /\s/
        if (SPACE.test(char)) {
            char = next()
            continue
        }

        let DOT = /\./
        if (DOT.test(char)) {
            token.push({
                type: 'DOT',
                value: char
            })
            char = next()
            continue
        }


        let NUMBER = /\d/
        if (NUMBER.test(char)) {
            let chars = char
            char = next()
            while (/[\d\.]/.test(char)){
                chars += char
                char = next()
            }
            token.push({
                type: 'NUMBER',
                value: chars
            })
            continue
        }

        let EXPR_START = /\(/ ;
        if (EXPR_START.test(char)) {
            let chars = '('
            char = next()
            while (!/\)/.test(char) && current <= str.length){
                chars += char
                char = next()
            }
            char = next()
            token.push({
                type: 'EXPR',
                value: chars + ')'
            })
            continue
        }

        throw new Error(`cannot handle ${str} char ${char} at ${current}`)

    }

    return token.filter(i => i.type == 'VARIABLE').map(i => i.value)
}

export default getWatchedVarible
