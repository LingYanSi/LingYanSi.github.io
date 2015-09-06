/*
* @Author: 灵岩寺
* @Date:   2015-09-05 19:34:31
* @Last Modified by:   灵岩寺
* @Last Modified time: 2015-09-06 12:13:20
*/

'use strict';
var fg = document.createDocumentFragment();
var reload = document.createElement('a');
reload.style.cssText += ";display:block;position:fixed;height:40px;width:40px;background-color:rgba(0,105,105,0.2);bottom:0;right:0;color:rgba(0,0,0,0);";
reload.href = "";
fg.appendChild(reload);
document.body.appendChild(fg.childNodes[0]);
reload.textContent = '1' ;
