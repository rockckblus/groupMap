/**
 * alertInfo.alertDiv.showInfo.directive.js
 * 命名注释：directive简称_alerInfo. 父模块_alertDiv . 功能_ 显示alert黑背景，传尺寸与信息 . 类型_directive .js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('alertDiv.uiBlock.alertUi.module').directive('alertInfo', alertInfo);

    function alertInfo() {
        return {
            restrict: 'EA',
            replace: false,
            templateUrl: 'html/src/public/uiBlock/alertDiv/alertInfo.alertDiv.showInfo.directive.html',
            scope: {},
            controller: thisCtrl,
            link: function (scope, element, attr) {
                scope.element = element;
            }
        };
    }


    thisCtrl.$inject = ['$scope', '$timeout', 'compile', 'alertDiv'];

    /** directive contorller 详细方法  */
    function thisCtrl($scope, $timeout, compile, alertDiv) {
        $scope.str = {
            content: ''//内容部分
        };

        /** 监听rootScope 广播来的 alertDiv.alertInfo 事件
         *  弹出div，显示 内容
         *
         * */
        $scope.$on('alertDiv.alertInfo', listenAlertDivAlertInfo);

        /** 监听关闭按钮 id:alertInfoCloseButton   */
        listenClose();


        /**
         ***********************
         * 具体方法
         ***********************
         * */

        /** 监听rootScope 广播来的 alertDiv.alertInfo.chang 事件
         *  弹出div，显示 内容
         *  data 为alertInfo re.type=2 时候 传来的 attr 的 其他值,可以带到 新作用域
         * */
        function listenAlertDivAlertInfo(e, data) {

            alertDiv.getItem(alertDiv.item, reCount);

            function reCount(re) {
                $timeout(function () {
                    $scope.$apply(function () {
                        $scope.show = alertDiv.showAlertInfo;

                        if (re.type == 1) {//正常字符串
                            $scope.content = re.content;
                        }

                        else if (re.type == 2) {//动态bind Html 为 angular
                            compile('reBindContent', re.content, $scope);
                            $scope.otherData = data;
                        }


                        hackCenter();//根据内容宽度居中
                    });
                }, 0);
            }


        }

        /** hack Info Center 位置  */
        function hackCenter() {
            var infoContentDiv = angular.element(document.getElementById('infoContent'));
            $timeout(function () {
                var width = infoContentDiv[0].offsetWidth;
                infoContentDiv.css({
                    'margin-left': -(width / 2) + 'px'
                });
            }, 0);
        }


        /** 监听关闭按钮  */
        function listenClose() {
            var coloseBut = angular.element(document.getElementById('alertInfoCloseButton'));
            coloseBut.bind('click', function () {
                closeAlertDiv();
            });

            /**
             * 监听$rootScope closeAlertDiv
             * 16/2/18 */
            $scope.$on('closeAlertDiv', function () {
                closeAlertDiv();
            });
        }


        /** closeAlertDiv  */
        function closeAlertDiv() {
            $timeout(function () {
                $scope.show = false;
                alertDiv.showAlertInfo = false;
            }, 0);
        }

    }


})();

