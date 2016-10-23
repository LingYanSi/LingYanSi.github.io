var page = require('webpage').create();

//viewportSize being the actual size of the headless browser
page.viewportSize = { width: 1024, height: 768 };
//the clipRect is the portion of the page you are taking a screenshot of
// page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };
//the rest of the code is the same as the previous example

// 发起资源请求
page.onResourceRequested = function(request) {
  // console.log('Request ' + JSON.stringify(request, undefined, 4));
};

// 资源接收后
page.onResourceReceived = function(response) {
  // console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

// 响应evaluate中的console，并显示在控制台
page.onConsoleMessage = function(msg) {
  console.log('Page title is ' + msg);
};

page.open('http://lingyansi.space', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    // page.render('example.png');
  }

  page.evaluate(function(){
      //在这里面可以进行dom操作，执行js
      console.log(document.title)
      console.log(Utils)

      console.log(navigator.userAgent)

      setTimeout(function(){
          console.log('什么鬼呀', document.querySelector('.article-list').textContent)
      },5000)
  })

  // phantom.exit();
});

// 测试网络资源是否加载失败
// 测试是否有js执行报错
// 测试内容是否为空
// 当然业务方，可以自己写测试用例
// 对于比较复杂的东西，爬虫可能并不能做什么事情
// 页面出错后，对页面进行截图保存
