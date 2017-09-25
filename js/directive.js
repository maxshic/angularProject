/**
 * Created by Administrator on 2017/9/25.
 */
(function(){
    angular.module('app.directive' ,[])
        .directive('scReader' ,function(){
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: 'template/readerItem.html',
                scope: {
                    readers: '='
                }
            };
        });
})();