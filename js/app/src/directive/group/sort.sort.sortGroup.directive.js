/**
 * sort.sort.sortGroup.directive.js
 * 命名注释：directive简称_sort. 父模块_sort . 功能_ 排序碎片， 类型_directive .js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('sort.dipan.sort.module').directive('sort', sort);

    function sort() {
        return {
            restrict: 'A',
            replace: false,
            templateUrl: 'html/src/group/sort.sort.sortGroup.html',
            scope: {},
            controller: thisCtrl,
            link: function (scope, element, attr) {
                scope.element = element;
                scope.attr = attr;
            }
        };
    }


    thisCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'group'];

    /** directive contorller 详细方法  */
    function thisCtrl($scope, $rootScope, $timeout, group) {

        $scope.thisLineId = '';
        $scope.show = false;
        $scope.todos = [];
        $scope.name = '';
        $scope.$on('changeLeftTop1', function () {
            $timeout(function () {
                $scope.todos = group.getLineGoods();
                $scope.name = group.getLineName(group.thisItemId);
                $scope.thisLineId = group.thisItemId;
            }, 0);
        });

        $scope.$on('showSort', function () {
            $scope.show = true;
        });

        $scope.$watchCollection('todos', function () {
            $rootScope.$broadcast('allGoodsData');
        });

        $scope.sortableConfig = { group: 'todo', animation: 150 };
        'Start End Add Update Remove Sort'.split(' ').forEach(function (name) {
//            $scope.sortableConfig['on' + name] = console.log.bind(console, name);
        });
    }


})();

