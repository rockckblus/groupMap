/**
 * clickRouterGroup.group.router.directive.js
 * 命名注释：directive简称_clickRouterGroup. 父模块_group . 功能_group模块的点击事件 . 类型_directive .js
 * 1:变换当前点击线路的thisItem
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').directive('clickRouterGroup', clickRouterGroup);

    function clickRouterGroup() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisCtrl,
            link: function (scope, element, attr) {
                element.bind('click', function () {
                    switch (attr.clickRouterGroup) {
                        case '1':
                            scope.clickFun.changeThisItem(attr.lineid);//变换当前点击线路的thisItem 高亮 改 thisId
                            break;
                        case '2':
                            scope.clickFun.changeThisLineName(attr.lineid, attr.linename);//修改线路名称 ,传入id
                            break;
                        case '3':
                            scope.clickFun.changeThisLinePrice(attr.lineid, attr.lineprice);//修改线路名称 ,传入id
                            break;
                        case '5':
                            scope.clickFun.addNewLine();//添加新线路
                            break;
                        case '4':
                            scope.clickFun.addGoodsToLine(attr.goodid);//点击单个货物，吧货物加入 对应线路组
                            break;
                        case '6':
                            scope.clickFun.delGoodsFromLine(attr.lineid, attr.goodid);//点击单个货物，吧货物加入 对应线路组
                            break;
                        case '7':
                            scope.clickFun.sub();//保存按钮
                            break;
                        case '8':
                            scope.clickFun.sortShow(attr.lineid);//当前线路 排序
                            break;
                        case '9':
                            scope.clickFun.delThisLine(attr.lineid);//当前线路 排序
                            break;
                    }
                });
            }
        };
    }

    thisCtrl.$inject = ['$scope', '$rootScope', '$timeout' , 'group', 'tools'];

    function thisCtrl($scope, $rootScope, $timeout, group, tools) {
        $scope.clickFun = {
            changeThisItem: changeThisItem,//变换当前点击线路的thisItem
            changeThisLineName: changeThisLineName,//修改线路名称 ,传入id,name
            changeThisLinePrice: changeThisLinePrice,//修改线路价格 ,传入id,price
            addNewLine: addNewLine,//添加新线路
            addGoodsToLine: addGoodsToLine,//点击单个货物，吧货物加入 对应线路组
            delGoodsFromLine: delGoodsFromLine,//从线路里面删除goods
            sub: sub,//保存线路并提交
            sortShow: sortShow,//排序directive显示
            delThisLine: delThisLine//删除当前线路
        };

        /**********************
         * 方法详情
         * 16/2/17 */
        /********************


         /**
         *变换当前点击线路的thisItem
         * 16/2/17 */
        function changeThisItem(lineId) {
            group.gaoLiangThisLine(lineId);
        }

        /**
         * 修改线路名称 ,传入id
         * 16/2/17 */
        function changeThisLineName(lineId, lineName) {

            if (!tools.isEmpty(lineName)) {
                alert('线路名称不能为空');
                return false;
            } else {
                $timeout(function () {
                    group.thisItem = lineId;
                    group.changeLineName(lineId, lineName);
                }, 0);
            }
        }

        /**
         * 修改线路价格 ,传入id
         * 16/2/17 */
        function changeThisLinePrice(lineId, linePrice) {
            if (!tools.isEmpty(linePrice) || (linePrice === 0)) {
                alert('价格不能为空 或为 0');
                return false;
            }
            $timeout(function () {
                group.thisItem = lineId;
                group.changeLinePrice(lineId, linePrice);
            }, 0);
        }

        /**
         * 添加新线路
         * 16/2/18 */
        function addNewLine() {
            group.addNewLine();
        }

        /**
         * delThisLine 删除当前线路
         * 16/2/23 */
        function delThisLine(lineId) {
            var r = confirm("确定删除当前线路吗？");
            if (r === true) {
                group.delThisLine(lineId);
            }
        }

        /**
         * addGoodsToLine 点击单个货物，吧货物加入 对应线路组
         * 传入货物id
         * 16/2/18 */
        function addGoodsToLine(goodsId) {
            group.addGoodsToLine(goodsId);
        }

        /**
         * delGoodsFromLine 从线路里面删除goodsid
         * 16/2/18 */
        function delGoodsFromLine(lineid, goodsId) {
            group.delGoodsFromLine(lineid, goodsId);
        }

        /**
         * sub 保存并提交
         * 16/2/19 */
        function sub() {
            group.sub();
        }

        /**
         * osortShow 显示当前线路排序
         * 16/2/22 */
        function sortShow(lineId) {
            group.gaoLiangThisLine(lineId);
            $rootScope.$broadcast('showSort');//广播 showSort 事件
        }


    }

})();

