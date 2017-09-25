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
        }])
        .controller('readerController' ,['$scope' , 'readerService' ,function($scope ,readerService){
            $scope.title = '读者';
            $scope.readerLists = [];
            readerService.lists().then(function(response){
                console.log(response.data);
                $scope.readerLists = response.data;
            });
        }])
        .controller('bookController' ,['$scope' , 'bookService' ,function($scope ,bookService){
            $scope.title = '图书';
        }])
        .controller('orderController' ,['$scope' , 'orderService' ,function($scope ,orderService){
            $scope.title = '订单';
        }]);
})();