
function tokenizer(str) {
    var current = 0
    var tokens = []

    //  遍历到字符串结束
    while (current < str.length) {
        var char = str[current]

        //  如果是表达式开始
        var EXPRESS_BEGIN = '('
        if (EXPRESS_BEGIN == char) {
            tokens.push({type: 'EXPRESS_BEGIN', value: char})
            current++
            continue
        }

        //  如果是表达式结束
        var EXPRESS_END = ')'
        if (EXPRESS_END == char) {
            tokens.push({type: 'EXPRESS_END', value: char})
            current++
            continue
        }

        var WHITE_SPACE = /\s+/
        if (WHITE_SPACE.test(char)) {
            // tokens.push({type: 'WHITE_SPACE', value: char})
            current++
            continue
        }

        // Operator 运算符
        var OPERATOR_ARR = ['+', '-', '*', '/']
        if (OPERATOR_ARR.indexOf(char) > -1) {
            tokens.push({type: 'OPERATOR', value: char})
            current++
            continue
        }

        // String 字符串
        // 这里只是一个简单的处理，因为字符串可能还含有[_0-9]
        var VARIABLE = /[a-zA-Z]/
        if (VARIABLE.test(char)) {
            var chars = ''
            while (VARIABLE.test(char)) {
                chars += char
                char = str[++current]
            }

            tokens.push({type: 'VARIABLE', value: chars})

            continue
        }

        var STRING = /"/
        if (STRING.test(char)) {
            var chars = ''

            char = str[++current]
            while (!STRING.test(char)) {
                chars += char
                char = str[++current]
            }

            current++

            tokens.push({type: 'STRING', value: chars})

            continue
        }


        // Number 数字，我们还需要继续向下寻找，至到其不是数字为止
        var NUMBER = /[0-9]/
        if (NUMBER.test(char)) {
            var chars = ''
            while (NUMBER.test(char)) {
                chars += char
                char = str[++current]
            }

            tokens.push({type: 'NUMBER', value: chars})

            continue
        }

        throw new Error('cannot parse this character:' + char)
    }

    return tokens
}


module.exports = tokenizer
