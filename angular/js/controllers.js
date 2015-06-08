var appCtl = angular.module('appCtl',[]); // 类似于requirejs的不同模块，在这里算是定义了appCtl模块，然后再app.js中声明依赖此模块

// controller中不要进行dom操作，应该在drective指令中进行，controller中只应该进行业务逻辑的操作

// 内联实注入，参数名称是可以和前面的注入对象不一样的，因为他们是一一对应的关系
appCtl.controller('bookList',['$scope','$http','$state','$stateParams','$rootScope','$injector',function($scope,$http,$state,$stateParams,$rootScope,$injector){
    $http.get('json/'+ $stateParams.id +'.json').success(function(data){
        $scope.list = data.list
    })
    console.log($stateParams.id) //可获取路由变化
    $scope.num = $stateParams.id ;
    /*$scope.$watch('num',function(newVal,oldVal){ //用于监听数据变化，其实感觉angular是数据驱动型的框架，jquery算是事件驱动型
        console.log(newVal,oldVal) // 函数有两个参数，【新值、旧值】
    });
*/
    console.log($rootScope.daye)

    $scope.filte = function(){
        console.log(11111)
    }

    $injector.invoke(function(game){ // 注入game，game就是服务service提供的，其实$scope,$http之类的都是使用这种方法注入的，那是不是说$scope之类的也是一个服务/provider
        console.log($injector,'我是game',game.name);
        game.run();
        console.log('我是参数',$injector.annotate(function(arg1,arg2){})) // $injector.annotate用来分析函数，获取其参数
    })
}]);

// 推断型注入
// app.controller('bookList',function($scope,$http,$state,$stateParams,$rootScope){
        // 推断型注入:函数的参数名称必须要和被注入的对象相同
        // 弊端在于在使用，代码混淆的时候会把参数名会被替换
// })

// 声明式注入
// var ctl = function(do){
//     do.name = '陈莹'
// }
// // app.$inject = ['$scope'] ;  
// app.controller('bookList',ctl)

appCtl.controller('test',['$scope',function($scope){
    $scope.run = function(){
        console.log('飞起来了')
    }
}]);

appCtl.controller('parent',['$scope',function($scope){
    $scope.name = "完颜康"
}]);

appCtl.controller('child',['$scope',function($scope){
    $scope.name = "完颜康" ;
    $scope.lu = "进球了"
    $scope.resetName = function(){
        $scope.name = "猪八戒" ;
        console.log('你是谁')
    } ;
}])
