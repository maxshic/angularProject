/**
 * Created by Administrator on 2017/9/25.
 */
(function(){
    angular.module('app.controller',['app.service'])

        .controller('homeController' ,['$scope' , 'homeService' ,function($scope ,homeService){

            $scope.title = '主页';

        }])

        .controller('partController' ,['$scope' , 'partService' ,function($scope ,partService){

            $scope.title = '分馆';

            $scope.libraryLists = [];

            partService.lists().then(function(response){
                console.log(response.data);
                $scope.libraryLists = response.data;
            });

        }])

        .controller('readerController' ,['$scope' , '$location' , 'readerService' ,function($scope , $location ,readerService){

            $scope.title = '读者';

            $scope.keyword = '';

            $scope.readerLists = [];

            readerService.lists().then(function(response){
                //console.log(response.data);
                $scope.readerLists = response.data;
            });

            $scope.toAddReader = function(){
                $location.path('/addReader');
            };

            $scope.search = function(){
                console.log('123');
            };

        }])

        .controller('bookController' ,['$scope' , 'bookService' ,function($scope ,bookService){

            $scope.title = '图书';

        }])

        .controller('orderController' ,['$scope' , 'orderService' ,function($scope ,orderService){

            $scope.title = '订单';

        }])

        .controller('addReaderController' ,['$scope' ,function($scope){

            $scope.title = '添加';

            $scope.reader = {
                name : '',
                cardId :'',
                phone : '',
                address : ''
            };

            $scope.isInvalid = false;

            $scope.upload = function(){
                if($scope.frm.$valid){
                    console.log('success!');
                }else{
                    $scope.isInvalid = true;
                }
            };

        }]);
})();