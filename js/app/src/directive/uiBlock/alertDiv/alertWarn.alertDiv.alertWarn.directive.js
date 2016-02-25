/**
 * alertWarn.alertDiv.alertWarn.directive.js
 * 命名注释：directive简称_alerWarn. 父模块_alertDiv . 功能_ 显示top 警告框(到不同颜色),默认 red，1:green 2:yellow . 类型_directive .js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('alertDiv.uiBlock.alertUi.module').directive('alertWarn', alertInfo);

    function alertInfo() {
        return {
            restrict: 'EA',
            replace: false,
            templateUrl: 'html/src/public/uiBlock/alertDiv/alertWarn.alertDiv.alertWarn.directive.html',
            scope: {},
            controller: thisCtrl,
            link: function (scope, element, attr) {
                scope.element = element;
                var contentBack = document.getElementById('warnContent');
                var alertWarnCloseButton = document.getElementById('alertWarnCloseButton');
                contentBack = angular.element(contentBack);
                alertWarnCloseButton = angular.element(alertWarnCloseButton);
                if (attr.alertWarn == '1') {//变颜色
                    contentBack.css({
                        'backgroundColor': 'green'

                    });
                    alertWarnCloseButton.css({
                        'color': '#fff'
                    });
                }
                if (attr.alertWarn == '2') {//变颜色
                    contentBack.css({
                        'backgroundColor': '#d6f8f8',
                        'color': '#000'
                    });
                    alertWarnCloseButton.css({
                        'color': '#000'
                    });
                }
            }
        };
    }


    thisCtrl.$inject = ['$scope', '$timeout', 'compile', 'alertDiv'];

    /** directive contorller 详细方法  */
    function thisCtrl($scope, $timeout, compile, alertDiv) {
        $scope.str = {
            content: ''//内容部分
        };

        /** 监听rootScope 广播来的 alertDiv.alertWarn 事件
         *  弹出div，显示 内容
         *
         * */
        $scope.$on('alertDiv.alertWarn', listenAlertDivAlertInfo);

        /** 监听关闭按钮  */
        listenClose();


        /**
         ***********************
         * 具体方法
         ***********************
         * */

        /** 监听rootScope 广播来的 alertDiv.alertWarn 事件
         *  弹出div，显示 内容,变背景颜色
         * */
        function listenAlertDivAlertInfo() {
            alertDiv.getItem(alertDiv.item, reCount);
            function reCount(re) {
                $timeout(function () {
                    $scope.$apply(function () {
                        $scope.show = alertDiv.showAlertInfo;
                        if (re.type == 1) {//正常字符串
                            $scope.content = '';
                            $scope.content = re.content;
                        }
                    });
                }, 0);
            }
        }
        /** 监听关闭按钮  */
        function listenClose() {
            var coloseBut = angular.element(document.getElementById('alertWarnCloseButton'));
            coloseBut.bind('click', function () {
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

