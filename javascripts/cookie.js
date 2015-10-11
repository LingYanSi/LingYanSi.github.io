/*
* @Author: zikong
* @Date:   2015-09-28 17:23:06
* @Last Modified by:   zikong
* @Last Modified time: 2015-09-29 11:02:02
*/

'use strict';

// 一般而言，网站数据的存储方式有两种
// cookie 存储大小在4k左右，长度有限制，一般用于存储 uid/token
// token在每次请求服务器时，都会被带上，因此服务器可以校验用户是不是

/*
* encodeURIComponent
  该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
  其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。
*/

var LyCookie = (function(){

    var cookie = document.cookie ;
    var obj =  {
            cookieObj: {},
            // 添加一个cookie, timeEnd以秒为单位
            add : function(name,value,timeEnd){
                name = name && encodeURIComponent(name);
                value = value && encodeURIComponent(value);
                timeEnd = timeEnd*1000 ;
                timeEnd = timeEnd ? new Date( new Date().getTime()+timeEnd ).toUTCString(): new Date().toUTCString();
                document.cookie = name+'='+value+';expires='+timeEnd  ;
            },
            // 移除cookie，可接受多个参数
            remove: function(){
                var arr = [].slice.call(arguments) ;
                for(var i=0,len=arr.length; i<len ;i++){
                    this.add(arr[i],'',0);
                }
            },
            // 删除所有cookie
            removeAll: function(){
                var cookieArr = document.cookie.split(';');
                for(var i=0,len=cookieArr.length; i<len ; i++){
                    this.remove( cookieArr[i].split('=')[0] );
                }
            },
            // cookie是否存在
            contains: function(name){
                this.getAll();
                return this.cookieObj[name]===undefined?false:true ;
            },
            // 获取指定key值的cookie
            getItem: function(name){
                this.getAll();
                return this.cookieObj[name] ;
            },
            // 获取所有cookie，返回一个 key-value 的对象
            getAll: function(){
                this.cookieObj = {}
                var cookieArr = document.cookie.split(';');
                for(var i=0,len=cookieArr.length; i<len ; i++){
                    this.cookieObj[ decodeURIComponent(cookieArr[i].split('=')[0]) ] =
                    decodeURIComponent(cookieArr[i].split('=')[1]) ;
                }
                return this.cookieObj ;
            }
        }
    return obj ;
})();

/*
LyCookie.add('wife1','songxiaofan',60*60*24);
LyCookie.add('wife2','liqian',60*60*2);

console.log(LyCookie.getAll())
LyCookie.remove('wife1','wife2')
console.log(LyCookie.getAll(),document.cookie )
*/
