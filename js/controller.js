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

        .controller('bookController' ,['$scope' , 'bookService' , 'partService' ,function($scope ,bookService ,partService){

            $scope.title = '图书';
            $scope.bookCates = [];
            $scope.publishers = [];
            $scope.bookLists = [];
            $scope.partLists = [];
            $scope.importBook = {};
            $scope.isShow = false;
            $scope.showNull = false;
            $scope.isShowModal = false;
            $scope.keyPub = '';
            $scope.pubId = '';
            $scope.cate = '';
            $scope.keyword = '';

            bookService.cateLists().then(function(response){
                console.log(response);
                $scope.bookCates = response.data.Data;
                $scope.bookCates.unshift({
                    Id: '',
                    Name: '全部'
                });
            });

            $scope.showDia = function($event){
                //console.log($($event.target).offset());
                var x = $($event.target).offset().top;
                //var y = $($event.target).offset().left;
                //console.log($event.clientX);
                //console.log($($event.target).offset().left);
                var y = $($event.target).offset().left;
                $scope.isShow = true;
                $('#popover').css({
                    //position: 'fixed',
                    //display: 'block',
                    left: y - 380 + 'px',//y - 390 + 'px',
                    top: x -15 + 'px'
                });

                bookService.getPublisher().then(function(response){
                    //console.log(response);
                    $scope.publishers = response.data.Data;
                });
            };

            bookService.getBookLists().then(function(response){
                console.log(response);
                if(response.data.Code == 100){
                    $scope.bookLists = response.data.Data;
                }
                if($scope.bookLists.length == 0){
                    $scope.showNull = true;
                }else{
                    $scope.showNull = false;
                }

            });

            $scope.choosePub = function(itemName ,itemId){
                $scope.keyPub = itemName;
                $scope.pubId = itemId;
                $scope.isShow = false;
                $('#key').focus();
            };

            $scope.clear = function(){
                $scope.cate = '';
                $scope.pubId = '';
                $scope.keyword = '';
                $scope.keyPub = '';

                bookService.getBookLists().then(function(response){
                    console.log(response);
                    if(response.data.Code == 100){
                        $scope.bookLists = response.data.Data;
                    }
                    if($scope.bookLists.length == 0){
                        $scope.showNull = true;
                    }else{
                        $scope.showNull = false;
                    }

                });
            };

            $scope.search = function(){
                //console.log('123');
                bookService.getBookLists({categoryId:$scope.cate,publisherId:$scope.pubId,keyword:$scope.keyword}).then(function(response){
                    console.log(response);
                    if(response.data.Code == 100){
                        $scope.bookLists = response.data.Data;
                    }
                    if($scope.bookLists.length == 0){
                        $scope.showNull = true;
                    }else{
                        $scope.showNull = false;
                    }

                });
            };

            $scope.showModal = function(bookId){
                $scope.isShowModal = true;
                console.log(bookId);
                bookService.getBookSingle({id:bookId}).then(function(response){
                    console.log(response);
                    $scope.importBook = response.data.Data;
                });
            };

            $scope.dismissModal = function(){
                $scope.isShowModal = false;
            };

            partService.lists().then(function(response){
                console.log(response);
                $scope.partLists = response.data.Data;
            });

            $('#importBookBtn').click(function(){
                $('#diaForm').submit();
            });

            $scope.uploadModal = function(){
                console.log('dia');
            };



        }])

        .controller('addBookController' ,['$scope' , 'bookService' , 'authorService' , '$location' ,function($scope ,bookService ,authorService ,$location){
            $scope.title = '添加';
            $scope.authorLists = [];
            $scope.bookCates = [];
            $scope.publishers = [];
            $scope.isInvalid = false;
            $scope.book = {
                name: '',
                authorId: '',
                isbn: '',
                publishDate: '',
                categoryId: '',
                publisherId: '',
                introduce: '',
                image: ''
            };

            var reader = new FileReader();

            $('#bFileIpt').change(function(){
                //console.log('123');
                reader.readAsDataURL($('#bFileIpt')[0].files[0]);
                reader.onload = function(e){
                    $('#bFileImg').attr('src' , e.target.result);
                };
            });

            authorService.lists().then(function(response){
                $scope.authorLists = response.data.Data;
                //console.log($scope.authorLists);
            });

            bookService.cateLists().then(function(response){
                $scope.bookCates = response.data.Data;
                //console.log(response.data.Data);
            });

            bookService.getPublisher().then(function(response){
                $scope.publishers = response.data.Data;
                console.log(response.data.Data);
            });

            $scope.upload = function(){
                if($scope.frm.$valid){
                    $scope.book.image = $('#bFileIpt')[0].files[0];
                    var formData = new FormData();
                    formData.append('name' ,$scope.book.name);
                    formData.append('authorId' ,$scope.book.authorId);
                    formData.append('isbn' ,$scope.book.isbn);
                    formData.append('publishDate' ,$scope.book.publishDate);
                    formData.append('categoryId' ,$scope.book.categoryId);
                    formData.append('publisherId' ,$scope.book.publisherId);
                    formData.append('introduce' ,$scope.book.introduce);
                    formData.append('image' ,$scope.book.image);
                    console.log($scope.book);
                    bookService.upload(formData).then(function(response){
                        //console.log(response);
                        if(response.data.Code == 100){
                            $location.path('/book');
                        }
                    });
                }else{
                    $scope.isInvalid = true;
                }



            };


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

           /* $scope.loadAll = function(){
                $('[data-toggle="popover"]').popover();
            };*/



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