/*
 * @Author: 灵岩寺
 * @Date:   2015-08-25 17:40:34
 * @Last Modified by:   灵岩寺
 * @Last Modified time: 2015-09-03 12:04:14
 */

'use strict';

;(function() {
    var arrName = [{
        name: '宋',
        age: 22 ,
    }, {
        name: '陈',
        age: 24
    }, {
        name: '李',
        age: 21
    }, {
        name: '周芷若',
        age: 16
    }, {
        name: '赵敏',
        age: 17
    }, {
        name: '小昭',
    }];

    // 假如重新给数组赋值，就无法监听了，因为数组是对象，是引用类型
    Lyan_Arr.create({
        data:arrName,
        template:'<p><span>{{$wife.name}}</span><span>{{$wife.age}}</span><span></p>',
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


    var data = {
        name:{
            name:'',
            age:'',
        }
    };

    // 这里应该对应一个模板，如果数据改变，就重新渲染模板
    // 按理说一个组件的样式、js逻辑，不应该在外部被定义，不能说重新有个base.css文件，或者是一个main.js
    // 他应该就是一个组建文件，或者对象，全部都写在内部
    // 其实vue.js这方面做得很不错啊
    var dula = Lyan.create({
        data: data,
        property: 'name',
        ele: '#zhou',
        template: '<div style="background:rgb(38,157,128);color:#fff;"><h2>{{$data.name.name}}</h2><h3>年方{{$data.name.age}}</h3></div>', // template对应一个模板，data变化重新渲染
        renderBefore: function() {
            // console.log('渲染开始');
        },
        renderAfter: function() {
            // console.log('渲染结束');
        },
        render: function(newValue, value, $dom) {

        },
    });


})();
