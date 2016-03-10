/*
* @Author: zikong
* @Date:   2016-01-08 16:48:50
* @Last Modified by:   zikong
* @Last Modified time: 2016-01-09 22:49:01
*/

'use strict';

// 使用body传递
$.ajax({
    url:'/pcx/item/save',
    data: JSON.stringify(submitData) ,
    dataType: 'json', // 后端返回过来的数据类型
    contentType: 'text/json', // 传给给后端的数据类型
    processData: false , // 是否把数据转换 key=value&key=value 形式
    type: 'post'
})
