
import getWatchedVarible from './watch'

/**
 * [transform description]
 * @method transform
 * @param  {[type]}  ast [description]
 * @return {[type]}      [description]
 */
function transform(ast, state, listeners, $parent, components) {

    // 处理子元素
    function handleChildren(array, $ele, node, ctx){
        let VFOR = node.atrributes && node.atrributes['v-for']

        if (VFOR) {
            return handleVFor(VFOR, $ele, array[0], ctx)
        }

        let eles = array.map(i => {
            return handleElement(i, [...ctx], $ele)
        })
        .filter(i => i)
        .forEach(i => {
            $ele.appendChild(i)
        })

        return $ele
    }

    // 处理元素
    function handleElement(node, ctx, $parent){
        // 可以访问父节点
        let ele
        let {children, atrributes, name, type} = node
        if (name) {
            // 处理子组件
            if (/^[A-Z]/.test(name)) {
                // throw new Error(`cannot handle tagName of ${name}`)
                window.Rv.DOMRender(components[name], $parent)
                return
            }
            ele = document.createElement(name)
            handleAttributes(atrributes, ele, ctx)
            handleChildren(children, ele, node, [...ctx])
        } else {
            ele = handleTextNode(node, ctx)
        }

        return ele
    }

    // 处理文本节点
    function handleTextNode (node, ctx){
        let {type, value} = node
        let ele = document.createTextNode("")
        if (type == 'Expr') {
            value = handleExpr(value, {
                type: 'TEXT_NODE',
                node: ele,
            }, ctx)
        }
        ele.textContent = value

        return ele
    }

    function handleVFor(VFOR, $ele, node, ctx){
        let {value} = VFOR
        let arr = value.split(/\s+/).filter(i => i)
        let VAR = arr[0]
        let LIST = arr[arr.length - 1]

        function render(state){
            $ele.innerHTML = ''

            let eles = state[LIST].map((i, index) => {
                let newCtx = {
                    [VAR] : i,
                    $index : index
                }

                return handleElement(node, [...ctx, newCtx])
            }).forEach(i => {
                $ele.appendChild(i)
            })

            return $ele
        }

        render(state)

        listeners.push((key, newValue, oldValue)=>{
            key = key.trim()
            let keys = key.split(',').filter(i => i)
            if(keys[0] == LIST) {
                render(state)
            }
        })

    }

    // 处理表达式
    function handleExpr(expr, watchParams, ctx){
        let param = Object.assign({}, ...ctx)
        let a = new Function('param', `
            with(param){
                return ${expr}
            }
        `)
        watchParams.cache = a

        let exprKeys = Analysis(expr)

        listeners.push((key, newValue, oldValue)=>{
            let {node, type, cache} = watchParams

            let keys = key.split(',').filter(i => i).join('.')
            let matched = exprKeys.some(i => i.startsWith(keys))

            if (!matched) return

            // 更新文本节点
            if(type == 'TEXT_NODE') {
                let newCtx = ctx.slice(1)
                newCtx.unshift(state)
                let newParam = Object.assign({}, ...newCtx)
                node.textContent = a(newParam)
            }

            // 更新属性
            if(type == 'ATTR') {
                let newCtx = ctx.slice(1)
                newCtx.unshift(state)
                let newParam = Object.assign({}, ...newCtx)
                let newValue = a(newParam) || ''
                node.setAttribute(watchParams.attributeName, newValue)
            }
        })
        // 去监听数据
        return a(param)
    }

    // expr : String
    //      | Number
    //      | Variables
    //      | ()
    // operator : + | - | * | / | && | || | ++ | -- | ! | !!!

    function Analysis(expr) {
        // return expr.replace(/"[^"]*"/g, "").replace(/[\-+]/g, '').split('.')
        return getWatchedVarible(expr)
    }

    // 处理属性
    function handleAttributes(atrributes, $ele, ctx){
        Object.keys(atrributes).map(key => {
            let v = atrributes[key]
            if (v) {
                let {type, value} = v
                value = value || ''
                if (type == 'String') {
                    $ele.setAttribute(key, value)
                }

                if (type == 'Expr') {
                    // 处理事件监听
                    value = handleExpr(value, {
                        type: 'ATTR',
                        node: $ele,
                        attributeName: key,
                    }, ctx)

                    if (key.startsWith('on')) {
                        $ele.addEventListener(key.slice(2).toLowerCase(), value)
                        console.log('绑定事件', key, currentNode)
                    } else {
                        $ele.setAttribute(key, value)
                    }
                }

                // 处理v-if指令
                if (key == 'v-if'  && !value) {
                    $ele.style.display = 'none'
                }

                if (key == 'v-for') {
                    let VAR = value.split(/\s/).filter(i => i)[0]
                }

                if (key == 'ref') {
                    refs[value] = $ele
                }
            } else {
                $ele.setAttribute(key, "")
            }
        })
    }

    let refs = {}
    let ctx = [state]
    let events

    let currentNode = $parent
    handleChildren(ast.children, currentNode, ast, ctx)
    return {node: currentNode, refs, events}
}

// 返回element list
function handleEvents(currentNode){

}

export default transform
