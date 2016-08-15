// 提供一些方法
var Ent = (function(){
    return {
        render(component, props, ele){
            // 去渲染
            component.init(ele,  props)
        },
        components: {}
    }
})();
