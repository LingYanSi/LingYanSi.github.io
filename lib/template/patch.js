
// 最小更新
// 更新一个元素的子元素
function patch(parent, patchArr=[]){
    console.log(parent, patchArr);
    patchArr.forEach(item => {
        let nodes = parent.childNodes
        let node
        switch(item.type) {
            // 删除子元素
            case 'delete':
                console.log([item.index], nodes[item.index]);
                parent.removeChild(nodes[item.index])
                break

            case 'move':
                node = nodes[item.arr[0]]
                parent.removeChild(node)
                insertIndex(parent, item.arr[1], node)

                // 处理props
                item.propsChange.forEach(item => {
                    changeProp(item, node)
                })

                // 处理children
                patch(node, item.children)
                break;

            case 'change':
                node = nodes[item.index]

                // 处理props
                item.propsChange.forEach(item => {
                    changeProp(item, node)
                })

                // 处理children
                patch(node, item.children)
                break;

            case 'insert':
                console.log(render);
                node = render(item.node);
                // parent.appendChild(node)
                insertIndex(parent, item.index, node)
                break;

            default:
                throw new Error('未知类型')
        }
    })
}

function insertIndex(parent, index, newChild){
    let children = parent.childNodes
    children[index] ? parent.insertBefore(newChild, children[index]) : parent.appendChild(newChild)
}

// 处理 propsChange
function changeProp(item, ele){
    if(ele.nodeType == 3) {
        console.log(item);
        ele.textContent = item.value
        return
    }
    let type = item.type
    if(type == 'delete'){
        ele.removeAttribute(item.key)
    } else {
        addProp(item.key , item.value, ele)
    }
}
