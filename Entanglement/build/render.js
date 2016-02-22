// 渲染html,所有事件都托管到指定的元素上

function render(htmlObj, data, ele){
    // 创建元素节点
    if(htmlObj.nodeType===1){
        var node = document.createElement(htmlObj.tagName)
        // node.entId = htmlObj.entId
        node.setAttribute('entId',htmlObj.entId)

        htmlObj.properties.forEach(function(item){
            node.setAttribute(item.key, item.value||'')
        })

        htmlObj.children && htmlObj.children.forEach(function(item){
            var child = render(item,data, ele)
            child && node.appendChild( child )
        })

        for(var key in htmlObj.events){
            ele.addEventListener(key, function(event){
                var target = event.target
                // 向上冒泡
                while(target!=ele){
                    if(target.getAttribute('entId') === htmlObj.entId){
                        var fun = data[htmlObj.events[key]]
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
        var node = document.createTextNode(htmlObj.text)
    }
    // 新建注释节点
    if(htmlObj.nodeType===8){
        var node = document.createComment(htmlObj.text)
    }
    return node
}

var ele = document.querySelector('#song')
ele.appendChild( render(getVDom(str), {
    'click': function(){
        console.log('我被点击了');
    },
    'pClick': function(){
        console.log('什么鬼被点击了');
    },
    'up': function(){
        console.log('点击结束');
    }
} , ele ))
