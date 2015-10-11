/*
 * @Author: zikong
 * @Date:   2015-09-28 23:10:20
 * @Last Modified by:   zikong
 * @Last Modified time: 2015-09-29 11:14:31
 */

'use strict';

/*
    hash: "#11=2222222"
    host: "192.168.1.12:8000"
    hostname: "192.168.1.12"
    href: "http://192.168.1.12:8000/demo/flexable/index.html?a=b&c=1111#11=2222222"
    origin: "http://192.168.1.12:8000"
    pathname: "/demo/flexable/index.html"
    port: "8000"
    protocol: "http:"
    reload: reload()
    search: "?a=b&c=1111"
*/

var LyURL = (function() {

    var obj = {
        // 获取当前url中的search字符串，并将其转换成对象
        getSearchObj: function() {
           return this.strToObj(location.search.slice(1))
        },
        // 获取当前url中的hash字符串，并将其转换成对象
        getHashObj: function() {
           return this.strToObj(location.hash.slice(1))
        },
        // 把字符串转换成对象，并对字符串进行 decodeURIComponent 解码
        strToObj: function(str) {
            var arr = str.split('&');
            var obj = {};
            arr.forEach(function(ele){
                var arr = ele.split('=');
                obj[arr[0]] = decodeURIComponent( arr[1] ) ;
            });
            return obj ;
        },
        // 对象转换成对象，并对字符串进行 encodeURIComponent 编码
        objToStr: function(obj){
            var arr = [] ;
            for(var key in obj){
                arr.push( key+'='+encodeURIComponent(obj[key]) )
            }
            return arr.join('&');
        }
    }
    return obj ;
})();

/*
console.log(location)
console.log(location,LyURL.getSearchObj(),LyURL.getHashObj())

var str = LyURL.objToStr({name:'周恩来',refer:'http://www.baidu.com?s=嘿嘿'}) ;
console.log( LyURL.strToObj(str) );
*/
