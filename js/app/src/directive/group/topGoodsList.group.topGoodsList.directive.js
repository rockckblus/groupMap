/**
 * topGoodsList.group.topGoodsList.directive.js
 * 命名注释：directive简称_topGoodsList. 父模块_group . 功能_ goods组合碎片， 类型_directive .js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').directive('topGoodsList', leftTop1);

    function leftTop1() {
        return {
            restrict: 'A',
            replace: false,
            templateUrl: 'html/src/group/topGoodsList.group.topGoodsList.directive.html',
            scope: {},
            controller: thisCtrl,
            link: function (scope, element, attr) {
                scope.element = element;
            }
        };
    }


    thisCtrl.$inject = ['$scope', '$timeout', 'group'];

    /** directive contorller 详细方法  */
    function thisCtrl($scope, $timeout, group) {
        $scope.list = '';//全部goods数据

        $scope.$on('allGoodsData', watchAllGoodsData);//监听group模型的rootScope事件 allGoodsData

        /**
         * 监听group模型的rootScope事件 allGoodsData
         * 给scope。list 数据，模板渲染
         * 16/2/17 */
        function watchAllGoodsData() {
            $timeout(function () {
                $scope.list = group.allGoodsData.list;
            }, 0, true);
        }


    }


})();

