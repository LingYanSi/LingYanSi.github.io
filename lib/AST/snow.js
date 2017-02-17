/**
 * tokenizer 词法分析器
 *
 * 逐字解析字符串，生成token数组
 * 当然，我们需要语言规范来解析，先来个简单
 *
 * Lisp => JS
 *
 * (+ 1 2) => 1 + 2
 *
 */

/**
 * Parser 接受token数组 输出AST:抽象语法树
 */
function parser(tokens) {
    var current = 0

    function walk() {
        let token = tokens[current]
        let node = {}

        console.log('token', token, current)

        // 如果是数值类型
        if (token.type === 'NUMBER') {
            node.type = 'NumberLiteral'
            node.value = token.value
            current++
            return node
        }

        // 如果是字符串类型
        if (token.type === 'STRING') {
            node.type = 'StringLiteral'
            node.value = token.value
            current++
            return node
        }

        // 如果是字符串类型
        if (token.type === 'VARIABLE') {
            node.type = 'VARIABLE'
            node.value = token.value
            current++
            return node
        }

        // 如果是表达式类型
        if (token.type === 'EXPRESS_BEGIN') {
            console.log('---EXPRESS_BEGIN--');
            // 如果是表达式，就直接去取下一个token，其value就是函数名
            token = tokens[++current]

            node.type = 'CallExpression'
            node.name = token.value
            node.params = []

            // 然后遍历至下一个【表达式】开始/结束
            token = tokens[++current]
            while (token.type !== 'EXPRESS_END') {
                node.params.push(walk())
                token = tokens[current]
            }

            current++

            return node
        }

        // 无法处理的其他类型
        throw new Error('cannot handle type :' + node.type)
    }

    // ast root
    var ast = {
        type: 'Program',
        body: []
    }

    // 遍历至tokens结束为止
    while (current < tokens.length) {
        var node = walk()
        ast.body.push(node)
    }

    return ast

}

/**
 *  traverser 处理ast的每一个节点
 */
function traverser(ast , handlers) {

    function traverserArray(array, parent) {
        array.forEach(node => {
            traverserNode(node, parent)
        })
    }

    function traverserNode(node, parent) {
        var handler = handlers[node.type]
        if (handler) {
            handler(node, parent)
        }

        switch (node.type) {
            case 'Program':
                traverserArray(node.body, node)
                break

            case 'CallExpression':
                traverserArray(node.params, node)
                break

            case 'NumberLiteral':
                break

            case 'StringLiteral':
                break

            case 'VARIABLE':
                break

            default:
              throw new TypeError(node.type);

        }
    }

    traverserNode(ast, null)
}

/**
 * transformer 把原始语言的AST => 目标语言AST
 */
function transformer(ast) {
    //
    var newAst = {
        type: 'Program',
        body: []
    }

    ast._context = newAst.body

    // 对ast做深度遍历，处理
    traverser(ast, {
        // 如果是值类型
        NumberLiteral(node, parent){
            parent._context.push({
                type: 'NumberLiteral',
                value: node.value
            })
        },
        StringLiteral(node, parent){
            parent._context.push({
                type: 'StringLiteral',
                value: node.value
            })
        },
        VARIABLE(node, parent){
            parent._context.push({
                type: 'VARIABLE',
                value: node.value
            })
        },
        // 如果是表达式类型
        CallExpression(node, parent){
            var expression = {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: node.name
                },
                arguments: []
            }

            // 把_content指向arguments，如此函数的参数就有了
            node._context = expression.arguments

            // 如果节点不是一个函数，那么此节点就是一个表达式了，反则就是父节点的一个参数了
            if (parent.type !== 'CallExpression') {
                expression = {
                    type: 'ExpressionStatement',
                    expression
                }
            }

            parent._context.push(expression)
        }
    })

    return newAst

}

// 代码生成器 AST => code
function codeGenerator(node) {
    switch(node.type) {
        // root
        case 'Program':
            return node.body.map(codeGenerator).join('\n')

        // 表达式后面加分号
        case 'ExpressionStatement':
            return codeGenerator(node.expression) + ';'

        // 数值
        case 'NumberLiteral':
            return node.value

        case 'VARIABLE':
            return node.value

        // 数值
        case 'StringLiteral':
            return `"${node.value}"`

        // 执行表达式
        case 'CallExpression':
            return codeGenerator(node.callee) + '('+ node.arguments.map(codeGenerator).join(' ,')+')'

        // 标识符
        case 'Identifier':
            return node.name
    }
}

function compiler(str) {
    let tokens = tokenizer(str)
    console.log('tokens', tokens)
    let ast = parser(tokens)
    console.log('ast', JSON.stringify(ast))

    let newAst = transformer(ast)
    console.log('newAst', JSON.stringify(newAst))

    var code = codeGenerator(newAst)
    console.log(code)
}

var str = '(aa 1 "aa" b "b(1 2 3)") (bb 1 5 (bg 12 (dd 1 2)) (cc 45))'
console.log(str, '==>', compiler(str))
