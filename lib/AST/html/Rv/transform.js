
import getWatchedVarible from './watch'

/**
 * [transform description]
 * @method transform
 * @param  {[type]}  ast [description]
 * @return {[type]}      [description]
 */
function transform(ast, state, listeners, $parent, components, props) {

    // 处理子元素
    function handleChildren(array, $ele, node, ctx){
        let VFOR = node.atrributes && node.atrributes['v-for']

        if (VFOR) {
            return handleVFor(VFOR, $ele, array[0], ctx)
        }

        let eles = array.map(i => {
            return handleElement(i, [...ctx], $ele)
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
                let props = Object.assign({}, getAttributes(atrributes), {
                    children,
                    ctx
                })
                let child = window.Rv.DOMRender(components[name], $parent, props)
                // 子组件放在父组件的children中，方便卸载
                // 组件卸载：事件 + dom
                children.push(child)
                return
            }
            // 处理slot
            if (name == 'slot') {
                handleChildren(props.children, $parent, node, props.ctx)
                return
            }

            ele = document.createElement(name)
            handleEvents(ele)
            handleAttributes(atrributes, ele, ctx)
            handleChildren(children, ele, node, [...ctx])
        } else {
            ele = handleTextNode(node, ctx)
        }

        $parent.appendChild(ele)

        return ele
    }

    // 处理文本节点
    function handleTextNode (node, ctx){
        let {type, value} = node
        let $ele = document.createTextNode("")
        handleEvents($ele)
        if (type == 'Expr') {
            value = handleExpr(value, {
                type: 'TEXT_NODE',
                $ele: $ele,
            }, ctx)
        }
        $ele.textContent = value

        return $ele
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

                return handleElement(node, [...ctx, newCtx], $ele)
            })

            return $ele
        }

        render(state)

        listeners.push($ele, $ele.__RVID, (key, newValue, oldValue)=>{
            key = key.trim()
            let keys = key.split(',').filter(i => i)
            if(keys[0] == LIST) {
                // 卸载元素上的事件
                unmountChildren($ele)
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
        watchParams.cacheAtrribute = a

        let exprKeys = Analysis(expr)

        let {$ele, type, attributeName} = watchParams

        listeners.push($ele, $ele.__RVID, (key, newValue, oldValue)=>{
            let keys = key.split(',').filter(i => i).join('.')
            let matched = exprKeys.some(i => keys.startsWith(i))

            if (!matched) return

            let {cacheAtrribute} = watchParams
            // 更新文本节点
            if(type == 'TEXT_NODE') {
                let newCtx = ctx.slice(1)
                newCtx.unshift(state)
                let newParam = Object.assign({}, ...newCtx)
                $ele.textContent = a(newParam)
            }

            // 更新属性
            if(type == 'ATTR') {
                let newCtx = ctx.slice(1)
                newCtx.unshift(state)
                let newParam = Object.assign({}, ...newCtx)
                let newValue = a(newParam) || ''
                handleSpecialAttr(attributeName, newValue, $ele, cacheAtrribute)
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

    function getAttributes(atrributes){
        let atts = {}
        Object.keys(atrributes).map(key => {
            let v = atrributes[key]
            if (v) {
                let {type, value} = v
                value = value || ''
                if (type == 'String') {
                    atts[key] = value
                }
            }
        })

        return atts
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
                        $ele,
                        attributeName: key,
                    }, ctx)
                }

                // 处理特殊的属性
                handleSpecialAttr(key, value, $ele )

            } else {
                $ele.setAttribute(key, "")
            }
        })
    }

    // 处理特殊的属性
    function handleSpecialAttr(key, value, $ele){
        if (key.startsWith('on')) {
            // 移除掉之前的事件
            events.off(key.slice(2).toLowerCase(), $ele.__RVID )
            // 新增事件监听
            events.on(key.slice(2).toLowerCase(), $ele.__RVID, value)
        } else if (key == 'style'){
            let style = ''
            if (typeof value) {
                for (var propertyName in value) {
                    if (value.hasOwnProperty(propertyName)) {
                        // 处理驼峰形式的css
                        let newPropertyName = propertyName.replace(/[A-Z]/g, char => {
                            return '-' + char.toLowerCase()
                        })
                        style += `;${newPropertyName} : ${value[propertyName]}`
                    }
                }
            } else {
                style = value || ''
            }

            $ele.style.cssText += style
        } else {
            $ele.setAttribute(key, value)
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

    }

    // 返回element list
    // 每个组件在实例上都会维护一个事件委托
    // 但是有些事件是可以委托的，有些事件是无法委托的：scroll onpause onplay等
    function handleEvents($ele){
        // 每个元素的id应该是唯一的
        $ele.__RVID = window.Rv.__id++
        if (events) {
            return
        }
        events = new Event($ele)
    }

    // 卸载元素
    function unmountChildren($parent){
        // 卸载属性
        listeners.unmountChildrenAttrs($parent)
        // 卸载事件
        events.unmountChildrenEvents($parent)
    }

    let refs = {}
    let ctx = [state]
    let events
    let children = []

    handleChildren(ast.children, $parent, ast, ctx)
    return {refs, events, children}
}

// 事件
class Event {
    constructor($ele){
        this.cache = {}
        this.$ele = $ele
    }
    off(type, id, callback){
        let arr = this.getTypeCache(type)
        arr.filter(i => {
            if (callback) {
                return i.id != id && i.callback != callback
            } else {
                return i.id != id
            }

        })
        this.cache[type] = arr

        return this
    }
    on(type, id, callback){
        let arr = this.getTypeCache(type)
        arr.push({
            id,
            callback
        })
        this.cache[type] = arr

        this.addEventToParent(type, id, callback)

        return this
    }
    trigger(type, id){

    }
    addEventToParent(type, id, callback){
        if(this[`__${type}`]) return

        this[`__${type}`] = true

        this.$ele.addEventListener(type, (event)=>{
            // 在事件系统内冒泡上去到当前文件内
            let {target, currentTarget} = event
            let cbs = []
            while (target && target != currentTarget.parentElement) {
                let id = target.__RVID
                this.cache[type].forEach(i => {
                    if (i.id === id) {
                        cbs.push(i.callback)
                    }
                })
                target = target.parentElement
            }
            cbs.forEach(cb => cb(event))
        })
    }
    // 卸载事件
    unmountChildrenEvents($parent){
        $parent.children && [...$parent.children].forEach($child => {
            $child.__RVID && this.unmount($child.__RVID)
            this.unmountChildrenEvents($child)
        })
    }
    unmountElementEvents($parent){
        this.unmount($parent.__RVID)
        this.unmountChildrenEvents($parent)
    }
    unmount(ID){
        let {cache} = this
        Object.keys(cache).forEach(i => {
            cache[i] = cache[i].filter(ele => ele.id != ID)
        })
    }
    getTypeCache(type){
        let {cache} = this
        return cache[type] || []
    }
}

export default transform
