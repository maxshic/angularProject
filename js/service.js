/**
 * Created by Administrator on 2017/9/25.
 */
(function(){
    angular.module('app.service' ,[])
        .service('homeService' ,['$http' ,function($http){
            this.lists = function(){
                return $http.get();
            }
        }])
        .service('partService' ,['$http' ,function($http){
            this.lists = function(){
                return $http.get();
            }
        }])
        .service('readerService' ,['$http' ,function($http){
            this.lists = function(){
                return $http.get('res/reader.json');
            }
        }])
        .service('bookService' ,['$http' ,function($http){
            this.lists = function(){
                return $http.get();
            }
        }])
        .service('orderService' ,['$http' ,function($http){
            this.lists = function(){
                return $http.get();
            }
        }]);
})();