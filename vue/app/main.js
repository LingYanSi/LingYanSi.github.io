/*
* @Author: zikong
* @Date:   2015-11-27 13:10:31
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-30 12:50:04
*/

'use strict';

var Vue = require('vue')
var vueTouch = require('vue-touch')
var App = require('./app.vue')

// 引入hammer.js 快速点击
Vue.use(vueTouch)

new Vue({
  el: 'body',
  components: {
    app: App
  }
})
