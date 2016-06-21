
// 渲染html,所有事件都托管到指定的元素上

function render(htmlObj, that){
    // 创建元素节点
    if(htmlObj.nodeType===1){
        var node = document.createElement(htmlObj.tagName)
        // node.entId = htmlObj.entId
        node.setAttribute('entId',htmlObj.entId)

        // 添加对refs的支持
        if(htmlObj.ref){
            that.refs = that.refs || {}
            that.refs[htmlObj.ref] = node
        }

        htmlObj.properties.forEach(function(item){
            node.setAttribute(item.key, item.value||'')
        })

        htmlObj.children && htmlObj.children.forEach(function(item){
            var child = render(item,that, node)
            child && node.appendChild( child )
        })

        for(var key in htmlObj.events){
            // 时间代理
            node.addEventListener(key, function(event){
                var target = event.target
                // 事件冒泡
                while(target && target!=node.parentElement){
                    if( target.getAttribute('entId') === htmlObj.entId){
                        var fun = eval('that.'+htmlObj.events[key]+'.bind(that)')
                        fun && fun(event)
                        break
                    }else{
                        target = target.parentElement
                    }
                }
            } )
        }
    }
    // 新建文本节点
    if(htmlObj.nodeType===3){
        var node = document.createTextNode( Operation(htmlObj.text, that.data) )
    }
    // 新建注释节点
    if(htmlObj.nodeType===8){
        var node = document.createComment(htmlObj.text)
    }
    return node
}
