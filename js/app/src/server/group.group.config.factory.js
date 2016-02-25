/**
 * group.group.config.factory.js
 * 命名注释：server简称_group. 父模块 group . 功能_group 的 配置文件，在controll中共享数据 . 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('group.dipan.group.module').factory('group', group);

    group.$inject = ['$http', '$timeout', '$rootScope', 'tools'];

    function group($http, $timeout, $rootScope, tools) {

        var postAllGoodUrl = 'http://123.150.38.2:8081/index.php/Member/Test/search_mas_goods';
        var group;
        var lineId = 1;//初始线路id
        getAllGoodsData();//默认给全部货源数据
        group = {
            /**
             * 线路总模型,默认0
             * 16/2/16 */
            items: [
                {
                    id: 0,
                    /**
                     * goodObj 结构 id,gps_lat,gps_lng,sh_address
                     * 16/2/16 */
                    goods: [
                    ],
                    price: 0,//线路价格
                    name: '线路0',//线路名称
                    thisItem: 'thisColor',//高亮
                    radio: 'images/radio1.png'
                }
            ],

            /**
             * 高亮线路项目
             * 16/2/16 */
            thisItemId: 0,

            /**
             * 所有good数据
             * 16/2/16 */
            allGoodsData: '',

            /**
             * getLineName, 根据lineid，返回 Name
             * 16/2/18 */
            getLineName: getLineName,

            /**
             * getLineGoods, 根据thislineId，返回 Goods,
             * 16/2/18 */
            getLineGoods: getLineGoods,

            /**
             * getLineName, 根据lineid，返回 Name
             * 16/2/18 */
            getLinePrice: getLinePrice,

            /**
             * 变换高亮thisItemId,广播 apply leftTop1 dom 事件
             *  */
            changeLineName: changeLineName,

            /**
             * changeLinePrice 变价格
             * 16/2/18 */
            changeLinePrice: changeLinePrice,

            /**
             * 高亮ui方法，传入 lineid
             * 16/2/18 */
            gaoLiangThisLine: gaoLiangThisLine,

            /**
             * 添加新线路
             * 16/2/18 */
            addNewLine: addNewLine,

            /**
             * 删除当前线路
             * 16/2/23 */
            delThisLine: delThisLine,

            /**
             * 点击单个货物，吧货物加入 对应线路组
             * 16/2/18 */
            addGoodsToLine: addGoodsToLine,

            /**
             * delGoodsFromLine 从线路里面删除 goodsId
             * 16/2/18 */
            delGoodsFromLine: delGoodsFromLine,

            /**
             * search
             * 16/2/18 */
            search: search,

            /**
             * sub 保存并提交
             * 16/2/19 */
            sub: sub
        };

        /**
         * function 解析 get来的 uid
         * 16/2/24 */
        function getUid() {
            var url = location.href;
            url = url.split('#');
            return url[1];
        }

        /**
         * 获取全部goods数据
         * 16/2/18 */
        function getAllGoodsData() {
            var uid = getUid();
            if (!uid) {
                alert('网址非法');
                return false;
            }
            $http({
                url: postAllGoodUrl + '/uid/' + uid,
                method: "GET",
                timeout: 10000 //超时设置
            }).success(function (response) {
                try {
                    if (response.lineId) {//如果有统计lindeId ，就给基数lineId
                        lineId = response.lineId;
                    }
                    /**
                     * 给高亮
                     * 16/2/24 */
                    var thisLine = response.thisItemId;//给当前线路id
                    if ((typeof(thisLine) !== 'undefined') && (thisLine !== '')) {//给当前 高亮线路
                        gaoLiangThisLine(thisLine);
                    }

                    try {
                        var items = response.items;
                        if (response.items[0].id !== false) {
                            for (var voo in items) {
                                items[voo].radio = 'images/radio0.png';
                                if (items[voo].id == response.thisItemId) {
                                    items[voo].radio = 'images/radio1.png';
                                }
                            }
                            group.items = items;
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    var list = response.list;
                    for (var vo in list) {// 设置一个显示值 给搜索用
                        list[vo].show = true;
                    }
                } catch (e) {
                    console.log(e);
                }


                $timeout(function () {
                    group.allGoodsData = response;
                    /**
                     * 像子域广播 goods加载完成 的 allGoodsData 事件
                     * 16/2/17 */


                    $rootScope.$broadcast('allGoodsData');
                    $rootScope.$broadcast('changeLeftTop1');
                }, 0, true);
            });
        }

        /**
         * getLineName, 根据lineid，返回 Name
         * 16/2/18 */
        function getLineName(lineid) {
            if (lineid !== false) {
                var line = group.items;
                for (var vo in line) {
                    if (line[vo].id == lineid) {
                        return line[vo].name;
                    }
                }
            }
        }

        /**
         * getLinePrice, 根据lineid，返回 price
         * 16/2/18 */
        function getLinePrice(lineid) {
            if (lineid) {
                var line = group.items;
                for (var vo in line) {
                    if (line[vo].id == lineid) {
                        return line[vo].price;
                    }
                }
            }
        }

        /**
         * getLineName, 根据lineid，返回 Name
         * 16/2/18 */
        function changeLineName(lineid, lineName) {
            if (lineid && lineName) {
                gaoLiangThisLine(lineid);//高亮
                var line = group.items;
                for (var vo in line) {
                    line[vo].radio = 'images/radio0.png';
                    if (line[vo].id == lineid) {
                        line[vo].name = lineName;
                        line[vo].radio = 'images/radio1.png';
                        /**
                         * 接收地址leftTop1.group.lineRoad.directive.js
                         * 16/2/18 */
                        $rootScope.$broadcast('changeLeftTop1');
                        $rootScope.$broadcast('allGoodsData');
                    }
                }
            }
        }

        /**
         * getLineGoods, 根据lineid，返回 Goods
         * 16/2/18 */
        function getLineGoods() {
            var lineid = group.thisItemId;
            if (lineid !== false) {
                var line = group.items;
                for (var vo in line) {
                    if (line[vo].id == lineid) {
                        return line[vo].goods;
                    }
                }
            }
        }

        /**
         * 根据id ，返回price
         * 16/2/18 */
        function changeLinePrice(lineid, linePrice) {
            if (lineid && linePrice) {
                gaoLiangThisLine(lineid);//高亮
                var line = group.items;
                for (var vo in line) {
                    if (line[vo].id == lineid) {
                        line[vo].price = linePrice;
                        /**
                         * 接收地址leftTop1.group.lineRoad.directive.js
                         * 16/2/18 */
                        $rootScope.$broadcast('changeLeftTop1');
                    }
                }
            }
        }

        /**
         * 高亮ui方法，传入 lineid
         * 16/2/18 */
        function gaoLiangThisLine(lineid) {
            group.thisItemId = parseInt(lineid);//给高亮lineId
            var line = group.items;
            for (var vo in line) {
                line[vo].thisItem = '';//取消所有高亮
                line[vo].radio = 'images/radio0.png';
                if (line[vo].id == lineid) {
                    line[vo].thisItem = 'thisColor';//给高亮
                    line[vo].radio = 'images/radio1.png';
                    /**
                     * 接收地址leftTop1.group.lineRoad.directive.js
                     * 16/2/18 */
                    $rootScope.$broadcast('changeLeftTop1');
                    $rootScope.$broadcast('allGoodsData');
                }
            }
        }

        /**
         * 添加新线路
         * 16/2/18 */
        function addNewLine() {
            var _lineId = lineId++;
            var lineItem =
            {
                id: _lineId,
                goods: [
                ],
                price: 0,//线路价格
                name: '线路' + _lineId,//线路名称
                thisItem: ''//高亮
            };
            group.items.push(lineItem);
            group.gaoLiangThisLine(_lineId);
            $rootScope.$broadcast('changeLeftTop1');//更新dam
        }

        /**
         * 删除当前线路
         * 16/2/23 */
        function delThisLine(lineid) {

            /**
             * 判断至少保留1条线路
             * 16/2/23 */
            if (group.items.length == 1) {
                alert('至少保留1条线路');
                return false;
            }

            var allLine = group.items;
            var index;
            var tempGoodsArr = [];
            for (var vo in allLine) {
                if (allLine[vo].id == lineid) {
                    var goods = allLine[vo].goods;
                    for (var vo2 in goods) {
                        tempGoodsArr.push(goods[vo2]);
                    }
                    index = vo;
                }
            }

            for (var vo3 in tempGoodsArr) {
                delGoodsFromLine(lineid, tempGoodsArr[vo3].id);//删除line_goods 加入 allgoods
            }


//            setTimeout(function () {
            tools.arrDel(group.items, index);

            /**
             * 高亮剩下的 第一条线路
             * 16/2/23 */
            var lineId = group.items[0].id;
            gaoLiangThisLine(lineId);
            $rootScope.$broadcast('changeLeftTop1');//更新dam
            $rootScope.$broadcast('allGoodsData');//更新dam
//            }, 0);
        }

        /**
         * addGoodsToLine 点击单个货物，吧货物加入 对应线路组
         * 传入货物id
         * 16/2/18 */
        function addGoodsToLine(goodId) {
            /**
             * goodid对应的goods对象,全部线路对象，goodId对应的 $index(索引)
             * 16/2/18 */
            var oneGoodObj, allLine, index;
            var all = group.allGoodsData.list;

            for (var vo in all) {
                if (all[vo].id === parseInt(goodId)) {
                    oneGoodObj = all[vo];
                    index = parseInt(vo);//确定索引位置
                }
            }

            allLine = group.items;

            for (var vo2 in allLine) {

                if (allLine[vo2].id == group.thisItemId) {
                    allLine[vo2].goods.push(oneGoodObj);
                }
            }

//            删除全部数组的中oneGoodsobj 从0开始删除的 索引
            tools.arrDel(group.allGoodsData.list, index);

            //更新dom
            $rootScope.$broadcast('changeLeftTop1');
            $rootScope.$broadcast('allGoodsData');
        }


        /**
         * delGoodsFromLine 从线路里面删除 goods
         * 传入货物id
         * 16/2/18 */
        function delGoodsFromLine(lineid, goodId) {

            group.gaoLiangThisLine(lineid);//高亮line

            /**
             * goodid对应的goods对象,全部线路对象，goodId 在线路里面对应的 $index(索引)
             * 16/2/18 */
            var oneLineGoodsAll, oneGoodObj, allLine, index;

            allLine = group.items;

            for (var vo2 in allLine) {
                if (allLine[vo2].id == parseInt(lineid)) {
                    oneLineGoodsAll = allLine[vo2].goods;
                }
            }

            for (var vo in oneLineGoodsAll) {
                if (oneLineGoodsAll[vo].id == goodId) {
                    oneGoodObj = oneLineGoodsAll[vo];
                    index = parseInt(vo);//确定索引位置 在一条线路里面的位置
                }
            }

            group.allGoodsData.list.push(oneGoodObj);


            tools.arrDel(oneLineGoodsAll, index);


            //更新dom
            $rootScope.$broadcast('changeLeftTop1');
            $rootScope.$broadcast('allGoodsData');
        }


        /**
         * search
         * 16/2/18 */
        function search(key) {
            var listGoods = group.allGoodsData.list;
            if (key) {
                for (var vo in listGoods) {
                    listGoods[vo].show = false;
                    if (_search(listGoods[vo].sh_address, key)) {
                        listGoods[vo].show = true;
                    }
                }
                $rootScope.$broadcast('allGoodsData');
            } else {
                for (var vo2 in listGoods) {
                    listGoods[vo2].show = true;
                }
                $rootScope.$broadcast('allGoodsData');
            }

            function _search(tempStr, key) {
                var str = tempStr;
                var patt1 = new RegExp(key);

                var result = patt1.test(str);
                if (result) {
                    return true;
                }

            }
        }

        /**
         * sub 保存线路并提交
         * 16/2/19 */
        function sub() {
            var url = '';
            var endSub = {
                items: group.items,
                goods: group.allGoodsData,
                thisItemId: group.thisItemId,
                lineId: lineId
            };

            tools.postJsp(url, endSub, function (re) {
                console.log(re);
            });

        }


        return group;
    }

})();

