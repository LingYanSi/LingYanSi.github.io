## SPA

### 异步任务
在单页面开发中，因为没有了浏览器重新加载页面，会导致一些错误出现，有的错误是可以容忍的，而有些则是显得不可容忍

ajax/seTimeout/setInterval/Promise
在异步任务结束之前，组件被卸载，如何把异步任务也给终结掉？ 其实也没有关系因为是异步的，错误并不会阻塞有用的进程，需要注意的是setInterval

对于react组件来说，js/html是私有的 css有两种：require/import进来的，inlinecss

从某种角度来讲，我希望 html/js/css 是同存亡的

组件加载的顺序是 js --> css --> html
组件卸载的顺序是 css --> html --> js
