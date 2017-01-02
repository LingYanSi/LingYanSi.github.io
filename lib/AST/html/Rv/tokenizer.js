
function tokenizer(str) {
    let current = 0
    let char = str[current]
    let token = []
    let y = 0
    let x = 0

    function next(){
        x++
        let char = str[++current]
        if (char == '\n') {
            y++
        }

        return char
    }


    while(current < str.length) {
        // console.log(current, char)
        let ARROW_LEFT = /</
        if (ARROW_LEFT.test(char)) {
            char = next()

            while(/\s/.test(char)){
                chars += char
                char = next()
            }
            // 匹配close tag
            if (/\//.test(char)) {
                char = next()

                token.push({
                    type: 'CLOSE_TAG_START',
                    value: '</'
                })
            } else {
                token.push({
                    type: 'ARROW_LEFT',
                    value: '<'
                })
            }

            continue
        }

        let ARROW_RIGHT = />/
        if (ARROW_RIGHT.test(char)) {
            token.push({
                type: 'ARROW_RIGHT',
                value: char
            })
            char = next()
            continue
        }

        let SPACE = /\s/
        if (SPACE.test(char)) {
            // token.push({
            //     type: 'ARROW_RIGHT',
            //     value: char
            // })
            char = next()
            continue
        }

        let SLASH = /\//
        if (SLASH.test(char)) {
            char = next()

            while(/\s/.test(char)){
                chars += char
                char = next()
            }
            // 匹配close tag
            if (/>/.test(char)) {
                char = next()

                token.push({
                    type: 'CLOSE_SELF_TAG_END',
                    value: '/>'
                })
            } else {
                token.push({
                    type: 'SLASH',
                    value: '/'
                })
            }
            continue
        }

        let QUOTE = /"/
        if (QUOTE.test(char)) {
            char = next()
            let chars = ''
            while(!QUOTE.test(char)){
                chars += char
                char = next()
            }
            char = next()
            token.push({
                type: 'String',
                value: chars
            })
            continue
        }

        let VAR = /[a-zA-Z]/
        if (VAR.test(char)) {
            let chars = char
            char = next()
            while (/[a-zA-Z0-9\-]/.test(char)) {
                chars += char
                char = next()
            }
            token.push({
                type: 'VAR',
                value: chars
            })
            continue
        }

        let EQUAL = /=/
        if (EQUAL.test(char)) {
            token.push({
                type: 'EQUAL',
                value: char
            })
            char = next()
            continue
        }

        let EXPR_START = /\{/
        if (EXPR_START.test(char)) {
            let chars = ""
            char = next()
            while(!/\}/.test(char)) {
                chars += char
                char = next()
            }
            token.push({
                type: 'EXPR',
                value: chars
            })
            char = next()
            continue
        }

        throw new Error(`cannot handle char ${char}`)

    }
    return token
}

module.exports = tokenizer
