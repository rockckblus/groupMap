/**
 * state.group.stateText.directive.js
 * 命名注释：directive简称_state. 父模块_group . 功能_操作说明 alertInfo. 类型_directive .js
 * 1:变换当前点击线路的thisItem
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').directive('state', state);

    function state() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            templateUrl: 'html/src/group/state.group.stateText.directive.html',
            link: function (scope, element, attr) {

            }
        };
    }

})();

