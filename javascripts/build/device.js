/*
* @Author: zikong
* @Date:   2015-10-12 00:12:45
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-17 23:02:12
*/

'use strict';

var LY = LY || {} ;

LY.device = (function(){
    var nav = window.navigator.userAgent.toLowerCase();

    var obj = {
        isPhone: !!nav.match(/phone|ipad|android|pod/),
        isApp: !!nav.match('appname'),
        isIE: nav.match('ie'),
        isIphone: !!nav.match('iphone'),
        isAndroid: !!nav.match('android'),
        isWphone: !!nav.match('windows phone'),
    }
    return obj
})();
