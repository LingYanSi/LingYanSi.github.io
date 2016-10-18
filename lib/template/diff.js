/*var oldTree = [
    {
        tagName: 'div',
        props: {
            class: '11',
            id: '22',
            onClick: 'click'
        },
        children: [
            {tagName: 'div'},
            {tagName: 'p'}
        ]
    }, {
        tagName: 'a'
    }, {
        tagName: 'p'
    }
]

var newTree = [
    {
        tagName: 'div',
        props: {
            class: '11 22',
            id: '22',
            onChange: 'change'
        }
    }, {
        tagName: 'h1'
    }, {
        tagName: 'p'
    }
]

diff(oldTree, newTree)*/

// 是不是在比对前，先对两个tree的字符串形势，做一个diff，在对细节进行比较比较划算点？
// 接下来就是对细节进行比较了

// 数组的比对是不是比较麻烦
// 比对顺序 key -> tagName -> props -> children
// 如果元素是新增的，就没有必要去比对子元素了
// 如果元素是 edit/move的需要比对子元素

function diff(oldTree = [], newTree = []) {

    var diffArr = []
    var arr = []

    // 移除不用的元素
    var arr = oldTree.filter((item, index) => {
        let keep = false
        newTree.some(ele => {
            keep = compare(item, ele).keep
            return keep
        })

        !keep && diffArr.push({type: 'delete', index})

        return keep
    })

    // 需要把数组反转一下，因此删除的从后向前删除，逻辑更清晰
    diffArr.reverse()

    // 调整顺序，move，新增，修改props、children
    newTree.forEach((item, id) => {
        //
        let index = -1
        let propsChange
        arr.some((ele, num) => {
            let result = compare(ele, item)
            const keep = result.keep
            propsChange = result.propsChange || []

            keep && (index = num)
            return keep
        })
        if (index >= 0) {
            // 移动元素
            if (index != id) {
                diffArr.push({
                    type: 'move',
                    moveArr: [index, id],
                    propsChange,
                    children: diff(arr[index].children, item.children)
                })
                let oldItem = arr.splice(index, 1)[0]
                arr.splice(id, 0, item)
            } else {
                // 更改元素
                diffArr.push({
                    type: 'change',
                    index,
                    propsChange,
                    children: diff(arr[index].children, item.children)
                })
            }
            // 元素可复用的需要diff children

        } else {
            // 插入一个新元素
            diffArr.push({type: 'insert', node: item, index: id})

            arr.splice(id, 0, item)
        }
    })

    console.log(diffArr);

    return diffArr
}

function compare(oldEle, newEle) {
    let keep = oldEle.tagName == newEle.tagName
    let propsChange = keep ? propsCompare(oldEle.props, newEle.props) : null

    return {
        keep,
        propsChange
    }
}

function propsCompare(oldProps={}, newProps={}){
    let changeArr = []

    // 删除无效prop
    for(let key in oldProps) {
        if(newProps[key] === undefined){
            changeArr.push({
                type: 'delete',
                key
            })
        }
    }

    // 改变prop
    for(let key in newProps) {
        if(newProps[key] !== oldProps[key]){
            changeArr.push({
                type: 'change',
                key,
                value: newProps[key]
            })
        }
    }
    return changeArr
}
