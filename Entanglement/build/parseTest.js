var str = `
        <div onClick={} props={你大爷} id="shm" className="heihei">
             我是文本元素
             <!-- ent 1.0 -->
             <span></span>
             <!-- ent 1.1 -->
             <div>
                 <!-- ent 1.1.0 -->
                 呵呵呵呵
                 <!-- ent 1.1.1 -->
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
function getItem(str){
    str = str.trim()
    // 匹配第一个<>内的数据
    var f = str.match(/<([^>]+)>/)[1]
    // 获取tagname
    var tagname = f.match(/[a-z]+/)[0]
    // 去除tagname
    f = f.replace(tagname,'').trim()
    // 获取属性
    var propertyArr = f.split(' ')
    var events = {}, props
    var hei = propertyArr.map((item)=>{
        item = item.trim()

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

    // 获取子元素字符串
    if( tagname != 'input' && tagname != 'img' ){
        // 标签开
        var itemF = str.indexOf('>')
        // 标签闭合
        var itemL = str.lastIndexOf('<')
        // 截取字符串
        var children = str.slice(itemF, itemL)
    }

    // 其中以on开头的是事件，props是属性值

    return {
        tagname: tagname ,
        propertyArr: hei ,
        // 对于花括号内的数据要支持简单的js语法，?: ! data.key.key 这样子
        events: events ,
        props: props ,
        children: children
    }
}

// 获取子元素，子元素需要排序， 文本元素/注释元素/一般元素
// ['']
console.log( getItem(str) )
