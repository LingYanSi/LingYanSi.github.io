/*
 * @Author: 灵岩寺
 * @Date:   2015-08-25 17:40:34
 * @Last Modified by:   灵岩寺
 * @Last Modified time: 2015-08-26 16:48:17
 */

'use strict';

(function() {
    // var daye = new ly({
    //     el: '#daye',
    //     template: '<div>{{state}}</div><div>{{info[0].name}}</div>',
    //     data: {
    //         state: true,
    //         info: [{
    //             name: '周芷若',
    //             age: 18,
    //         }, {
    //             name: '赵敏',
    //             age: '16',
    //         }]
    //     }
    // });
    var arrName = [{
        name: '宋小帆',
        age: 22 ,
    }, {
        name: '陈莹',
        age: 24
    }, {
        name: '李倩',
        age: 21
    }, ];

    Lyan_Arr.create({
        obj:arrName,
        template:'<p><span>{{$wife.name}}</span><span>{{$wife.age}}</span><span>cunt状态</span></p>',
        ele:'#daye',
        renderBefore:function(){
            console.log('数组开始渲染');
        },
        renderAfter:function(){
            console.log('数组渲染结束');
        },
        render:function(){
            console.log('数组渲染中')
        }
    });
    arrName.push({
        name: '周芷若',
        age: 16
    }, {
        name: '赵敏',
        age: 17
    }, {
        name: '小昭',
    });
    arrName.unshift({
        name: '结衣',
        age: 26
    });

    var index = 0;
    $('#daye').on('click', function() {
        data.name = arrName[index];
        index++;
        index = (index < arrName.length) ? index : 0;
    });


    var data = {};
    data.name = arrName[index];
    index++;

    // 这里应该对应一个模板，如果数据改变，就重新渲染模板
    // 按理说一个组件的样式、js逻辑，不应该在外部被定义，不能说重新有个base.css文件，或者是一个main.js
    // 他应该就是一个组建文件，或者对象，全部都写在内部
    // 其实vue.js这方面做得很不错啊
    var dula = Lyan.create({
        data: data,
        property: 'name',
        ele: '#zhou',
        template: '', // template对应一个模板，data变化重新渲染
        renderBefore: function() {
            // console.log('渲染开始');
        },
        renderAfter: function() {
            // console.log('渲染结束');
        },
        render: function(newValue, value, $dom) {
            // 其实这样写也可以，但问题在于不能够将模板抽离出来
            $dom.innerHTML = '<div style="background:rgb(38,157,128);color:#fff;">' +
                '<h2>' + newValue.name + '</h2>' +
                 (newValue.age ? ('<h3>' + '年方' +newValue.age + '</h3>') : '') +
                '</div>';
        },
    });

    $.jsonp({
        type:'get',
        url:'http://app.nacute.com/api/ajax/party/list?pageNo=1&pageSize=10',
        success:function(data){
            console.log(data)
        }
    });
    /* lyan_arr(arrName, function() {
         console.log('数组长度改变了');
         console.log([].slice.call(arguments));
     });*/
})();
