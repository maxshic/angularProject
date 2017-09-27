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
                //console.log(response.data);
                $scope.libraryLists = response.data.Data;
            });

            partService.region().then(function(response){
                //console.log(response.data);
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
                //console.log($scope.itemId);
                //console.log($scope.keyword);
                partService.lists({regionId:$scope.itemId,name:$scope.keyword}).then(function(response){
                    $scope.libraryLists = response.data.Data;
                });
            };

            $scope.addPart = function(){
                $location.path('/addPart');
            };

            $scope.edit = function(id){
                $location.path();
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

        .controller('editReaderController' ,['$scope' , '$location' , 'readerService' , '$routeParams' ,function($scope , $location ,readerService ,$routeParams){
            $scope.title = '修改';
            $scope.items = JSON.parse($routeParams.editItem);
            //console.log(JSON.parse($routeParams.editItem));

            $scope.upload = function(){
                readerService.edit($scope.items).then(function(response){
                    //console.log(response);
                    if(response.data.Code == 100){
                        $location.path('/reader');
                    }
                });
            };

        }])

        .controller('addPartController' ,['$scope' , 'partService' , '$location' ,function($scope ,partService ,$location){
            $scope.title = '添加';
            $scope.regionLists = [];
            $scope.regionId = '';
            $scope.part = {
                name: '',
                address: '',
                contactPhone: '',
                regionId: '',
                introduce: '',
                longitude: '',
                latitude: ''
            };
            $scope.isInvalid = false;

            partService.region().then(function(response){
                console.log(response);
                $scope.regionLists = response.data.Data;
            });

            $scope.upload = function(){
                if($scope.frm.$valid){
                    console.log('success!');

                    console.log($scope.part);

                    partService.upload($scope.part).then(function(response){
                        console.log(response);
                        if(response.data.Code == 100){
                            $location.path('/part');
                        }
                    });
                }else{
                    $scope.isInvalid = true;
                }
            };

        }])

        .controller('editPartController' ,['$scope' , '$location' , 'partService' , '$routeParams' ,function($scope, $location , partService ,$routeParams){
            $scope.title = '修改';
            $scope.items = JSON.parse($routeParams.editItem);
            //console.log(JSON.parse($routeParams.editItem));

            $scope.upload = function(){
                //console.log('123');
                partService.edit($scope.items).then(function(response){
                    //console.log(response);
                    if(response.data.Code == 100){
                        $location.path('/part');
                    }
                });
            };
        }])

        .controller('authorController' ,['$scope' , 'authorService' ,function($scope ,authorService){

            $scope.title = '作者';
            $scope.authorLists = [];

            authorService.lists().then(function(response){
                //console.log(response);
                $scope.authorLists = response.data.Data;
            });

        }])

        .controller('addAuthorController' ,['$scope' , 'authorService' ,function($scope ,authorService){

            $scope.title = '添加';
            $scope.author = {
                name: '',
                introduce: ''
            };

            var reader = new FileReader();

            $('#fileIpt').change(function(){
                //console.log('123');
                reader.readAsDataURL($('#fileIpt')[0].files[0]);
                reader.onload = function(e){
                    $('#fileImg').attr('src' , e.target.result);
                };
            });

            $scope.upload = function(){
                var formData = new FormData();
                var file = document.querySelector('#fileIpt').files[0];
                formData.append('header' ,file);
                formData.append('name' ,$scope.author.name);
                formData.append('introduce' ,$scope.author.introduce);
                console.log(formData);
                authorService.upload(formData).then(function(response){
                    console.log(response);
                });
            };

        }])

        .controller('editAuthorController' ,['$scope' , '$location' , '$routeParams' , 'authorService' ,function($scope ,$location ,$routeParams ,authorService){

            $scope.title = '修改';
            $scope.author = {};
            var reader = new FileReader();

            $('#eFileIpt').change(function(){
                reader.readAsDataURL($('#eFileIpt')[0].files[0]);
                reader.onload = function(e){
                    $('#eFileImg').attr('src' , e.target.result);
                };
            });

            authorService.find({Id : $routeParams.itemId}).then(function(response){
                console.log(response);
                $scope.author = response.data.Data;
            });

            $scope.upload = function(){
                var formData = new FormData();
                formData.append('Id' ,$routeParams.itemId);
                formData.append('name' ,$scope.author.Name);
                formData.append('introduce' ,$scope.author.Introduce);
                formData.append('header' ,document.querySelector('#eFileIpt').files[0]);

                authorService.edit(formData).then(function(response){
                    //console.log(response);
                    if(response.data.Code == 100){
                        $location.path('/author');
                    }
                });
            };

        }]);
})();