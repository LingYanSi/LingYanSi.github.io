var app = angular.module('app',['ui.router','appCtl','appSer','appDir']);

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

app.run(function($rootScope,$state,$stateParams){ // angular启动后会运行一次
    console.log($rootScope)
    $rootScope.daye = 1234 ;
})