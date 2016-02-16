var str = `
        <div>
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
        children:,
        nodeName:,
        text:,
        events:,
        className:'',
        id:'',
        props:,
        entid:,
     }
     闭合标签 div/span/p/pre/h1/h2/h3/h4/h5/h6/i/b/form/table/tbody/thead/tr/td
            <!-- -->
     半闭合 img/input
 */
 // <[a-z]+
str.
