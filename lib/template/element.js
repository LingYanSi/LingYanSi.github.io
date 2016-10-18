

function render(item){
    // 文本字节
    if(typeof item == 'string'){
        return document.createTextNode(item)
    }

    if(item.tagName == '__text__'){
        return document.createTextNode(item.value)
    }

    // 一般元素
    var element = document.createElement(item.tagName)

    let props = item.props
    for (let key in props) {
        addProp(key, props[key], element, item)
    }

    ;(item.children || []).forEach(child => {
        let node = render(child, parent)
        element.appendChild(node)
    })

    return element
}

function addProp(key, value, ele, item){
    if(key == 'class'){
        ele.className = value
        return
    }
    ele[key] = value
}
