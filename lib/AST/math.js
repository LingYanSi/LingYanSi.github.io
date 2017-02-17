/**
 * [文章](https://zhuanlan.zhihu.com/p/24035780?refer=starkwang)
 * 此模块用来将四则运算 C语言 -> lisp语言
 * 1 + (2 + 4) * 3 -> (+ 1 (* (+ 2 + 4) 3))
 */


var tokenizer = require('./lib/tokenizer')

/**
 * [parser 递归下降解析]
 * 四则运算的本质是 + - * / () 其中括号的优先级最高，括号内部可以再包括 + - * / ，其次* /的优先级要高于+ -
 * 因此可以理解为 expression operator number
 *
 * 文法
 *
 * Expr   ->   Expr + Term
 *        |    Expr - Term
 *        |    Term
 * Term   ->   Term * Factor
 *        |    Term / Factor
 *        |    Factor
 * Factor ->   (Expr)
 *        |    Number
 *
 *  以上文法有个问题，Expr可能也是Expr的一部分，这样的话，判断会进入死循环，【左递归】
 *  因此，需要改变文法
 *  文法层级越靠下，优先级越高
 *  本文涉及的方法，具有向前看的特点
 *
 * Expr     ->   Term   ExprTail
 * ExprTail ->   + Term ExprTail
 *               - Term ExprTail
 *               NULL
 * Term     ->   Factor TermTail
 * TermTail ->   * Factor TermTail
 *               / Factor TermTail
 *               NULL
 * Factor   -> (Expr)
 *             Number
 *
 * 生成AST的时候，要注意
 *  Expr [Term ExprTail ExprTail ...]
 *  Term [Factor TermTail TermTail ...]
 *  Factor [Number | (Expr)]
 *  这么做的目的是方便生成目标代码
 */


function parser(tokens) {
    var current = 0

    function nextword() {
        return tokens[current++]
    }

    var word = nextword()
    var ast = {
        type: 'root',
        children: []
    }
    var currentNode = ast

    if (Expr()) {
        console.log(JSON.stringify(ast))
        return ast
    } else {
        return false
    }

    // 判断表达式
    function Expr() {
        var node = {
            type: 'Expr',
            children: []
        }
        currentNode.children.push(node)
        currentNode = node

        if (Term()) {
            currentNode = node
            return ExprTail()
        } else {
            return false
        }
    }

    function ExprTail() {

        if (word == '+' || word == '-') {

            console.log(word)
            var node = {
                type: 'ExprTail',
                operator: word,
                children: []
            }
            currentNode.children.push(node)
            var cache = currentNode
            currentNode = node


            word = nextword()
            if (Term()) {
                currentNode = cache
                return ExprTail()
            } else {
                return false
            }
        }

        return true

        // throw new Error('ExprTail cannot handle word:' + word)
    }

    function Term() {
        var node = {
            type: 'Term',
            children: []
        }
        currentNode.children.push(node)
        currentNode = node

        if (Factor()) {
            currentNode = node
            return TermTail()
        } else {
            return false
        }
    }

    function TermTail() {

        if (word == '*' || word == '/') {
            console.log(word)
            var node = {
                type: 'TermTail',
                operator: word,
                children: []
            }
            var cache = currentNode
            currentNode.children.push(node)
            currentNode = node

            word = nextword()
            if (Factor()) {
                currentNode = cache
                return TermTail()
            } else {
                return false
            }
        }

        console.log('结束的地方', word)
        return true

        // throw new Error('TermTail cannot handle word:' + word)
    }

    function Factor() {
        var node = {
            type: 'Factor',
            children: []
        }
        currentNode.children.push(node)
        currentNode = node

        if (/[0-9]+/.test(word)) {
            currentNode.children.push({
                type: 'Number',
                value: word
            })
            word = nextword()
            return true
        }

        if (word == '(') {
            word = nextword()

            console.log('fuck dog')

            if (Expr()) {
                if (word == ')') {
                    word = nextword()
                    console.log('fuck dog end')
                    return true
                }
                return true
            }

            return false
        }

        return false
    }
}

let str = '2/(9+0)+(1*2)-2/1'.split('')
console.log(str)
console.log(transformer(parser(str)))

function transformer(ast) {

    ast.children.map(child => {
        let result = transformExpr(child)
        console.log(result);
    })

    function transformExpr(node) {
        // term exprTail operator term exprTail

        var index = 0
        var $0 = transformTerm(node.children[index++])
        var str = $0
        while (node.children[index]) {
            var child = node.children[index++]
            var operator = child.operator
            var $1 = transformTerm(child.children[0])

            str = `(${operator} ${$0} ${$1})`
                // console.log($0   , operator, $1, str)
            $0 = str
        }


        return str
    }

    function transformTerm(node) {
        // factor termTail = operator factor

        var index = 0
        var $0 = transformFactor(node.children[index++])
        var str = $0

        while (node.children[index]) {
            var child = node.children[index++]
            var operator = child.operator
            var $1 = transformFactor(child.children[0])


            str = `(${operator} ${$0} ${$1})`
                // console.log($0   , operator, $1, str)
            $0 = str
        }

        return str
    }

    function transformFactor(node) {
        // number
        if (node.children[0].type == 'Expr') {
            return transformExpr(node.children[0])
        } else {
            return node.children[0].value
        }
    }
}

var vistor = {

}
