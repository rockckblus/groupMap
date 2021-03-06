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
        var circle;//判断范围用的
        var moreGoods = [], oneGoods = true, moreTempGoods = [];//判断出来的 重叠数组,默认 一个goods的情况 , 重叠goods数组
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
                center: center,
                minZoom: 11
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
                _reArea();//给默认圆形
                listenZoomLevel();//监听地图缩放,给圆形大小
            }, 0);
        }

        /**
         * 监听地图缩放事件
         * 16/2/29 */
        function listenZoomLevel() {
            qq.maps.event.addListener(map, 'zoom_changed', function () {
                var zoomLevel = map.getZoom();
                _changCircle(zoomLevel);//改变员的大小，zoom越大员越小
            });
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
            icon += '#' + content.id;
            var iconChai = icon.split('#');
            var iconObj = new qq.maps.MarkerImage(icon);
            if (map) {
                var marker = new qq.maps.Marker({
                    position: center,
                    map: map,
                    icon: iconObj
                });
                if (content) {
                    marker.setMap(map);
                    if (iconChai[0] == 'images/blueStar.png') {
                        content.type = 'goods';
                        bindGoodsMarkHover(content, marker);//绑定点击事件
                        goodsMarkArr.push(marker);
                    }
                    if (iconChai[0] == 'images/redStar.png') {
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
                infoWin.close();
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

                /**
                 * 判断 此区域内 有没有其他 goods ,再回调 _isInArea
                 * 16/2/29 */
                _isInArea(marker.getPosition(), content.type, _callBack);

                function _callBack() {
                    if (oneGoods) {//无重叠
                        _oneGoods();
                    } else {//有重叠
                        _moreGoods();
                    }
                }

                /**
                 * 无重叠方法
                 * 16/2/29 */
                function _oneGoods() {
                    var contentEnd;
                    if (content.type == 'line') {
                        contentEnd = '<span style="color:red">' + content.sort + '&nbsp;:&nbsp;' + content.sh_address + '&nbsp;&nbsp;</span>';
                    } else {
                        contentEnd = content.sh_address + '&nbsp;&nbsp;';
                    }
                    infoWin.open();
                    infoWin.setPosition(marker.getPosition());
                    infoWin.setContent(contentEnd);
                    setTimeout(function () {
                        infoWin.close();
                    }, 1000);
                }

                /**
                 * 有重叠方法
                 * 16/2/29 */
                function _moreGoods() {
                    /**
                     * 组合出 moreTempGoods 数组 。来遍历
                     * 16/3/1 */
                    _giveMoreTempGoods(content.type);
                    var contentEnd = '';
                    for (var vo in moreTempGoods) {
                        if (content.type == 'line') {
                            contentEnd += moreTempGoods[vo].sort + '&nbsp;:&nbsp;' + moreTempGoods[vo].sh_address + '&nbsp;&nbsp;\<br\/\>\<hr\/\>';
                        } else {
                            contentEnd += moreTempGoods[vo].sh_address + '&nbsp;&nbsp;\<br\/\>\<hr\/\>';
                        }
                    }
                    infoWin.open();
                    infoWin.setPosition(marker.getPosition());


                    if (content.type == 'line') {
                        contentEnd = '<span style="color:red">' + contentEnd + '</span>';
                    }

                    infoWin.setContent(contentEnd);
                    setTimeout(function () {
                        if (content.type == 'goods') {
                            infoWin.close();
                        }
                    }, 2000);

                }
            });
            setTimeout(function () {
                bindGoodsMarkClick(marker, content.id, content.type);//bind mark click事件
            }, 0);
        }

        /**
         * 根据type 是 goods 还是 line 给不同的 重叠数组
         * 根据 meoreGoods  重叠mark数组 组合出 重叠goods(未选中的) 数组
         *
         * 16/3/1 */
        function _giveMoreTempGoods(type) {
            moreTempGoods = [];
            var allGoods;
            if (type == 'line') {
                allGoods = group.getLineGoods();
            }
            if (type == 'goods') {
                allGoods = group.allGoodsData.list;
            }

            for (var vo in moreGoods) {
                var goodId = _getGoodId(moreGoods[vo].getIcon().url);
                for (var vo2 in allGoods) {
                    if (goodId == allGoods[vo2].id) {
                        moreTempGoods.push(allGoods[vo2]);
                    }
                }
            }

            function _getGoodId(url) {
                var goodsId = url.split('#');
                return goodsId[1];
            }
        }


        /**
         * goodsMark点击事件绑定
         * 16/2/19 */
        function bindGoodsMarkClick(marker, id, type) {
            qq.maps.event.addListener(marker, 'click', function () {

                if (id) {
                    if (type == 'goods') {
                        if (oneGoods) {
                            group.addGoodsToLine(id);
                        } else {
                            moreTempGoods = _uniqueObj(moreTempGoods);
                            var count = 0;
                            for (var vo in moreTempGoods) {
//                                count = count + 1000;
                                _addGoodsToLine(moreTempGoods[vo].id, count);
                            }
                        }
                    }
                    if (type == 'line') {
                        moreTempGoods = _uniqueObj(moreTempGoods);
                        if (oneGoods) {
                            group.delGoodsFromLine(group.thisItemId, id);
                        } else {
                            for (var vo2 in moreTempGoods) {
                                var moreTempGoodsId = parseInt(moreTempGoods[vo2].id);
                                _delGoodsFromLine(moreTempGoodsId);
                            }
                        }
                    }


                    infoWin.close();
                }

                function _addGoodsToLine(moreTempGoodsId, count) {
                    setTimeout(function () {
                        group.addGoodsToLine(moreTempGoodsId);
                    }, count);

                }

                function _delGoodsFromLine(moreTempGoodsId) {
                    group.delGoodsFromLine(group.thisItemId, moreTempGoodsId);
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
                        goods[vo].sort = parseInt(vo) + 1;
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

        /**
         * _uniqueObj 去除重复 的 数组里面是对象 的 情况
         * 16/3/1 */
        function _uniqueObj(arr) {
            var tempChangeArr = [];//声明一个临时的 符合单一数组格式 的临时数组
            for (var vo in arr) {
                var tempJson = JSON.stringify(arr[vo]);
                tempChangeArr.push(tempJson);
            }
            var changArr = _unique(tempChangeArr);

            var endReArr = [];
            for (var vo2 in changArr) {
                var tempObj = JSON.parse(changArr[vo2]);
                endReArr.push(tempObj);
            }
            return endReArr;
        }

        /**
         * 判断一个点是否在多变型区域内
         * 16/2/29 */
        function _isInArea(gpsObj, type, callBack) {
            /**
             * 变换区域到坐标的位置
             * 返回 区域 范围
             * 遍历goods 判断 范围里面有没有 其他 goods
             * 16/2/29 */
            circle.setCenter(gpsObj);
            var circleGpsArea = circle.getBounds();
            _eachGoodsInArea(circleGpsArea, type, callBack);
        }

        /**
         * 遍历所有goods gps 在区域内 返回 数组
         * 16/2/29 */
        function _eachGoodsInArea(area, type, callBack) {
            moreGoods = [];//清空重叠
            oneGoods = true;//给无重叠情况
            var count = 0;

            var eachGoodsmarkArr = [];
            if (type == 'goods') {
                eachGoodsmarkArr = goodsMarkArr;
            }
            if (type == 'line') {
                eachGoodsmarkArr = lineGoodsArr;
            }

            for (var vo in eachGoodsmarkArr) {
                var g = eachGoodsmarkArr[vo].getPosition();
                if (((g.lat < area.lat.maxY) && (g.lat > area.lat.minY)) && (((g.lng < area.lng.maxX) && (g.lng > area.lng.minX)))) {
                    count++;
                    if (count == 1) {
                        oneGoods = true;// 有1 个
                        moreGoods.push(eachGoodsmarkArr[vo]);//push 到重叠数组
                    }
                    if (count > 1) {
                        oneGoods = false;// 有多个重叠

                        if (!_trueMoreGoodsIsSet(eachGoodsmarkArr[vo])) {
                            moreGoods.push(eachGoodsmarkArr[vo]);//push 到重叠数组
                        }

                    }
                }
            }


            function _trueMoreGoodsIsSet(mark) {
                for (var vo2 in moreGoods) {
                    var gid = _getGoodsIdUrl(moreGoods[vo2]);
                    var markId = _getGoodsIdUrl(mark);
                    if (gid == markId) {
                        return true;
                    }
                }

            }

            function _getGoodsIdUrl(mark) {
                return  _getGoodId(mark.getIcon().url);
            }

            function _getGoodId(url) {
                var goodsId = url.split('#');
                return goodsId[1];
            }


            setTimeout(function () {
                callBack();
            }, 0);

        }

        /**
         * 默认给一个员
         * 16/2/29 */
        function _reArea() {
            circle = new qq.maps.Circle({//员
                map: map,
                center: center,
                radius: 260,
                fillColor: "#0f0",
                strokeWeight: 2,
                visible:false

            });
        }

//            动态改变员
        function _changCircle(zoome, callBack) {
            var endNum = 0;
            switch (zoome) {
                case 18:
                    endNum = 4 * 2;
                    break;
                case 17:
                    endNum = 8.1 * 2;
                    break;
                case 16:
                    endNum = 16.25 * 2;
                    break;
                case 15:
                    endNum = 32.5 * 2;
                    break;
                case 14:
                    endNum = 65 * 2;
                    break;
                case 13:
                    endNum = 130 * 2;
                    break;
                case 12:
                    endNum = 260 * 2;
                    break;
                case 11:
                    endNum = 520 * 2;
                    break;
                default :
                    endNum = 130 * 2;
                    break;
            }
            circle.setRadius(endNum);//设置圆形大小
        }


    }


})
();

