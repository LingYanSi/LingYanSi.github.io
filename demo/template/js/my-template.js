/*
* @Author: zikong
* @Date:   2015-09-21 13:38:48
* @Last Modified by:   zikong
* @Last Modified time: 2015-09-21 13:51:55
*/

'use strict';

var template = (function(){
    var tool = {
        analysis : function(template,obj){
            // 把字符串分为被{{}}包裹的逻辑语句，和非逻辑字符串
            var arr1 = template.split(/\{{2}[^\}\{}]+\}{2}/); // 非逻辑字符串
            var arr2 = template.match(/\{{2}[^\}\{}]+\}{2}/g); // 逻辑语句

            var str = arr1.map(function(ele,index,arr){
                var str = '' ;
                if(arr2[index]){
                    var arr3 = arr2[index].replace(/[\{\}]/g,'').split('.').slice(1);
                    var obj_1 = obj ;
                    for(var i=0,len=arr3.length;i<len;i++){
                        obj_1 = obj_1[arr3[i]] ;
                    }
                    str = obj_1?obj_1:'' ;
                }
                return ele+str ;
            }).join('');
            return str ;
        }
    }
    var tpl = function(id,obj){
        var str = document.getElementById(id).innerHTML ;
        return tool.analysis(str,obj);
    }
    return tpl ;
})()
