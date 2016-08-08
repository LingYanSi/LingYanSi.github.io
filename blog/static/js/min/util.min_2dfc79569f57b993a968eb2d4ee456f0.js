"use strict";var Queue=function(t){var e=arguments.length<=1||void 0===arguments[1]?0:arguments[1];this.queue=[],this.fn=t;var o=this;this.tick=function(){this.queue.forEach(clearTimeout),this.queue.push(setTimeout(function(){o.fn()},e))}},Utils={time:{toString:function(t){var e=new Date((+t));return e.getFullYear()+"-"+this.fillZero(e.getMonth()+1)+"-"+this.fillZero(e.getDate())+" "+this.fillZero(e.getHours())+":"+this.fillZero(e.getMinutes())+":"+this.fillZero(e.getSeconds())},fillZero:function(t){return t<10?"0"+t:""+t}},lastPosition:{set:function(t,e){var o=Utils.getSessionStorage("lastPosition");o[t]=e,Utils.setSessionStorage("lastPosition",o)},get:function(t){var e=Utils.getSessionStorage("lastPosition"),o=e[t]||{};return o}},getSessionStorage:function(t){var e=window.sessionStorage.getItem(t)||"{}";try{e=JSON.parse(e)}catch(o){e={}}return e},setSessionStorage:function(t,e){window.sessionStorage.setItem(t,JSON.stringify(e))},scroll:function(){var t={},e=function(){console.log(t);for(var e in t)t[e]&&t[e]()},o=new Queue(e,50);window.addEventListener("scroll",function(){o.tick()});var n={listen:function(e,o){return t[e]=o,{detory:function(){n.remove(e)},key:e}},remove:function(e){delete t[e]},trigger:e};return n}(),loadAsyn:function(t){var e=t.dataset,o=e.lazyImg;if(o)return{type:"layzImg",url:o};var n=e.lazyBgd;if(n)return{type:"lazyBgd",url:n};var r=e.lazyPoster;return r?{type:"lazyPoster",url:r}:void 0},setSrc:function(t,e){switch(console.log(e.type),e.type){case"layzImg":t.src=e.url;break;case"lazyBgd":t.style.backgroundImage="url("+e.url+")";break;case"lazyPoster":t.poster=e.url}},loadImage:function(){var t=this,e=Array.from(document.querySelectorAll(".lazy-load-img"));e.length&&e.some(function(e){var o=t.loadAsyn(e),n=o.url;if(n&&!(e.getBoundingClientRect().top<-e.clientHeight)){if(e.getBoundingClientRect().top>window.innerHeight)return!0;var r=new Image;r.onload=r.onerror=r.onabort=function(){r.onload=r.onerror=r.onabort=null,r=null,t.setSrc(e,o),e.classList.remove("lazy-load-img")},r.src=n,(r["with"]||r.height||r.complete)&&(r.onload=r.onerror=r.onabort=null,r=null,t.setSrc(e,o),e.classList.remove(".lazy-load-img"))}})}};Utils.scroll.listen("lazy-load-img",Utils.loadImage.bind(Utils));