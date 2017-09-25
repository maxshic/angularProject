/**
 * Created by Administrator on 2017/9/25.
 */
(function(){
    angular.module('app' ,['ngRoute' ,'app.controller' ,'app.directive'])
        .config(['$routeProvider' ,function($routeProvider){
            $routeProvider

                .when('/' ,{
                    templateUrl: 'view/home.html',
                    controller: 'homeController'
                })

                .when('/part' ,{
                    templateUrl: 'view/part.html',
                    controller: 'partController'
                })

                .when('/reader' ,{
                    templateUrl: 'view/reader.html',
                    controller: 'readerController'
                })

                .when('/book' ,{
                    templateUrl: 'view/book.html',
                    controller: 'bookController'
                })

                .when('/order' ,{
                    templateUrl: 'view/order.html',
                    controller: 'orderController'
                })

                .when('/addReader' ,{
                    templateUrl: 'view/addReader.html',
                    controller: 'addReaderController'
                })

                .when('/addPart' ,{
                    templateUrl: 'view/addPart.html',
                    controller: 'addPartController'
                });
        }]);
})();