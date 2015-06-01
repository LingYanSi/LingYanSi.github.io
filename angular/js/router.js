var app = angular.module('app',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index',{
        url:'/index' ,
        views:{
            '':{
                templateUrl:'template/other.html'
            }
        }       
    }).state('book',{
        url:'/book/{id}' ,
        views:{
            '':{
                templateUrl:'template/book.html'
            } 
        }
    })
});

app.controller('bookList',['$scope','$http','$state','$stateParams','$rootScope',function($scope,$http,$state,$stateParams,$rootScope){
    $http.get('json/'+ $stateParams.id +'.json').success(function(data){
        $scope.list = data.list
    })
    console.log($stateParams.id) //可获取路由变化
    $scope.num = $stateParams.id ;
    $scope.$watch('num',function(newVal,oldVal){ //用于监听数据变化，其实感觉angular是数据驱动型的框架，jquery算是事件驱动型
        console.log(newVal,oldVal) // 函数有两个参数，【新值、旧值】
    });

    console.log($rootScope.daye)

    $scope.filte = function(){
        console.log(11111)
    }
}]);

app.run(function($rootScope,$state,$stateParams){ // angular启动后会运行一次
    console.log($rootScope)
    $rootScope.daye = 1234 ;
})