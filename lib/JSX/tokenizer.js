/**
 * 获取token
 * JSX关键字
 * {} JSOpen JSClose
 * <> HTMLOpenTagStart HTMLOpenTagEnd
 * = 属性赋值
 * “” 字符串
 * xx 属性名
 */

`
<div title={{ss: 11}}>
    {
        // 只接受expression，而不接受statment
        aa && 11
        bb || cc
        aa.map(function(){
            return xx
        })
      }
</div>
`
function tokenizer(str) {
    var current = 0
    function nextchar() {
        return str[current++]
    }
    var tokens = []

    while (current < str.length) {
        var char = nextchar()

        if (char == '<') {
            tokens.push({
                type: 'HTMLOpenTagStart',
                value: '<'
            })
            word = nextchar()
            continue
        }

        if (char == '>') {
            tokens.push({
                type: 'HTMLOpenTagEnd',
                value: '<'
            })
            word = nextchar()
            continue
        }

        var SPACE = /\s/
        if (SPACE.test(char)) {
            // tokens.push({
            //     type: 'Equal',
            //     value: char
            // })
            word = nextchar()
            continue
        }

        if (char == '"') {
            var chars = ''
            char = nextchar()
            while (char != '"') {
                chars += char
                char = nextchar()
            }

            char = nextchar()

            tokens.push({
                type: 'String',
                value: chars
            })

            continue
        }

        var STRING = /[a-zA-Z]/
        if (STRING.test(char)) {
            var chars = char
            while (!/^[a-zA-Z](-?[\w]+)*$/.test(chars)) {
                char = nextchar()
                chars += char
            }
        }


        if (char == '=') {
            tokens.push({
                type: 'Equal',
                value: char
            })
            word = nextchar()
            continue
        }

        if (char == '/') {
            tokens.push({
                type: 'Slash',
                value: char
            })
            word = nextchar()
            continue
        }

        if (char == '{') {
            tokens.push({
                type: 'JSExprOpen',
                value: char
            })
            char = nextchar()
            continue
        }

        if (char == '}') {
            tokens.push({
                type: 'JSExprClose',
                value: char
            })
            char = nextchar()
            continue
        }

    }

}
