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
                    templateUrl: 'view/part/part.html',
                    controller: 'partController'
                })

                .when('/reader' ,{
                    templateUrl: 'view/reader/reader.html',
                    controller: 'readerController'
                })

                .when('/book' ,{
                    templateUrl: 'view/book/book.html',
                    controller: 'bookController'
                })

                .when('/order' ,{
                    templateUrl: 'view/order.html',
                    controller: 'orderController'
                })

                .when('/addBook' ,{
                    templateUrl: 'view/book/addBook.html',
                    controller: 'addBookController'
                })

                .when('/addReader' ,{
                    templateUrl: 'view/reader/addReader.html',
                    controller: 'addReaderController'
                })

                .when('/addPart' ,{
                    templateUrl: 'view/part/addPart.html',
                    controller: 'addPartController'
                })

                .when('/editPart/:editItem' ,{
                    templateUrl: 'view/part/editPart.html',
                    controller: 'editPartController'
                })

                .when('/editReader/:editItem' ,{
                    templateUrl: 'view/reader/editReader.html',
                    controller: 'editReaderController'
                })

                .when('/author' ,{
                    templateUrl: 'view/author/author.html',
                    controller: 'authorController'
                })

                .when('/addAuthor' ,{
                    templateUrl: 'view/author/addAuthor.html',
                    controller: 'addAuthorController'
                })

                .when('/editAuthor/:itemId' ,{
                    templateUrl: 'view/author/editAuthor.html',
                    controller: 'editAuthorController'
                });
        }]);
})();