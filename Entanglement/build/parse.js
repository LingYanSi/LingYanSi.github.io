
// var str = '<div onClick={} className={}>{name}</div>';

// 实在太低级，应该解析成一个语法树
// {}应该支持+-*/ ?:三则运算符号，函数，还有事件支持
// 这个地方还是有些复杂的
/*

    从str来看，
    // 按层级解析出 div>div+p>span

    <div>
        <div></div>
        <p>
            <span></span>
        </p>
    </div>

    input/img 等，除此之外
    先移除 (>(.*)</) 中间的字符串
    str.replace('')
    获取div: string.match(/<([^>])>/)[1] ;

    再移除，再获取

    var str = `
        <div>
            <div>{name}</div>
            <p>
                <span>{title}</span>
            </p>
        </div>
    ` ;
    // 清除回车
    str = str.replace(/\n/g,'');
    // 清楚空白符号
    str = str.replace(/\s{2,}/g,'');
    // 清楚{.*}
    str = str.replace(/>([^<]*)(?=<\/)/g,'>') ;
    // 解析树状结构
    function parse(str){
        var df = document.createDocumentFragment();
        var div = document.createElement(div);
        div.innerHTML =
        return {
            nodeName: str.replace(/>(.*)<\//,'|').replace(/>|<|(\|.*)/g,'') ,
            content: str.match(/>(.*)<\//)[1]
        }
    }
    parse(str)

   路标系统，如何复用原有dom结构
   diff

   根据元素节点
   <!-- ent 1 -->
   <div>
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

   // 构建一个对象树
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
*/
Ent.parse = function(str, data){
    var arr = str.split('}');

    var result = '' ;

    arr.forEach(function(item ){
        var arr1 = item.split('{');
        arr1[1] = arr1[1] ? arr1[1].trim() : '';

        // console.log(arr1, item, item.split('{'), data, data[arr1[1]])
        //
        var r1 = arr1[0] , r2= arr1[1] ? data[arr1[1] ] : '' ;

        result = result + r1 + r2 ;
    });

    return result ;
}
