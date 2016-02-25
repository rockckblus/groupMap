/**
 * search.group.search.directive.js
 * 命名注释：directive简称_search. 父模块_group . 功能_搜素. 类型_directive .js
 * 1:变换当前点击线路的thisItem
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').directive('search', search);

    function search() {
        return {
            restrict: 'A',
            replace: false,
            controller: thisCtrl,

            link: function (scope, element, attr) {
            }
        };
    }

    thisCtrl.$inject = ['$scope', '$rootScope', '$timeout' , 'group', 'tools'];

    function thisCtrl($scope, $rootScope, $timeout, group, tools) {

        $scope.search = '';//搜素模型

        $scope.$watch('search', function (e) {
            group.search(e);
        });
        /**********************
         * 方法详情
         * 16/2/17 */
        /********************
         *
         */

    }

})();

