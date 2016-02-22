// 如果已经引入Ent就使用前面的，此方法有待商榷
window.Ent = window.Ent || {};

// 创建一个组件
Ent.create = function( obj ){

    var $ele = document.querySelector( obj.ele );

    $ele.appendChild( render(getVDom(obj.template),  obj , $ele ))

    Ent.listen(obj.data , function(key, oldValue, newValue){
        console.log('数据发生了变化', key , oldValue, newValue);
        // 去寻找关联节点
        // 组件初始化的时候，生成一个virtual dom
        // 数据变化后应该再生成一个virtual dom
        // 两个dom做diff
        // 做选择性渲染
    });
};
