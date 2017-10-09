/**
 * Created by Administrator on 2017/9/25.
 */
(function(){
    angular.module('app.service' ,[])
        .constant('ROOTURL' ,'http://101.200.58.3/librarywebapi/')

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

            this.upload = function(data){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'library/create',
                    params: data
                });
            };

            this.edit = function(data){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'library/update',
                    params: data
                });
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

            this.edit = function(data){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'member/update',
                    params: data
                });
            };
        }])

        .service('bookService' ,['$http' , 'ROOTURL' ,function($http ,ROOTURL){
            this.cateLists = function(){
                return $http.get(ROOTURL + 'category/list');
            };

            this.getPublisher = function(){
                return $http.get(ROOTURL + 'publisher/list');
            };

            this.getBookLists = function(obj){
                return $http({
                    method: 'get',
                    url: ROOTURL + 'book/list',
                    params: obj
                });
            };

            this.getBookSingle = function(obj){
                return $http({
                    method: 'get',
                    url: ROOTURL + 'book/single',
                    params: obj
                });
            };

            this.upload = function(fd){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'book/create',
                    data: fd,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                });
            };

            this.putaway = function(fd){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'book/putaway',
                    data: fd,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                });
            };

            this.editBook = function(fd){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'book/update',
                    data: fd,
                    headers:{'Content-Type': undefined},
                    transformRequest: angular.identity
                });
            };
        }])

        .service('orderService' ,['$http' , 'ROOTURL' ,function($http ,ROOTURL){
            this.lists = function(){
                return $http.get(ROOTURL + 'BorrowRecord/list');
            }
        }])

        .service('authorService' ,['$http' , 'ROOTURL' ,function($http ,ROOTURL){
            this.lists = function(){
                return $http({
                    method: 'get',
                    url: ROOTURL + 'author/list'
                });
            };

            this.upload = function(fd){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'author/create',
                    data: fd,
                    headers:{'Content-Type': undefined},
                    transformRequest: angular.identity,
                    uploadEventHandlers: {
                        progress: function(e){
                            console.log(e);
                        }
                    },
                    eventHandlers: {
                        progress: function(e){
                            console.log(e);
                        }
                    }
                });
            };

            this.find = function(itemId){
                return $http({
                    method: 'get',
                    url: ROOTURL + 'author/single',
                    params: itemId
                });
            };

            this.edit = function(fd){
                return $http({
                    method: 'post',
                    url: ROOTURL + 'author/update',
                    data: fd,
                    headers:{'Content-Type': undefined},
                    transformRequest: angular.identity
                });
            };
        }]);
})();