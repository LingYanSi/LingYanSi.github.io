

window.Ent = window.Ent || {};

// 监听对象
Ent.listen = function(obj, onchange) {
  // 获取obj的所有属性, onchange回调参数

  // 对数据类型做校验
  if (!this.tools.isObject(obj) && !this.tools.isArray(obj)) {
    console.warn('Ent只能监听type为Object/Array的数据,不能监听', this.tools.testType(obj));
    return
  }

  // 对第onchange做类型校验
  if (onchange && !this.tools.isFunction(onchange)) {
    console.warn('Ent.listen的第二个参数类型只能为function');
    onchange = undefined;
  }

  var properties = null;

  switch (this.tools.testType(obj)) {
    case 'object':
      properties = this.listenObj(obj, onchange)
      break;

    case 'array':
      properties = this.listenArr(obj, onchange)
      break;
  }

  // 重新自定义对象属性
  Object.defineProperties(obj, properties)
}

// 监听对象
// 现在只对数据的一级对象做了监听，二级三级对象并没有监听
Ent.listenObj = function(obj, onchange) {
  // 对于对象
  var keys = Object.keys(obj);
  var properties = {};
  keys.forEach(function(item) {
    // 利用闭包，缓存值
    var value = obj[item];

    properties[item] = {
      get: function() {
        // console.log('获取')
        return value
      },
      set: function(newValue) {
        // console.log('设置')
        // 变化可传递一个监听参数
        var oldValue = value ;
        value = newValue
        onchange && onchange(item, oldValue, newValue)
      }
    }
  });

  return properties;
}

// 监听数组
// 只是监听了数组，并没有监听数组的元素的变化
Ent.listenArr = function(arr, onchange) {

  var properties = {};
  // 暂时只监听 push/unshift/splice 四个方法
  ['push', 'unshift', 'splice'].forEach(function(item) {
    properties[item] = {
      get: function() {
        return function() {
          var arg = [].slice.call(arguments);
        //   console.log('参数', item, arg);
          [][item].apply(arr, arg);
          // 暂时只传递新的arr，应该在传递一个老的数组
          onchange && onchange(arr);
        }
      }
    }
  })

  return properties;
}


// 移除监听
Ent.removeListen = function(obj) {
  // obj.def
}
