!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=n(8),f=r(s),d=n(2),p=n(12),h=r(p),b=n(26),m=(r(b),n(10)),y=r(m),v=n(16),w=r(v),E=n(14),O=r(E),g=n(20),_=r(g),j=n(28),k=r(j),P=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement(d.Router,{history:d.hashHistory},c["default"].createElement(d.Route,{path:"/",component:h["default"]},c["default"].createElement(d.Route,{path:"about",component:y["default"]}),c["default"].createElement(d.Route,{path:"article",component:w["default"]}),c["default"].createElement(d.Route,{path:"article/new",component:_["default"]}),c["default"].createElement(d.Route,{path:"article/edit/:id",component:_["default"]}),c["default"].createElement(d.Route,{path:"article/:id",component:O["default"]}),c["default"].createElement(d.Route,{path:"*",component:k["default"]})))}}]),t}(c["default"].Component);f["default"].render(c["default"].createElement(P,null),document.getElementById("app"))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l);n(3);var s=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.state={queue:[]},e}return i(t,e),u(t,[{key:"componentDidMount",value:function(){t.self=this,t.id=0}},{key:"pipe",value:function(e){return e.map(function(e){switch(e.type){case"tips":return c["default"].createElement("div",{className:"modal-item modal-item-tips",key:"modal_"+e.id},c["default"].createElement("p",null,e.component));case"alert":return c["default"].createElement("div",{className:"modal-item modal-item-alert",key:"modal_"+e.id},c["default"].createElement("p",null,e.component),c["default"].createElement("div",{className:"modal-item-btns"},c["default"].createElement("button",{onClick:e.success},"确认"),c["default"].createElement("button",{onClick:e.cancel},"取消")));case"confirm":return c["default"].createElement("div",{className:"modal-item modal-item-confirm",key:"modal_"+e.id},c["default"].createElement("p",null,e.component),c["default"].createElement("div",{className:"modal-item-btns"},c["default"].createElement("button",{onClick:e.success},"确认"),c["default"].createElement("button",{onClick:e.cancel},"取消")));case"open":return c["default"].createElement("div",{className:"modal-item modal-item-open",key:"modal_"+e.id},e.component)}})}},{key:"render",value:function(){var e=this.pipe(this.state.queue);return c["default"].createElement("div",{className:"modal"},e)}}]),t}(l.Component);s.open=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=this.self,n=this.self.state.queue,r=this.id++;return n.push({type:"open",component:e,id:r}),t.setState({queue:n}),r},s.tips=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?3e3:arguments[1],n=this.self,r=this.self.state.queue,o=this.id++;return r.push({type:"tips",component:e,id:o}),n.setState({queue:r}),setTimeout(function(){s.close(o)},t),o},s.alert=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1],n=arguments[2],r=this.self,o=this.self.state.queue,a=this.id++;return o.push({type:"alert",component:e,id:a,success:function(){t&&t(),s.close(a)},cancel:function(){n&&n(),s.close(a)}}),r.setState({queue:o}),a},s.confirm=function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments[1],n=arguments[2],r=this.self,o=this.self.state.queue,a=this.id++;return o.push({type:"confirm",component:e,id:a,success:function(){t&&t(),s.close(a)},cancel:function(){n&&n(),s.close(a)}}),r.setState({queue:o}),a},s.close=function(e){var t=this.self,n=this.self.state.queue;e?n.pop():n=n.filter(function(t){return t.id!=e}),t.setState({queue:n})},s.closeAll=function(){this.self.setState({queue:[]})},t["default"]=s},function(e,t){e.exports=window.ReactRouter},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l);n(9);var s=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).call(this))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props;return c["default"].createElement("div",{className:"tips"},c["default"].createElement("a",{href:e.url?e.url:"javascript:0;",target:"_blank"},e.content),c["default"].createElement("button",{onClick:e.close},"x"))}}]),t}(l.Component);t["default"]=s},function(e,t){e.exports=window.React},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(5);n(7);var l="transition",c=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state={left:0,top:0,startX:0,startY:0,offsetX:0,maxOffsetX:0,minOffsetX:(1-n.props.width)/n.props.width,touching:!1,swipeX:!1,swipeY:!1,direactX:0,direactY:0,transitioning:!1},n.touchstart=n.touchstart.bind(n),n.touchmove=n.touchmove.bind(n),n.touchend=n.touchend.bind(n),n.transitionend=n.transitionend.bind(n),n}return a(t,e),i(t,[{key:"touchstart",value:function(e){var t=this.state;if(!t.transitioning){this.refs.ele.classList.remove(l),t.width=this.refs.ele.clientWidth;var n=e.touches[0];t.startX=n.screenX,t.startY=n.screenY}}},{key:"touchmove",value:function(e){var t=this.state;if(!t.transitioning){var n=e.touches[0],r=n.screenX,o=n.screenY;!t.swipeY&&(t.swipeX||Math.abs(r-t.startX)>=Math.abs(o-t.startY))&&(t.swipeX=!0,e.preventDefault(),t.direactX=r-t.startX,t.offsetX=t.left+t.direactX,this.setOffset(t.offsetX/t.width,this.refs.ele)),!t.swipeX&&(t.swipeY||Math.abs(r-t.startX)<Math.abs(o-t.startY))&&(t.swipeY=!0)}}},{key:"setOffset",value:function(e,t){t.style.transform="translateX("+100*e+"%)",t.style.webkitTransform="translateX("+100*e+"%)"}},{key:"touchend",value:function(e){var t=this.state;if(!t.transitioning){if(0==t.direactX)return void this.transitionend();var n=this.refs.ele;t.left=t.offsetX,n.classList.add(l),n.clientHeight,t.left/t.width<t.minOffsetX?t.left=t.minOffsetX*t.width:t.left/t.width>t.maxOffsetX?t.left=t.maxOffsetX*t.width:t.direactX>0?t.left=t.maxOffsetX*t.width:t.left=t.minOffsetX*t.width,t.transitioning=!0,this.setOffset(t.left/t.width,n)}}},{key:"transitionend",value:function(){var e=this.state;e.transitioning=!1,e.swipeX=!1,e.swipeY=!1,e.direactX=0}},{key:"render",value:function(){var e=this.props;return React.createElement("div",{className:"swipe",onTouchStart:this.touchstart,onTouchMove:this.touchmove,onTouchCancel:this.touchend,onTouchEnd:this.touchend,onWebkitTransitionEnd:this.transitionend,onTransitionEnd:this.transitionend},React.createElement("div",{style:{width:100*e.width+"%"},ref:"ele"},e.children))}}]),t}(u.Component);t["default"]=c},function(e,t){},function(e,t){e.exports=window.ReactDOM},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l);n(11);var s=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"padding",id:"about"},"暗香",c["default"].createElement("br",null),"旧时月色，算几番照我，梅边吹笛。 ",c["default"].createElement("br",null),"唤起玉人，不管清寒与攀摘。 ",c["default"].createElement("br",null),"何逊而今渐老，都忘却，春风词笔。 ",c["default"].createElement("br",null),"但怪得竹外疏花，香冷入瑶席。 ",c["default"].createElement("br",null),c["default"].createElement("br",null),"江国，正寂寂。 ",c["default"].createElement("br",null),"叹寄与路遥，夜雪初积。 ",c["default"].createElement("br",null),"翠尊易泣，红萼无言耿相忆。 ",c["default"].createElement("br",null),"长记曾携手处，千树压，西湖寒碧。 ",c["default"].createElement("br",null),"又片片吹尽也，几时见得？")}}]),t}(l.Component);t["default"]=s},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=(n(2),n(24)),f=r(s),d=n(22),p=r(d),h=n(29),b=r(h),m=n(26),y=r(m),v=n(1),w=r(v);n(13);var E=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.state={sidebar:!1},e}return i(t,e),u(t,[{key:"handleSidebarChange",value:function(){this.setState({sidebar:!this.state.sidebar})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state;return c["default"].createElement("div",null,c["default"].createElement(w["default"],null),c["default"].createElement(f["default"],{sidebar:e.sidebar}),c["default"].createElement("div",{className:"main"},c["default"].createElement(b["default"],{sidebar:e.sidebar,handleSidebarChange:this.handleSidebarChange.bind(this)}),c["default"].createElement("div",{className:(e.sidebar?"":"sidebar-hide")+" content"},this.props.children?this.props.children:c["default"].createElement(y["default"],null))),c["default"].createElement(p["default"],null))}}]),t}(l.Component);t["default"]=E},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=n(2),f=n(1),d=r(f);n(15);var p="1465987421552",h=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.state={title:"",content:"",time:"",tags:[],id:0},e}return i(t,e),u(t,[{key:"getData",value:function(){var e=this,t="./database/article/"+this.props.params.id+".json";fetch(t).then(function(e){return e.json()}).then(function(t){e.setState(t)})}},{key:"componentDidMount",value:function(){this.getData(),this.showLoveDays()}},{key:"del",value:function(){var e=this.state.id;return p==e?void d["default"].tips("文章不可删除"):void d["default"].alert("确认删除？",function(){fetch("./article/del?id="+e).then(function(e){return e.json()}).then(function(e){console.log("删除成功"),location.href="#/"})})}},{key:"rawHtml",value:function(e){return{__html:e}}},{key:"getToolBar",value:function(){var e="lingyansi.github.io";return e!=location.hostname?c["default"].createElement("div",{className:"details-tool"},c["default"].createElement("button",{onClick:this.del.bind(this)},"DEL"),c["default"].createElement(s.Link,{to:"/article/edit/"+this.state.id},c["default"].createElement("button",null,"编辑"))):null}},{key:"showLoveDays",value:function(){if(p==this.props.params.id){var e=Math.ceil((new Date-new Date("2016-03-28"))/864e5);d["default"].tips("距离2016-03-28武汉之行，过去了"+e+"天",5e3)}}},{key:"render",value:function(){var e=this.state;return document.body.scrollTop=0,c["default"].createElement("div",{id:"article-details"},c["default"].createElement("h1",null,e.title),c["default"].createElement("div",{className:"tags-wrap"},"标签：",e.tags.map(function(e){return c["default"].createElement("a",{href:"javascript:0;",className:"tag tag-pink cursor",key:e,title:e},e)})),this.getToolBar(),c["default"].createElement("div",{className:"details-content",dangerouslySetInnerHTML:this.rawHtml(e.content)}),c["default"].createElement("div",{className:"details-time"},"时间：",Utils.time.toString(e.time)))}}]),t}(l.Component);t["default"]=h},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=n(8),f=(r(s),n(2)),d=n(18),p=r(d);n(17);var h=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",null,c["default"].createElement("div",{className:"tool"},c["default"].createElement(f.Link,{to:"article/new"},c["default"].createElement("button",null,"新建")),c["default"].createElement("button",null,"管理")),c["default"].createElement(p["default"],null))}}]),t}(c["default"].Component);t["default"]=h},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=n(2);n(19);var f=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.state={list:[]},e}return i(t,e),u(t,[{key:"getList",value:function(){var e=this;fetch("./database/list.json").then(function(e){return e.json()}).then(function(t){e.setState({list:t.list})})}},{key:"componentDidMount",value:function(){this.getList()}},{key:"rawHtml",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return{__html:e}}},{key:"render",value:function(){var e=this,t=this.props.len,n=t?this.state.list.slice(0,t):this.state.list;return c["default"].createElement("div",{className:"article-list"},c["default"].createElement("ul",null,n.map(function(t){return c["default"].createElement("li",{key:t.id},c["default"].createElement(s.Link,{to:"/article/"+t.id},c["default"].createElement("h3",null,t.title),c["default"].createElement("div",{className:"summary",dangerouslySetInnerHTML:e.rawHtml(t.content)}),c["default"].createElement("p",{className:"bott"},c["default"].createElement("span",{className:"time"},Utils.time.toString(t.time)))))})))}}]),t}(l.Component);t["default"]=f},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=n(8);r(s),n(2);n(21);var f=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.state={title:"",content:"",tags:[]},e}return i(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this.props.params.id;void 0!==e&&this.getData(e),setTimeout(function(){$("#editor").wysiwyg()},1e3)}},{key:"componentWillUnmount",value:function(){$("#editor").remove()}},{key:"getData",value:function(e){var t=this;fetch("/database/article/"+e+".json").then(function(e){return e.json()}).then(function(e){t.setState(e)})}},{key:"submit",value:function(e){e.preventDefault();var t=new FormData(document.querySelector("#fd"));t.set("content",$("#editor").html());var n=this.state;for(var r in n)t.has(r)||t.set(r,n[r]);fetch("/newArticle",{method:"POST",body:t}).then(function(e){return e.json()}).then(function(e){console.log(e),location.href="#/"})}},{key:"rawHtml",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return{__html:e}}},{key:"render",value:function(){var e=this.state;return e.id||void 0==this.props.params.id?c["default"].createElement("div",{className:"article-new"},c["default"].createElement("form",{action:"/newArticle?name=ssss",method:"POST",id:"fd"},c["default"].createElement("input",{type:"text",name:"title",placeholder:"标题",defaultValue:e.title}),c["default"].createElement("br",null),c["default"].createElement("input",{type:"text",name:"tags",placeholder:"标签",defaultValue:e.tags.join(" ")}),c["default"].createElement("br",null),c["default"].createElement("div",{className:"btn-toolbar","data-role":"editor-toolbar","data-target":"#editor"},c["default"].createElement("a",{"data-edit":"bold",className:"btn"},"B"),c["default"].createElement("a",{"data-edit":"underline",className:"btn"},"_"),c["default"].createElement("input",{type:"text","data-edit":"createLink",placeholder:"插入url"}),c["default"].createElement("input",{type:"file","data-edit":"insertImage"})),c["default"].createElement("div",{id:"editor","data-placeholder":"fuck u please write sth ",dangerouslySetInnerHTML:this.rawHtml(e.content)}),c["default"].createElement("button",{type:"submit",onClick:this.submit.bind(this)},"提交"))):null}}]),t}(c["default"].Component);t["default"]=f},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l);n(23);var s=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{id:"footer"},"lingyansi.github.io about all right @2016")}}]),t}(l.Component);t["default"]=s},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l);n(25);var s=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props;return c["default"].createElement("div",{id:"header",className:e.sidebar?"":"sidebar-hide"},"灵岩寺")}}]),t}(l.Component);t["default"]=s},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(5),s=r(c),f=(n(2),n(18)),d=r(f),p=n(1),h=(r(p),n(4)),b=r(h),m=n(6),y=r(m);n(27);var v=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.state={tips:[{content:"硬汉 ⇨ 腰",url:"http://www.xiami.com/song/1772580840?spm=a1z1s.7154410.1996860142.3.7qJGVJ"},{content:"Crusade ⇨ Pentatonic",url:"http://www.xiami.com/song/1768980046?spm=a1z1s.7154410.1996860142.1.7qJGVJ"}],swipe:[1,2,3]},e}return i(t,e),l(t,[{key:"deleteSwipe",value:function(e){this.setState({swipe:this.state.swipe.filter(function(t){return t!=e})})}},{key:"tipsClose",value:function(e){var t=this.state.tips;t.splice(e,1),this.setState({tips:t})}},{key:"render",value:function(){var e=this,t=this.state;return s["default"].createElement("div",{id:"home"},t.swipe.map(function(t){var n=t/10+1;return s["default"].createElement(y["default"],{width:n,key:t},s["default"].createElement("div",{className:"text"},s["default"].createElement("div",{className:"fuck",style:{width:1/n*100+"%"}}),s["default"].createElement("div",{className:"side",onClick:e.deleteSwipe.bind(e,t)})))}),this.state.tips.map(function(t,n){return s["default"].createElement(b["default"],u({},t,{close:e.tipsClose.bind(e,n),key:t.url}))}),s["default"].createElement(d["default"],{len:0}))}}]),t}(c.Component);t["default"]=v},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=(n(2),function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{id:"notfound"},"404找不到页面")}}]),t}(l.Component));t["default"]=s},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),c=r(l),s=n(2);n(30);var f=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this)),n=[{url:"/",title:"首页"},{url:"/article",title:"文章"},{url:"/about",title:"关于"}];return e.state={list:n,current:0,avatar:"http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg"},e}return i(t,e),u(t,[{key:"hashChange",value:function(){var e=location.hash.slice(1),t=0;this.state.list.forEach(function(n,r){e.startsWith(n.url)&&(t=r)}),this.setState({current:t})}},{key:"addHashChange",value:function(){window.addEventListener("hashchange",this.hashChange.bind(this))}},{key:"componentDidMount",value:function(){this.hashChange(),this.addHashChange()}},{key:"render",value:function(){var e=this.state,t=this.props;return c["default"].createElement("div",{id:"sidebar",className:t.sidebar?"show":""},c["default"].createElement("button",{
className:t.sidebar?"show":"",onClick:t.handleSidebarChange},"三"),c["default"].createElement("div",{className:"sidebar-content"},c["default"].createElement("div",{className:"avatar",style:{backgroundImage:"url("+e.avatar+")"}}),c["default"].createElement("ul",null,e.list.map(function(t,n){return c["default"].createElement("li",{className:n==e.current?"current":"",key:t.url},c["default"].createElement(s.Link,{to:t.url},t.title))}))))}}]),t}(l.Component);t["default"]=f},function(e,t){}]);