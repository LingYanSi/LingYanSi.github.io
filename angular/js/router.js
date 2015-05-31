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
        },
        controller:function(){
            alert(id)
        }
    })
});

app.controller('bookList',['$scope','$http','$state','$stateParams',function($scope,$http,$state,$stateParams){
    $http.get('json/list.json').success(function(data){
        $scope.list = data.list
    })
    console.log($stateParams.id) //可获取路由变化
}])