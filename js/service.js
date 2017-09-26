/**
 * Created by Administrator on 2017/9/25.
 */
(function(){
    angular.module('app.service' ,[])
        .constant('ROOTURL' ,'http://192.168.9.100/librarywebapi/')
        .service('homeService' ,['$http' ,function($http){
            this.lists = function(){
                return $http.get();
            }
        }])
        .service('partService' ,['$http' , 'ROOTURL' ,function($http ,ROOTURL){
            this.lists = function(data){
                return $http({
                    method: 'get',
                    url: ROOTURL + 'library/list',
                    params: data
                });
            };

            this.region = function(){
                return $http.get(ROOTURL + 'region/list');
            };
        }])
        .service('readerService' ,['$http' , 'ROOTURL' ,function($http ,ROOTURL){

            this.lists = function(data){
                return $http({
                    method: 'get',
                    url: ROOTURL + 'member/list',
                    params: data
                });
            };

            this.upload = function(params){
                return $http({
                    method: 'post',
                    url : ROOTURL + 'member/create',
                    data: params,
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (data) {
                        return $.param(data);
                    }
                });
            };
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