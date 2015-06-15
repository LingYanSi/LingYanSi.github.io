
underscore.js / lodash.js
用过backbone就是知道，backbone依赖于underscore,underscore算是一个对对象，集合等处理的封装包，里面封装好了很多的方法
方便我们处理一些数据


webpackage
用于管理包依赖？


gulp/grunt
自动化处理工具，压缩混淆代码，css前缀补，less,sass文件编译 等等


less/sass
对css的一个语法扩展，可使用类似[编程]方式来写css
比如说 一个网页有一个主题色 themeColor = red ;
那么我就可以在代码中引用变量themeColor，修改也很容


nodejs/iojs
兄弟俩分家又和好了，主要是用在服务器端
服务器应该给前端提供原始数据，然后让前端计算【当然这是指对一些不需要保密的数据】


requirejs/seajs/commandjs
requirejs遵循的是AMD规范，提前加载所依赖文件
seajs遵循CMD规范，需要的时候再加载
CommonJS 
	CommonJS API定义很多普通应用程序（主要指非浏览器的应用）使用的API，
	从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标 准库。
	这样的话，开发者可以使用CommonJS API编写应用程序，然后这些应用可以运行在不同的JavaScript解释器和不同的主机环境

现在在ECMAScript6中也有了包依赖，不过还不够强大


angular/react/backbone/jquery/zepto
angular 
	特点：mvvm数据双向绑定，兼容性比较差，可用于后台管理，或者移动端
	ioinc:使用angular的hybrid app解决方案，ios,android都支持
react 
	特点：组件化，virtual (虚拟) DOM，兼容IE8及其以上，可用于生产环境
	react-native: 目前支持ios
backbone:
	特点：前端MVC框架鼻祖，数据单向绑定，轻量级，自由度高，依赖jquery、underscore
jquery
	特点：兼容性好，dom操作
zepto
	特点：面向移动端的类[jquery]js库

