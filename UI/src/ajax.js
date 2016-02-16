
window.Ajax = window.Ajax || function(obj){
    /*{
        type: post/get ,
        url: '/ssss',
        async: true/fase, // 是否同步
        data: formData/{},
        dataType: 'string/json/jsonp',
        done: function ,
        failed: function
    }*/
    var type = obj.type || 'get' ,
        url = obj.url ,
        isSync = obj.sync

    var xhr = new XMLHttpRequest();
    xhr.open(type, url, isSync );
    xhr.onreadystatechange(function(){
        // 
        console.log( this.readyState )
    })
}
