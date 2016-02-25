/**
 * leftTop1.group.lineRoad.directive.js
 * 命名注释：directive简称_leftTop1. 父模块_group . 功能_ 线路组合碎片， 类型_directive .js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').directive('leftTop1', leftTop1);

    function leftTop1() {
        return {
            restrict: 'A',
            replace: false,
            templateUrl: 'html/src/group/leftTop1.group.lineRoad.html',
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


        $scope.lineList = group.items;//全部线路数据
        $scope.gaoLiangThisLine = gaoLiangThisLine;//高亮线路


        var listen = {
            init: function () {
                $scope.$on('changeLeftTop1', function () {
                    $rootScope.$broadcast('closeAlertDiv');//关闭div
                    $timeout(function () {
                        $scope.lineList = group.items;//全部线路数据
                        $scope.gaoLiangThisLine = gaoLiangThisLine;//高亮线路
                    }, 0, true);
                });
            }
        };

        listen.init();//监听rootScope 事件

        /**
         * 详细方法
         * 16/2/18 */
        function gaoLiangThisLine(lineid) {
            group.gaoLiangThisLine(lineid);
        }

    }


})();

