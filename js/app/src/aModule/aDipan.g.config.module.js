/**
 1.启动angular

 2.声明总module，注入子module

 ---- [pasvaz.bindonce', 'ui.router','uiBlock.dipan.uiGroup.module'];

 ---- [单次绑定model,ui路由module,自定义ui碎片组模型]

 3.config 总模型 ：修改post传值为标准格式

 4.config 总模型 ： 使angular兼容ie7

 5.config 总模型 ：配置路由信息*
 * */
(function (window, document) {
    'use strict';

    /** 启动angular  */
    angular.element(document).ready(function () {
        angular.bootstrap(window.document, ["dipan"]);
    });

    /**
     * 声明module
     * 16/2/1 */
    angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'uiBlock.dipan.uiGroup.module', 'group.dipan.group.module', 'sort.dipan.sort.module'], hackPost).config(uiRouter).config(secProvider);

    /**
     * 手动注入
     * 16/2/1 */
    hackPost.$inject = ['$httpProvider'];
    secProvider.$inject = ['$sceProvider'];
    uiRouter.$inject = ['$stateProvider', '$urlRouterProvider'];


    /** 路由配置  */
    function uiRouter($stateProvider, $urlRouterProvider) {
        var state1Obj = {
            url: '/state1',
            template: '<div>hhhhh</div>'
        };
        var state2Obj = {
            url: '/state2',
            templateUrl: 'Public/resCreate/html/src/public/test.directive2.html'
        };


        $urlRouterProvider.when('', "/state1");
        $stateProvider.state('state1', state1Obj)
            .state('state2', state2Obj);


    }

    /**
     * 修改post传值为标准格式
     * */
    function hackPost($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

    }

    /**
     * 使angular兼容ie7
     * 16/2/1 */
    function secProvider($sceProvider) {
        $sceProvider.enabled(false);
    }


})(window, document);
