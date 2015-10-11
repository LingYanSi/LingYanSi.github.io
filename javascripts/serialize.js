/*
* @Author: zikong
* @Date:   2015-09-29 15:32:25
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-05 13:30:06
*/

'use strict';

//   序列化表单
/*
* 其实说到form表单，提交的时候 name-value 这是一般的键值对形式
* method = get 的提交为显式的，提交数据会在url上以search形式表现
* method = post 为隐式的，提交数据不会在url上表现
*/
var serialize = (function(){
    var fn = function(id){
        var $form = document.getElementById(id);

        var obj = {};
        var inputArr = [].slice.call( $form.querySelectorAll('*') );

        var requireArr = [];
        inputArr.forEach(function(ele){
            if(!ele.name) return

            if(ele.type=="radio"){
                if(!obj[ele.name] && ele.checked)
                    obj[ele.name] = ele.value  ;
            }else if(ele.type=='checkbox'){
                obj[ele.name] = ele.checked ;
            }else{
                obj[ele.name] = ele.value ;
            }

            // 把必须要填的元素 统计缓存起来
            ele.hasAttribute('require') && requireArr.push(ele)

        });

        //
        var isSubmitAbel = true ;
        requireArr.forEach(function(ele){
            if(isSubmitAbel && !obj[ele.name]){
                isSubmitAbel=false ;
                console.log(ele.name+':',ele.getAttribute('errormsg')  );
                modal.alert(ele.getAttribute('errormsg'))
            }
        });

        console.log(obj);
        return obj ;
    }

    return fn ;
})();

document.querySelector('input[type="submit"]').addEventListener('click',function(event){
    event.preventDefault();
    serialize('form');
})
