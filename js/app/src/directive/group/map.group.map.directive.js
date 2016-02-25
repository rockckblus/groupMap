/**
 * topGoodsList.group.topGoodsList.directive.js
 * 命名注释：directive简称_topGoodsList. 父模块_group . 功能_ goods组合碎片， 类型_directive .js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').directive('map', leftTop1);

    function leftTop1() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisCtrl,
            link: function (scope, element, attr) {
                scope.element = element;
            }
        };
    }


    thisCtrl.$inject = ['$scope', '$timeout', 'group', 'tools'];

    /** directive contorller 详细方法  */
    function thisCtrl($scope, $timeout, group, tools) {
        var map, center, goodsMarkArr = [], lineGoodsArr = [], path = [], thisLinePathObj, lableArr = [];//map ,默认中心点， 未分配goodsArr ，当前线路 goodsArr,当前线路路径划线数组,文本标记sortIndex数组
        var infoWin;
        giveMapWidthHeight(init);

        listenRoot();//监听父域发送的监听事件

        /**
         * 给地图，宽高
         * 16/2/19 */
        function giveMapWidthHeight(fun) {
            $timeout(function () {
                var outDiv = document.getElementById('mapOut');
                var mapdiv = document.getElementById('mapContent');
                outDiv = angular.element(outDiv);
                mapdiv = angular.element(mapdiv);
                var outDivWidth = outDiv[0].offsetWidth;
                var outDivHeight = outDiv[0].offsetHeight;

                mapdiv[0].style.height = outDivHeight + 'px';
                mapdiv[0].style.width = outDivWidth + 'px';

                setTimeout(function () {
                    fun();
                }, 1000);
            }, 0);
        }

        /**
         * 详情方法
         * 16/2/19 */
        function init() {//地图初始化
            center = new qq.maps.LatLng(39.125773, 117.190444);
            map = new qq.maps.Map(document.getElementById("mapContent"), {
                // 地图的中心地理坐标。
                zoom: 13,
                center: center
            });
            infoWin = new qq.maps.InfoWindow({
                map: map
            });
////            工具条
            var navControl = new qq.maps.NavigationControl({
                align: qq.maps.ALIGN.TOP_RIGHT,
                margin: new qq.maps.Size(5, 15),
                map: map
            });
//
            var scaleControl = new qq.maps.ScaleControl({
                align: qq.maps.ALIGN.BOTTOM_RIGHT,
                margin: new qq.maps.Size(85, 15),
                map: map
            });

            setTimeout(function () {
                createMark(center, "images/6120.gif", false);//给默认天津市图标
                getGoodsMark();//取goods 所有 未分配 给到地图 蓝色图标
                showThisLine();//显示当前的线路给红色高亮图标
            }, 0);
        }


        /**
         * 建立文本标记
         * 16/2/22 */
        function createLable(gps, content) {
            if (map) {
                if (content) {
                    var label = new qq.maps.Label({
                        position: gps,
                        map: map,
                        content: content + ''
                    });
                    lableArr.push(label);
                }
            }
        }


        /**
         * 建立marker,传入图标地址，空是默认图标
         * 16/2/19 */
        function createMark(center, icon, content) {
            var iconObj = new qq.maps.MarkerImage(icon);
            if (map) {
                var marker = new qq.maps.Marker({
                    position: center,
                    map: map,
                    icon: iconObj
                });
                if (content) {
                    marker.setMap(map);
                    if (icon == 'images/blueStar.png') {
                        content.type = 'goods';
                        bindGoodsMarkHover(content, marker);//绑定点击事件
                        goodsMarkArr.push(marker);
                    }
                    if (icon == 'images/redStar.png') {
                        content.type = 'line';
                        bindGoodsMarkHover(content, marker);//绑定点击事件
                        lineGoodsArr.push(marker);
                    }
                }
            }
        }

        /**
         * 删除标记
         * 16/2/19 */
        function delMark(mark) {
            if (mark.getMap()) {
                mark.setMap(null);
            }
        }

        /**
         * 遍历goods 建立 蓝色坐标
         * 16/2/19 */
        function getGoodsMark() {
            var goods = group.allGoodsData.list;
            if (goods) {
                for (var vo in goods) {
                    try {
                        if (goods[vo].show) {
                            var thisCenter = new qq.maps.LatLng(goods[vo].gps_lat, goods[vo].gps_lng);
                            createMark(thisCenter, 'images/blueStar.png', goods[vo]);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }

        /**
         * 删除所有goodsArr标记
         * 16/2/19 */
        function _delGoodsMarkArr() {
            if (goodsMarkArr) {
                for (var vo in goodsMarkArr) {
                    var trueFun = !tools.isFunction(goodsMarkArr[vo]);
                    if (goodsMarkArr[vo] && trueFun) {
                        delMark(goodsMarkArr[vo]);
                    }
                }
                goodsMarkArr.length = 0;
            }
        }

        /**
         * 删除所有lineGoodsArr标记
         * 16/2/19 */
        function _delLineGoodsMarkArr() {
            if (lineGoodsArr) {
                for (var vo in lineGoodsArr) {
                    var trueFun = !tools.isFunction(lineGoodsArr[vo]);
                    if (lineGoodsArr[vo] && trueFun) {
                        delMark(lineGoodsArr[vo]);
                    }
                }
                lineGoodsArr.length = 0;
            }
        }


        /**
         * 监听root的事件
         * 16/2/19 */
        function listenRoot() {
            $scope.$on('allGoodsData', function () {
                _delGoodsMarkArr();//删除未分配goodsMark
                _delLineGoodsMarkArr();//删除所有线路数组
                getGoodsMark();//重绘 未分配mark
                showThisLine();//重绘线路高亮
            });
        }

        /**
         * 添加折现
         * 16/2/19 */
        function addLine() {
            path = _unique(path);
            if (map) {
                if (!thisLinePathObj) {
                    thisLinePathObj = new qq.maps.Polyline({
                        path: path,
                        strokeColor: '#0000ff',
                        strokeWeight: 3,
                        strokeOpacity: 1,
                        editable: false,
                        map: map
                    });
                }
                thisLinePathObj.setMap(map);
                setTimeout(function () {
                    thisLinePathObj.setPath(path);
                }, 0);
            }
        }

        /**
         * goodsmark鼠标划过事件绑定
         * 16/2/19 */
        function bindGoodsMarkHover(content, marker) {
            qq.maps.event.addListener(marker, 'mouseover', function () {
                var contentEnd = content.sh_address + '&nbsp;&nbsp;';
                infoWin.open();
                infoWin.setPosition(marker.getPosition());
                infoWin.setContent(contentEnd);
                setTimeout(function(){
                    infoWin.close();
                },1000);
            });
            setTimeout(function () {
                bindGoodsMarkClick(marker, content.id, content.type);//bind mark click事件
            }, 0);
        }

        /**
         * goodsMark点击事件绑定
         * 16/2/19 */
        function bindGoodsMarkClick(marker, id, type) {
            qq.maps.event.addListener(marker, 'click', function () {

                if (id) {
                    if (type == 'goods') {
                        group.addGoodsToLine(id);
                    }
                    if (type == 'line') {
                        group.delGoodsFromLine(group.thisItemId, id);
                    }
                    infoWin.close();
                }
            });
        }

        /**
         * 删除当前折线
         * 16/2/22 */
        function delThisLine() {

            path = [];
            path.length = 0;
            if (thisLinePathObj) {
                thisLinePathObj.setVisible(true);
                thisLinePathObj.setMap(null);
            }
        }

        /**
         * 删除所有 index lable
         * 16/2/23 */
        function delLable() {
            for (var vo in lableArr) {
                lableArr[vo].setVisible(false);
            }
            lableArr = [];
        }

        /**
         * showThisLine
         * 16/2/22 */
        function showThisLine() {
            delThisLine();
            delLable();
            setTimeout(function () {
                var goods = group.getLineGoods();
                for (var vo in goods) {
                    if (goods[vo].show) {
                        var thisCenter = new qq.maps.LatLng(goods[vo].gps_lat, goods[vo].gps_lng);
                        path.push(thisCenter);
                        createMark(thisCenter, 'images/redStar.png', goods[vo]);
                        createLable(thisCenter, parseInt(vo) + 1);
                    }
                }
            }, 0);
            setTimeout(function () {
                addLine();
            }, 400);
        }

        /**
         * 去除数组重复
         * 16/2/23 */
        function _unique(arr) {
            var result = [], hash = {};
            for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            }
            return result;
        }
    }


})();

