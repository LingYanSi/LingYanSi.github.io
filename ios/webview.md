
- 接管请求
- js可与应用交互 jsBrige
- 前进，后退，刷新
- 弹出提示信息
- 使用本地html文件
- 自定义userAgent
- 下拉刷新

### WKWebView
WKWebView默认是关闭alert confirm的，需要手动开启
WKWebView可以加载本地js,是在页面引用js加载前注入页面的【这个功能最赞】，可以把静态文件放进去（zepto/vue/app.js等）
WKWebView的性能要好一些
WKWebView的使用，需要在头部引入 import WebKit
