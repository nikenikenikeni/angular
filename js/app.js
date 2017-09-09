/**
 * Created by j on 2017/7/3.
 */
//写angular代码
(function (angular) {
    //创建模块
    var app=angular.module('movieApp',["ngRoute"]);
    //路由
    app.config(["$routeProvider",function ($routeProvider) {
        //配置路由
        $routeProvider
            //正在上映
            .when('/movie/in_theaters/:page?',{
                templateUrl:'./template/in_theatersTemplate.html',
                controller:'in_theatersCtrl'
            })
            //即将上映
            .when('/movie/coming_soon/:page?',{
                templateUrl:'./template/in_theatersTemplate.html',
                controller:'coming_soonCtrl'
            })
            //top250
            .when('/movie/top250/:page?',{
                templateUrl:'./template/in_theatersTemplate.html',
                controller:'top250Ctrl'
            })
            //搜索
            .when('/movie/search/:q/:page?',{
                templateUrl:'./template/in_theatersTemplate.html',
                controller:'searchCtrl'
            })
            //电影详细信息
            .when('/movie/subject/:id',{
                templateUrl:'./template/subjectTemplate.html',
                controller:'subjectCtrl'
            })
    }]);
    //服务
    app.service('jsonpService',function () {
        //jsonp服务
        this.getJsonp= function (url,data,cbFun) {
            // {
            //     start:0,
            //         count:5          =》start=0&count=5
            // }
            //拼接参数
            var params='';
            for(var key in data){
                params+=key+'='+data[key]+"&";
            }
            var jsonpname="jsonp_"+Math.random().toString().substring(6);
            window[jsonpname]=function (data) {
                cbFun(data);
            };
            //https://api.douban.com/v2/movie/in_theaters?start=0&count=5&callback=jsonp
            var script=document.createElement("script");
            script.src=url+'?'+params+'callback='+jsonpname;
            document.head.appendChild(script);
        }
    });
    //正在上映
    app.controller("in_theatersCtrl",["$scope","$routeParams","$location","jsonpService",function ($scope,$routeParams,$location,jsonpService) {
        //最大页数
        $scope.maxPage=0;
        //$location 和location类似
        //上翻一页
        $scope.upPage=function () {
            if($scope.page>1){
                $scope.page-=1;
                $location.path('/movie/in_theaters/'+ $scope.page)
            }

        };
        //下翻一页
        $scope.downPage=function () {
            if($scope.page<$scope.maxPage){
                $scope.page+=1;
                $location.path('/movie/in_theaters/'+ $scope.page)
            }

        };
        //当前页面
        $scope.page=parseInt($routeParams.page||"1");
        //提示
        $scope.movieData={
            title:'正在加载请稍后'
        };
        //正在上映的URL
        //https://api.douban.com/v2/movie/in_theaters?start=0&count=5
        var url='https://api.douban.com/v2/movie/in_theaters';
        //通过服务请求数据
        jsonpService.getJsonp(url,{
            start:($scope.page-1)*5,
                count:5
        },function (data) {
            //获取数据
            $scope.movieData=data;
            $scope.maxPage=Math.ceil($scope.movieData.total/5);
            //$scope更新页面
            $scope.$apply();
        })
    }])
     //即将上映
    app.controller("coming_soonCtrl",["$scope","$routeParams","$location","jsonpService",function ($scope,$routeParams,$location,jsonpService) {
        //最大页数
        $scope.maxPage=0;
        //$location 和location类似
        //上翻一页
        $scope.upPage=function () {
            if($scope.page>1){
                $scope.page-=1;
                $location.path('/movie/coming_soon/'+ $scope.page)
            }

        };
        //下翻一页
        $scope.downPage=function () {
            if($scope.page<$scope.maxPage){
                $scope.page+=1;
                $location.path('/movie/coming_soon/'+ $scope.page)
            }

        };
        //当前页面
        $scope.page=parseInt($routeParams.page||"1");
        //提示
        $scope.movieData={
            title:'正在加载请稍后'
        };
        //正在上映的URL
        //https://api.douban.com/v2/movie/in_theaters?start=0&count=5
        var url='https://api.douban.com/v2/movie/coming_soon';
        //通过服务请求数据
        jsonpService.getJsonp(url,{
            start:($scope.page-1)*5,
            count:5
        },function (data) {
            //获取数据
            $scope.movieData=data;
            $scope.maxPage=Math.ceil($scope.movieData.total/5);
            //$scope更新页面
            $scope.$apply();
        })
    }]);
    //top250
    app.controller("top250Ctrl",["$scope","$routeParams","$location","jsonpService",function ($scope,$routeParams,$location,jsonpService) {
        //最大页数
        $scope.maxPage=0;
        //$location 和location类似
        //上翻一页
        $scope.upPage=function () {
            if($scope.page>1){
                $scope.page-=1;
                $location.path('/movie/top250/'+ $scope.page)
            }

        };
        //下翻一页
        $scope.downPage=function () {
            if($scope.page<$scope.maxPage){
                $scope.page+=1;
                $location.path('/movie/top250/'+ $scope.page)
            }

        };
        //当前页面
        $scope.page=parseInt($routeParams.page||"1");
        //提示
        $scope.movieData={
            title:'正在加载请稍后'
        };
        //正在上映的URL
        //https://api.douban.com/v2/movie/in_theaters?start=0&count=5
        var url='https://api.douban.com/v2/movie/top250';
        //通过服务请求数据
        jsonpService.getJsonp(url,{
            start:($scope.page-1)*5,
            count:5
        },function (data) {
            //获取数据
            $scope.movieData=data;
            $scope.maxPage=Math.ceil($scope.movieData.total/5);
            //$scope更新页面
            $scope.$apply();
        })
    }]);
    //搜索
    app.controller("searchCtrl",["$scope","$routeParams","$location","jsonpService",function ($scope,$routeParams,$location,jsonpService) {
        //最大页数
        $scope.maxPage=0;
        //$location 和location类似
        //上翻一页
        $scope.upPage=function () {
            if($scope.page>1){
                $scope.page-=1;
                $location.path('/movie/search/'+$routeParams.q+'/'+ $scope.page)
            }

        };
        //下翻一页
        $scope.downPage=function () {
            if($scope.page<$scope.maxPage){
                $scope.page+=1;
                $location.path('/movie/search/'+$routeParams.q+'/'+ $scope.page)
            }

        };
        //当前页面
        $scope.page=parseInt($routeParams.page||"1");
        //提示
        $scope.movieData={
            title:'正在加载请稍后'
        };
        //正在上映的URL
        //https://api.douban.com/v2/movie/in_theaters?start=0&count=5
        var url='https://api.douban.com/v2/movie/search';
        //通过服务请求数据
        jsonpService.getJsonp(url,{
            start:($scope.page-1)*5,
            count:5,
            q:$routeParams.q //搜索数据
        },function (data) {
            //获取数据
            $scope.movieData=data;
            $scope.maxPage=Math.ceil($scope.movieData.total/5);
            //$scope更新页面
            $scope.$apply();
        })
    }]);
    //电影详细信息
    app.controller('subjectCtrl',["$scope","$routeParams","jsonpService",function ($scope,$routeParams,jsonpService) {
        //$routeParams获取到了id
       // $scope.test=$routeParams.id;
        //电影详细信息
        //url https://api.douban.com/v2/movie/subject/25824686
        var url='https://api.douban.com/v2/movie/subject/'+$routeParams.id;
        jsonpService.getJsonp(url,{},function (data) {
            $scope.subject=data;
            $scope.$apply();
        })
    }])
    //处理搜索文字的控制器
    app.controller("searchTextCtrl",["$scope","$location",function ($scope,$location) {
        //搜索
        $scope.search=function () {
            //不为空的时候搜索内容
            if($scope.searchText){
                //  movie/search/张艺谋  /movie/search/:q
                $location.path('/movie/search/'+$scope.searchText)
            }
        }
    }])
})(angular);