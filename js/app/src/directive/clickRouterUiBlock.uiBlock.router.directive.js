/**
 * clickRouterUiBlock.uiBlock.router.directive.js
 * 命名注释：directive简称_clickRouterUiBlock. 父模块_uiBlock . 功能_uiBlock模块的点击事件（ui操作相关） . 类型_directive .js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('alertDiv.uiBlock.alertUi.module').directive('clickRouterUiBlock', clickRouterUiBlock);

    function clickRouterUiBlock() {
        return {
            restrict: 'EA',
            replace: false,
            scope: {},
            controller: thisCtrl,
            link: function (scope, element, attr) {
                element.bind('click', function () {
//                    console.log(attr.clickRouterUiBlock);
                    switch (attr.clickRouterUiBlock) {
                        case 'alertDiv.alertInfo':
                            scope.alertInfo(attr);
                            break;
                        case 'alertDiv.alertWarn':
                            scope.alertWarn(attr.item);
                            break;
                    }
                });
            }
        };
    }

    thisCtrl.$inject = ['$scope', '$rootScope', '$timeout' , 'alertDiv'];

    function thisCtrl($scope, $rootScope, $timeout, alertDiv) {

        $scope.alertInfo = alertInfo;
        $scope.alertWarn = alertWarn;

        function alertInfo(attr) {

            /** 修改factory 显示alertDiv ng Ui控制 为true  */
            alertDiv.showAlertInfo = true;
            alertDiv.item = attr.item;

            /** 向子域广播 alertDiv.alertInfo 事件
             * 子域文件： alertInfo.alertDiv.showInfo.directive.js
             * */
            $rootScope.$broadcast('alertDiv.alertInfo',attr);
        }

        function alertWarn(item) {

            /** 修改factory 显示alertDiv ng Ui控制 为true  */
            alertDiv.showAlertInfo = true;
            alertDiv.item = item;

            /** 向子域广播 alertDiv.alertInfo.change 事件
             * 子域文件： alertInfo.alertDiv.showInfo.directive.js
             * */
            $rootScope.$broadcast('alertDiv.alertWarn');
        }
    }

})();

