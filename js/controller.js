/**
 * Created by Administrator on 2017/9/25.
 */
(function(){
    angular.module('app.controller',['app.service'])

        .controller('homeController' ,['$scope' , 'homeService' ,function($scope ,homeService){

            $scope.title = '主页';

        }])

        .controller('partController' ,['$scope' , '$location' , 'partService' , '$http' ,function($scope ,$location ,partService ,$http){

            $scope.title = '分馆';
            $scope.libraryLists = [];
            $scope.regionLists = [];
            $scope.itemId = '';
            $scope.keyword = '';

            partService.lists().then(function(response){
                console.log(response.data);
                $scope.libraryLists = response.data.Data;
            });

            partService.region().then(function(response){
                console.log(response.data);
                $scope.regionLists = response.data.Data;
                $scope.regionLists.unshift({
                    Id: '',
                    Name: '所有区'
                });
            });

            $scope.changeId = function(id){
                $scope.itemId = id;
                //console.log($scope.itemId);
            };

            $scope.search = function(){
                console.log($scope.itemId);
                console.log($scope.keyword);
                partService.lists({regionId:$scope.itemId,name:$scope.keyword}).then(function(response){
                    $scope.libraryLists = response.data.Data;
                });
            };

            $scope.addPart = function(){
                $location.path('/addPart');
            };

        }])

        .controller('readerController' ,['$scope' , '$location' , 'readerService' ,function($scope , $location ,readerService){

            $scope.title = '读者';
            $scope.keyword = '';
            $scope.readerLists = [];
            $scope.temp = [];

            readerService.lists({}).then(function(response){
                console.log(response.data);
                $scope.readerLists = response.data.Data;
                //$scope.temp = Array.from($scope.readerLists);
            });

            $scope.toAddReader = function(){
                $location.path('/addReader');
            };

            $scope.search = function(){
                readerService.lists({keyword : $scope.keyword}).then(function(response){
                    console.log(response.data);
                    $scope.readerLists = response.data.Data;
                    //$scope.temp = Array.from($scope.readerLists);
                });
            };


        }])

        .controller('bookController' ,['$scope' , 'bookService' ,function($scope ,bookService){

            $scope.title = '图书';


        }])

        .controller('orderController' ,['$scope' , 'orderService' ,function($scope ,orderService){

            $scope.title = '订单';

        }])

        .controller('addReaderController' ,['$scope' , 'readerService' ,function($scope ,readerService){

            $scope.title = '添加';

            $scope.reader = {
                name : '',
                cardId :'',
                phone : '',
                address : '',
                libraryId: ''
            };

            $scope.isInvalid = false;

            $scope.upload = function(){
                if($scope.frm.$valid){

                    console.log($scope.reader);
                    readerService.upload($scope.reader).then(function(response){
                        console.log(response);
                    });
                    console.log('success!');
                }else{
                    $scope.isInvalid = true;
                }
            };



        }])

        .controller('addPartController' ,['$scope' ,function($scope){
            $scope.title = '添加';


        }]);
})();