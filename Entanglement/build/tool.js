window.Ent = window.Ent || {};

Ent.tools = {
    // 类型检测
  testType: function(obj) {
    var typeStr = Object.prototype.toString.call(obj);
    var t = typeStr.split(' ')[1].replace(']', '').toLowerCase();
    // console.log( t );
    return t;
  },
  isObject: function(obj) {
    return this.testType(obj) == 'object';
  },
  isFunction: function(obj) {
    return this.testType(obj) == 'function';
  },
  isString: function(obj) {
    return this.testType(obj) == 'string';
  },
  isArray: function(obj) {
    return this.testType(obj) == 'array';
  },
  isUndefined: function(obj) {
    return this.testType(obj) == 'undefined';
  },
  isBoolean: function(obj) {
    return this.testType(obj) == 'boolean';
  },
  isNull: function(obj) {
    return this.testType(obj) == 'null';
  },
  isNumber: function(obj) {
    // NaN Object.prototype.toString.call(NaN) [object Number]
    return !isNaN(obj) && this.testType(obj) == 'number';
  },
  // 浅copy
  clone: function(obj) {
      var cloneObj = {};
      for(var key in obj){
          cloneObj[key] = obj[key]
      }
      return cloneObj
  },
  // 深copy
  deepclone: function(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}
