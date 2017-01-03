/**
 * [parser 词法分析器]
 * @method parser
 * @param  {Array} token [token数组]
 * @return {Object}       [AST Tree]
 */
function parser(tokens) {
    let current = 0
    let token = tokens[current]
    let ast = {
        children: [],
        type: 'root'
    }
    let currentNode = ast

    function next(index){
        if (index !== undefined) {
            current = index
            return tokens[index]
        }
        return tokens[++current]
    }


    ELement()
    function ELement() {
        // openTag children closeTag
        let cacheNode = currentNode
        currentNode = {
            name: '',
            children: [],
            atrributes: {}
        }

        let openTag = OpenTag()
        if (openTag) {
            if (openTag.closeSelf) {
                cacheNode.children.push(currentNode)
                // console.log('闭合标签', JSON.stringify(cacheNode), JSON.stringify(currentNode))
                currentNode = cacheNode
                return true
            }

            while (Child()) {
            }

            if (closeTag()) {
                cacheNode.children.push(currentNode)
                // console.log('闭合标签', JSON.stringify(cacheNode), JSON.stringify(currentNode))
                currentNode = cacheNode
                return true
            }

            throw new Error('cannot match a close tag')
        }

        currentNode = cacheNode
    }

    function OpenTag(){
        // OpenStart atrributes openEnd
        let index = current

        if (OpenTagStart()) {
            if (OpenTagName()) {
                // 这里有个问题，你可以向前看，前面是不是符合某种要求
                // 但如果不满足的话，指针是不能移动的，你的明白？
                while (Attribute()) {

                }

                if( openTagEnd() ) {
                    return {
                        closeSelf: false
                    }
                }

                if(closeSelfTagEnd()) {
                    // console.info('close self')
                    return {
                        closeSelf: true
                    }
                }
            }
        }

        token = next(index)

        return false
    }

    // 开始
    function OpenTagStart(){
        let index = current

        let {type, value} = token

        if (type == 'ARROW_LEFT') {
            token = next()
            // 校验
            return true
        }

        token = next(index)
        return false
    }

    // 标签名
    function OpenTagName(){
        let {type, value} = token

        if (type == 'VAR') {
            currentNode.name = value
            // console.log('节点名称', token)
            token = next()
            return true
        }

        return false
    }

    // 属性
    function Attribute(){
        let {type, value} = token

        if (AttributeName()) {
             let attrValue = AttributesEnd()
             if(typeof attrValue == 'object') {
                 currentNode.atrributes[value] = attrValue
                //  console.log('属性---------', value, JSON.stringify(currentNode), attrValue)
                 return true
             } else {
                 currentNode.atrributes[value] = undefined
                 return true
             }
        }

        return false
    }

    // 属性名
    function AttributeName(){
        let {type, value} = token
        if (type == 'VAR') {
            token = next()
            return value
        }
    }

    // 属性值
    function AttributesEnd(){
        let {type, value} = token

        if(type == 'EQUAL') {
            token = next()
            let {type, value} = token
            if (type == 'String') {
                token = next()
                return {value, type: 'String'}
            }

            if (type == 'EXPR') {
                token = next()
                return {value, type: 'Expr'}
            }

            let error = type + 'parse error, 期望一个VAR'
            throw new Error(error)
        }

        return true
    }

    // 开标签结束
    function openTagEnd(){
        let {type, value} = token

        if (type == 'ARROW_RIGHT') {
            token = next()
            return true
        }
        return false
    }

    function closeSelfTagEnd(){
        let {type, value} = token

        if (type == 'CLOSE_SELF_TAG_END') {
            token = next()
            return true
        }
        return false
    }

    function Child() {
        let index = current

        if (ELement()) {
            return true
        }
        token = next(index)

        let {value, type} = token
        if (type == 'String') {

            currentNode.children.push({
                type: 'String',
                value
            })

            token = next()

            return true
        }

        if (type == 'EXPR') {

            currentNode.children.push({
                type: 'Expr',
                value
            })

            token = next()

            return true
        }

        token = next(index)

        return false
    }

    function closeTagStart(){
        let {type, value} = token

        if (type == 'CLOSE_TAG_START') {
            token = next()
            return true
        }

        return false
    }

    function CloseTagName(){
        let {type, value} = token

        if (type == 'VAR' && value == currentNode.name) {
            token = next()
            return true
        }

        throw new Error(`cannot match close tag of ${currentNode.name}`)

        return false
    }

    function closeTag(){
        let index = current

        if (closeTagStart()) {
            let {value, type} = token
            if (CloseTagName()) {
                if(openTagEnd()) {
                    return true
                }
            }
        }

        token = next(index)
        console.log('闭合', token, tokens[index - 1])
        return false
    }

    return ast
}

module.exports = parser

/**
 * ELement : OpenE Child CloseE
 * OpenE: < TagName {Attributes} >
 * Child: ELement | String | Null
 * CloseE: </ TagName >
 *
 * Attributes: AttributesName AttributesEnd
 * AttributesEnd: = String
 *              | NULL
 *
 * TagName : VAR
 *
 */
