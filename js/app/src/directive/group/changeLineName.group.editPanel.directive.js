/**
 * changeLineName.group.editPanel.directive.js
 * 命名注释：directive简称_changeLineName. 父模块_group . 功能_编辑路线名称显示alertDiv里面的 表单面板. 类型_directive .js
 * 1:变换当前点击线路的thisItem
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').directive('changeLineName', changeLineName);

    function changeLineName() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            templateUrl: 'html/src/group/changeLineName.group.editPanel.directive.html',
            controller: thisCtrl,
            link: function (scope, element, attr) {

            }
        };
    }

    thisCtrl.$inject = ['$scope', '$rootScope', '$timeout' , 'group', 'tools'];

    function thisCtrl($scope, $rootScope, $timeout, group, tools) {

        $scope.lineId = '';//otherData alertDiv.alertINfo 带过来的 lineId
        $scope.name = '';//线路名称模型

        /**********************
         * 方法详情
         * 16/2/17 */
        /********************
         *
         */

        var fun = {
            init: function () {
                this.logic();
            },

            /**
             * 逻辑
             * 16/2/18 */
            logic: function () {
                /**
                 * editLineName 依赖 getLineId 来的 lineid
                 * 所以先 getLineId，再回调 editLineName
                 * 16/2/18 */
                fun.getLineId(fun.editLineName);
            },

            /**
             * 给线路Id
             * 16/2/18 */
            getLineId: function (fun) {
                tools.otherData(function (re) {
                    $scope.lineId = re.lineid;//给lineId变量
                    fun(re.lineid);
                });
            },

            /**
             * 修改项目名称
             * 16/2/17 */
            editLineName: function (lineid) {
                $timeout(function(){
                    $scope.name = group.getLineName(lineid);
                },0);
            }

        };


        fun.init();

    }

})();

