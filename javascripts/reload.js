/*
* @Author: 灵岩寺
* @Date:   2015-09-05 19:34:31
* @Last Modified by:   zikong
* @Last Modified time: 2015-09-28 15:52:19
*/

'use strict';
(function(){
    var fg = document.createDocumentFragment();
    var reload = document.createElement('a');
    reload.style.cssText += ";display:block;position:fixed;height:40px;width:40px;background-color:rgba(0,105,105,0.2);bottom:0;right:0;color:rgba(0,0,0,0);";
    reload.href = "";
    fg.appendChild(reload);
    document.body.appendChild(fg.childNodes[0]);

    // 之所以要设置其 textContent 是因为在某些设备上，如果是个空的元素，元素的一些表现行为不正常
    reload.textContent = '1' ;
})();
