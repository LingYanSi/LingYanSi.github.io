var str = `
        <div onClick={this.click} props={我是props} id="shm" className="heihei">
             我是文>本>元>素<sdfsdfasdf< sadfasdf
             <img src="" alt="" />
             <input type="text" />
             wodayeshihsui<!-- ent 1.0 -->你大爷是谁
             <span></span>
             <!-- ent 1.1 -->
             <div onClick={this.click} className="bitch">
                 <!-- ent 1.1.0 -->
                 呵呵呵呵>sdfsdf< sdfsdsdf
                 <!-- ent 1.1.1 -->我是你爹啊
                 <p>
                     <!-- ent 1.1.1.0 -->
                     什么鬼啊
                 </p>
             </div>
        </div>
    `
//  第一步，获取内部元素
// 构建一个对象树
/*
    tree = {
        children:,//表示其内部元素
        nodeName:,
        text:,
        events:,// 事件，click/hover等
        className:'',
        id:'',
        props:,
        entid:,// entid也就是说用户不能自定义
        // 其他属性type/src等等，这些属性会直接插入到生成的html树种，并且在diff的时候，不会diff这些
     }
     闭合标签 div/span/p/pre/h1/h2/h3/h4/h5/h6/i/b/form/table/tbody/thead/tr/td
            <!-- -->
     半闭合 img/input
 */
 // <[a-z]+
function getItem(str,PRE,INDEX){
    str = str.trim()
    // 匹配第一个<>内的数据
    var f = str.match(/<([^><]+)>/)[1]
    // 获取tagname
    var tagname = f.match(/[a-z]+/)[0]
    // 去除tagname
    f = f.replace(tagname,'').trim()
    // 获取属性
    var properties = f.split(' ')
    var events = {}, props

    /*if( isSpecialTag(tagname) ){
        properties[properties.length-1].trim() == '/' && (properties[properties.length-1]='')
    }*/

    var propertiesArr =  properties.map((item)=>{
        item = item.trim()
        // 对于image/input来说，他们是半闭合标签
        if(!item || item=="/") return

        var key = item.indexOf('=')>0 ? item.split('=')[0].trim() : item
        var value = key===item ? undefined : item.split('=')[1].trim()

        // 去除双引号 与 花括号
        value = value.startsWith('"')||value.startsWith('{') ? value.slice(1,-1) : value

        // 事件
        if(key.startsWith('on')) events[key] = value
        // props
        if(key==='props') props = value

        return {
            key: key ,
            value: value
        }
    })
    // 过滤无用元素
    .filter(item=>item)

    // 获取entId
    var entId = addEntId(PRE, INDEX)

    // 获取子元素
    var children = []
    if( tagname != 'input' && tagname != 'img' ){
        // 标签开
        var itemF = str.indexOf('>')
        // 标签闭合
        var itemL = str.lastIndexOf('<')
        // 截取字符串
        var childrenStr = str.slice(itemF+1, itemL).replace(/\n+/g,'')
        // 分割子元素，返回数组
        // debugger
        console.log(entId,PRE, INDEX)
        splitChildren(childrenStr, children, entId)
        // console.log(sb)
    }

    // 其中以on开头的是事件，props是属性值
    return {
        tagName: tagname ,
        properties: propertiesArr ,
        entId: entId ,
        // 对于花括号内的数据要支持简单的js语法，?: ! data.key.key 这样子
        events: events ,
        props: props ,
        children: children,
        type: '元素节点',
        nodeType: 3
    }
}

function isSpecialTag(tagname){
    return tagname=='img' || tagname=='input'
}

function addEntId(PRE, INDEX){
    return PRE ? PRE+'-'+INDEX : '0'
}

function splitChildren(str, children, PRE){
    str = str.trim()
    if(!str) return

    var arr = str.split(/<[a-zA-Z!]+[^>]+>/)
    // console.log(str.match(/<[a-zA-Z!]+[^>]+>/), arr )
    // 匹配注释元素
    var comment = str.match(/<!--[^><]+-->/)
    comment = comment?comment[0]:''
    // console.log( comment, str.indexOf(comment) )
    if(str.indexOf(comment)===0){
        children.push({
            nodeType: 8,
            type: '注释节点',
            text: comment.match(/<!--(.+)-->/)[1] ,
            entId: addEntId(PRE, children.length)
        })
        str = str.replace(comment,'')
        splitChildren(str, children, PRE)
        return
    }

    // 匹配一般元素，对于img/input元素还没有做特殊处理
    // console.log('bug调试',str)
    var node = str.match(/<[a-zA-Z]{1}[^><]+>/)
    node = node ? node[0] : ' '
    // console.log( node, str.indexOf(node) )
    if(str.indexOf(node)===0){
        console.log('--+--',node,PRE)
            // console.log('PRE:')
        var lastIndex = findTagClose(str, node.match(/[a-zA-Z]+/)[0])

        node = str.slice(0, lastIndex)
        children.push(getItem(node, PRE, children.length) )
        str = str.replace(node,'')

        splitChildren(str, children, PRE)
        return
    }

    // 匹配文本节点
    var text = str.slice(0, str.indexOf('<') )  // 文本元素
    if(!text){
        text = str.match(/<[^>]+(?=<)/)
        text = text ? text[0] : ''
    }
    if(text){
        var lastChild = children[children.length-1]
        lastChild && lastChild.nodeType===1? lastChild.text += text : children.push({
            nodeType: 1,
            type: '文本节点',
            text: text,
            entId: addEntId(PRE, children.length)
        })
        str = str.replace(text,'')
        splitChildren(str, children, PRE)
        return
    }

    return

    // console.log('被修改过的str',str)
}

// 找到闭合标签的位置
function findTagClose(str,tagname){

    var cache = '',
        openNum = 0,
        closeNum = 0,
        strCache = str ;
    var close = '</'+tagname+'>'

    var open = new RegExp('<'+tagname+'[^>]+>')

    if(tagname=='input' || tagname=='img'){
        var openStr = str.match(open)[0]
        return str.indexOf(openStr)+openStr.length
    }

    while( openNum!=0 && openNum!= closeNum ) {
        var openTag = str.match(open)[0]
        if(openTag){
            cache += str.slice(0,str.indexOf(openTag)+str.length)
            str = str.slice(str.indexOf(openTag)+str.length )
            openNum++
        }

        if( str.indexOf(close)>=0 ) close++

    }

    var heihei = str.indexOf(close)+close.length+cache.length
    // console.log( strCache.slice(0, heihei ) )

    // 返回结束位置
    return heihei
}
// 获取子元素，子元素需要排序， 文本元素/注释元素/一般元素
// ['']
console.log( JSON.stringify( getItem(str)) )
