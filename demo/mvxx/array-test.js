/*
 * @Author: 灵岩寺
 * @Date:   2015-08-30 17:57:18
 * @Last Modified by:   灵岩寺
 * @Last Modified time: 2015-09-02 14:28:14
 */

'use strict';
(function() {
    var partyArr = [];
    Lyan_Arr.create({
        data: partyArr,
        template: '<div class="ju-item"> <div><img src="{{$party.avatar}}" alt="" /><div>{{$party.username}}</div></div> <div>{{$party.intro}}</div> </div>',
        ele: 'bottom',
        renderBefore: function() {
            console.log('数组开始渲染', '监听ajax数组');
        },
        renderAfter: function() {
            console.log('数组渲染结束', '监听ajax数组');
        },
        render: function() {
            console.log('数组渲染中');
            console.log(partyArr, '监听ajax数组');
        }
    });


    $.jsonp({
        type: 'get',
        url: 'http://app.nacute.com/api/ajax/party/list?pageNo='+1+'&pageSize=10',
        success: function(data) {
            var info = data.info.slice(0) ;
            console.log(info);

            // 在数组的任意位置插入一个数组
            data.info.unshift(partyArr.length)
            data.info.unshift(0);
            partyArr.splice.apply(partyArr,data.info);

            partyArr.unshift(info[2]);
            partyArr.splice(2,0,info[6]);

            // 这样来删除数组中的元素，不要使用 delete arr[index]的方式
            partyArr.splice(0,1);
        }
    });

})();

