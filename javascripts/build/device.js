/*
* @Author: zikong
* @Date:   2015-10-12 00:12:45
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-17 20:41:47
*/

'use strict';

var LY = LY || {} ;

LY.device = (function(){
    var nav = window.navigator.userAgent.toLowerCase();

    var obj = {
        isPhone: !!nav.match(/phone|ipad|android|pod/),
    }
    console.log( obj )
    return obj
})();
