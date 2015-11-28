/*
* @Author: zikong
* @Date:   2015-11-27 13:10:31
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-28 15:12:55
*/

'use strict';

var Vue = require('vue')
var App = require('./app.vue')

new Vue({
  el: 'body',
  components: {
    app: App
  }
})
