(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);

    angular.module('dipan').controller('header', header);
    header.$inject = ['$scope'];
    function header($scope){
       $scope.title = 'title111' ;
    }


    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$timeout'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $timeout, repBindOnce) {
//        $scope.aaabbb = 1;
//        $timeout(function(){
//            $scope.aaabbb = 11;
//        },4000);
//        $scope.b = '';
//        $scope.c = [1, 2, 3.4];

//        var content = angualr.element('bindonce');

//        $timeout(function () {
//            $scope.b = 2222;
//            $scope.c = [4, 5, 6];
////            repBindOnce('bindonce', $scope);
//        }, 2000);



    }


})();
