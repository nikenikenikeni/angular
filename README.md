# jsonp原理

- 通过自动创建出script标签，通过src属性访问跨域服务器，获取到jsonp格式数据。在jsonp获取之前需要有一个全局的函数用来接收jsonp的数据

## jsonp要求

- 1.必须是全局的function
- 2. function的名字需要和jsonp的名字符合才行
- 3. 需要配合script标签一起跨域使用才可以

# angular 的jsonp

- 在angular中通过$http.jsonp去支持jsonp跨域但是这种跨域不支持豆瓣的字符（.），自己创建jsonp跨域

# angular的服务

- 服务：将常用的方法或者属性进行封装，对原有angular的服务可以自己二次封装

- 创建一个服务

```javascript
 var app=angular.module('myApp',[]);
    //service 通过这个方法创建angular的服务
    app.service("myServcie",function () {
        this.name='这是第一个服务';
        this.add=function (a,b) {
            return a+b
        }
    });
```

- 使用一个服务

```javascript
 //通过服务名称来使用服务,在angular中这种服务将交给angular实例化，使用的过程中不需要new
    app.controller("myCtrl",function ($scope,myServcie) {
        console.log(myServcie.name);
        console.log(myServcie.add(100, 100));
    })
```

# 写企业代码

1. angularjsonp测试
2. angularjsonp测试不通过想别的办法
3. 自己封装jsonp
4. 通过服务的方式封装自定义方法
5. 通过测试检验封装服务
6. 正真将服务添加到真实项目中

# 写豆瓣电影angular步骤

1. 引用angular，angular-route
2. 创建模块 引入ngRoute
3. 创建路由
4. 根据路由创建模板、控制器 相对应的服务
5. 测试