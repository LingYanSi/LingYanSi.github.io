/*
* @Author: zikong
* @Date:   2015-10-12 00:12:45
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-12 00:18:52
*/

'use strict';

var Device = (function(){
    var nav = window.navigator.userAgent.toLowerCase();

    var obj = {
        isPhone: !!nav.match(/phone|ipad|android|pod/),
    }
    console.log( obj )
    return obj
})();
