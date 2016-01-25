// 如果已经引入Ent就使用前面的，此方法有待商榷
window.Ent = window.Ent || {};

Ent.create = function( obj ){

    var $ele = document.querySelector( obj.ele );
    // Ent.listen(obj)
    function render(){
        var str = Ent.parse( obj.template , obj.data);
        $ele.innerHTML = str ;
        // console.log('赫尔呵呵', str);
    }

    render();

    Ent.listen(obj.data , render);
};

Ent.version = '0.01';
