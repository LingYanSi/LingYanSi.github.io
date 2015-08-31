/*- 千万45
 * @Author: 灵岩寺
 * @Date:   2015-08-22 17:51:26
 * @Last Modified by:   灵岩寺
 * @Last Modified time: 2015-08-31 14:07:33
 */

'use strict';
/*
 * 这里来思考一个问题，假如说我们要监听一个对象的属性，
 * 我们是需要声明对象，与属性的
 * 还有就是，我们并需要监听get事件，只需set事件
 * 其次，还是分析需求吧，
 */

var LY = {
    rendeTpl: function(template,obj) {
        // template进来后，需要解析，简单一点的花就是匹配{{}}
        // 然后将花括号内的变量替换为字符串？
        var arr1 = template.split(/\{{2}[^\}\{}]+\}{2}/); // 把字符串按{{xxxx}} split成数组
        var arr2 = template.match(/\{{2}[^\}\{}]+\}{2}/g); // 匹配所有{{xxxx}}
        var str = arr1.map(function(ele,index,arr){
            var str = '' ;
            if(arr2[index]){
                var arr3 = arr2[index].replace(/[\{\}]/g,'').split('.').slice(1);
                var obj_1 = obj ;
                for(var i=0,len=arr3.length;i<len;i++){
                    obj_1 = obj_1[arr3[i]] ;
                }
                str = obj_1 ;
            }
            return ele+str ;
        }).join('');
        return str ;
    },
}
// 对对象的监听,假如有多个地方需要对一个属性的变化做监听
// 这个时候，属性变化所触发的事件，应该是一个队列
// 当需要重新监听数据的时候，就需要

var LyanData = {
    ly_id_1:[
        {
            renderBefore:,
            render:,
            render:,
        }
    ]
}
var Lyan = (function() {
    var Lyan = {
        create:function(obj){
            return new Lyan_instance(obj) ;
        }
    };
    return Lyan ;
})();

function Lyan_instance(obj){
    var object , property , fun , value , renderBefore , renderAfter , render , $dom ;
    var Lyan = {
        create: function(obj) {
            object = obj.data ;
            property = obj.property ;
            value = object[property];
            render = obj.render ;
            renderBefore = obj.renderBefore ;
            renderAfter = obj.renderAfter ;
            $dom = obj.ele ? document.querySelector(obj.ele) : null;

            var _this = this ;
            Object.defineProperty(object, property, {
                get: function() {
                    // console.log('get获取值')
                    return value;
                },
                set: function(newValue) {
                    // 这里还需要做的是，做一个时间判断，时间间隔为50ms
                    // 还要有一个状态，模板是否渲染完成，开始渲染，渲染结束
                    // 如果这个渲染没有结束，就不进入到下一个渲染
                    if ( !Lyan.fu && newValue === value) return;

                    _this.render(newValue,value,$dom);
                    value = newValue;
                },
                enumberable: true,
                configurable: true,
            });

            this.init(); // 初始化
        },
        fu:false ,
        forceUpdate : function(){ // 是为了应对第一次
            this.fu = true ;
        },
        init: function(){
            this.forceUpdate();
            object[property] = value ;
            Lyan.fu = false ;
        },
        renderBefore: function(){
            renderBefore && renderBefore();
        },
        renderAfter: function(){
            renderAfter && renderAfter();
        },
        render: function(){
           this.renderBefore();

           var arr = [].slice.call(arguments);
           render && render.apply(null,arr);

           this.renderAfter();
        },
    };
    Lyan.create(obj);
}

// 对数组的监听
var Lyan_Arr = (function(){
    var Lyan_Arr = {
        create:function(args){
            return new Lyan_Arr_instance(args);
        }
    }
    return Lyan_Arr ;
})();
function Lyan_Arr_instance(object){
    var obj , template , $dom , renderAfter ,renderBefore ,render ,currentProp;
    var Arr_proto = Array.prototype;
    var slice = [].slice;
    var Arr_props = ['push','unshift','splice'] ; //监听数组的哪些方法
    var Lyan_Arr = {
        create:function(object){

            var _this = this ;
            render = object.render ,
            renderBefore = object.renderBefore ,
            renderAfter = object.renderAfter ,
            template = object.template ,
            $dom = object.ele ? document.querySelector(object.ele) : null ,
            obj = object.data ;

            Arr_props.forEach(function(prop){
                set(obj,prop);
            });
            function set(obj,prop){
                Object.defineProperty(obj, prop, {
                    get: function() {
                        var arr = slice.call(arguments);
                        currentProp = prop ;
                        return _this.render ;
                    },
                    set: function(newValue) {},
                    enumberable: true,
                    configurable: true,
                });
            }

            this.forceUpdate();
        },
        init:function(){ // 组件初始化
           var str = obj.map(function(ele,index,arr){
                return LY.rendeTpl(template,ele) ;
            }).join('');
           // console.log('拼接字符串',str,obj,template)
           $dom.innerHTML = str ;
        },
        forceUpdate:function(){
            this.init();
        },
        renderBefore:function(){ // 渲染前
            renderBefore && renderBefore();
        },
        renderAfter:function(){ // 渲染后
            renderAfter && renderAfter();
        },
        render:function(){ // 渲染
            var arr = slice.call(arguments);
            Lyan_Arr.renderBefore();
            render.apply(null, arr);
            switch(currentProp){
                case 'push':
                    Lyan_Arr.render_push.apply(null,arr);
                    break ;
                case 'unshift':
                    Lyan_Arr.render_unshift.apply(null,arr);
                    break ;
                case 'splice':
                    Lyan_Arr.render_splice.apply(null,arr);
                    break ;
            }
            Lyan_Arr.renderAfter();
            // 真实的数组操作
            return Arr_proto[currentProp].apply(obj, arr);
        },
        render_push:function(){
            var arr = slice.call(arguments);
            $dom.innerHTML += arr.map(function(ele,index,arr){
                return LY.rendeTpl(template,ele) ;
            }).join('');
            console.log('调用了push方法',arr);
            // $dom.append();
        },
        render_unshift:function(){
            var arr = slice.call(arguments);
            $dom.innerHTML = arr.map(function(ele,index,arr){
                return LY.rendeTpl(template,ele) ;
            }).join('')+$dom.innerHTML ;
             console.log('调用了unshift方法',arr);
            // $dom.prepend();
        },
        render_splice:function(){
            var arr = slice.call(arguments);
            arr.splice(0,2);
            $dom.innerHTML = arr.map(function(ele,index,arr){
                return LY.rendeTpl(template,ele) ;
            }).join('')+$dom.innerHTML ;
            console.log('调用了splice方法',arr);
            // $dom.remove().find().after();
        }
    };
    Lyan_Arr.create(object);
}

// wtf
function ly(obj) {
    var data = obj.data,
        ele = obj.el,
        template = obj.template;
    document.querySelector(ele).innerHTML = template;
    fenxi(template);
}

