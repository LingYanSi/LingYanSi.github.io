function Render(HTMLTree, $ele, props, ctx){
    var docfrag = document.createDocumentFragment();
    let refs = ctx.refs = {}
    // docfrag = document.createElement('div')
    // 转成一个 document fragment
    function toDOM(HTMLTree){
        HTMLTree.forEach(item => {
            this.run(item, docfrag)
        })
    }

    toDOM.prototype = {
        run(xx, parent){
            let element
            if(xx.tag){
                // 创建元素
                xx.IS_COMPONENT = /[A-Z][a-z]+/.test(xx.tag)
                element = document.createElement(xx.tag)
            }else {
                // 文本节点
                element = document.createTextNode(xx.text || '')
            }
            // console.log(element);
            (xx.children || []).forEach(child => {
                this.run(child, element)
            })

            // 如果父节点是一个组建，就把他push到propsChildren中去
            if(xx.parent && xx.parent.IS_COMPONENT){
                xx.parent.propsChildren = xx.parent.propsChildren || []
                xx.parent.propsChildren.push(element)
            }else{
                parent.appendChild(element)
            }

            if(xx.tag){

                if(/[A-Z][a-z]+/.test(xx.tag)){
                    // 自定义组件
                    // xx.IS_COMPONENT = true
                    let props = Object.assign({}, xx.attrs, {children: xx.propsChildren || []})
                    // console.log('props::::::', props);
                    Ent.render(ctx.components[xx.tag], props, element)
                }else if(xx.tag == 'slot'){
                    props.children.forEach(propsChild => {
                        element.appendChild(propsChild)
                    })
                }else{
                    // 属性渲染
                    // class
                    Render.attrsBind(element, xx.attrs, refs)
                    // 事件绑定
                    Render.eventBind(element, xx.attrs)
                }
            }
        }
    }
    new toDOM(HTMLTree)

    $ele.innerHTML = ''
    // 添加到指定元素
    Array.from(docfrag.childNodes).forEach(node => {
        $ele.appendChild(node)
    })

}
Render.attrsBind = function(ele, attrs, refs){
    for(let key in attrs){
        let value = attrs[key]
        switch(key){
            case 'class':
                ele.className = value
                break
             case 'ref':
                 refs[value] = ele
                 break
            case 'type':
                ele.type = value
                break
            default:
                if(key.startsWith('data-')){

                }
        }
    }
}

Render.eventBind = function(ele, attrs){
    for(let key in attrs){
        if(key.startsWith('on')  ){
            let eventType = key.slice(2).toLowerCase()
             Render.eventTypesArr.includes(eventType) && ele.addEventListener(eventType,  attrs[key])
        }
    }
}

Render.eventTypesArr = ['click', 'dblclick', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'keydown', 'keyup', 'input', 'change', 'drop']
