/*
* @Author: zikong
* @Date:   2016-01-02 12:31:21
* @Last Modified by:   zikong
* @Last Modified time: 2016-01-02 12:35:00
*/

'use strict';


var cookieParse = function(cookie) {
    if (cookie) {
        let arr = cookie.split(';');
        let obj = {};

        arr.forEach((ele) => {
            ele = ele.trim();
            let arr1 = ele.split('=');
            obj[arr1[0]] = arr1[1];
        })
        return obj;
    }
}

module.exports = cookieParse ;
