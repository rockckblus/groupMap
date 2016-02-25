/**
 * alertDiv.uiBlock.alertUi.factory.js
 * 命名注释：server简称_alertDiv. 父模块 uiBlock . 功能_声明uiBlock ui显示的server数据，在controll中共享数据 . 类型_factory.js
 * Created by rockblus on 16-2-5.
 */

(function () {
    'use strict';
    angular.module('alertDiv.uiBlock.alertUi.module').factory('alertDiv', alertDiv);


    function alertDiv() {

        /** 挂载  uiBlock.alertDiv 相关
         * showAlertInfo
         * */

        var alertDivRe;

        alertDivRe = {
            showAlertInfo: false,//是否显示alertInfo
            item: 0,
            getItem: getItemContent
        };

        function getItemContent(item, fun) {
            var re = {};//type 1:正常字符串 2:directive 动态绑定
            switch (item) {
                case '1':
                    re.content = '写在模板的信息提示';
                    re.type = 1;
                    fun(re);
                    break;
                case '2':
                    re.content = '\<div test-directive\>\<\/div\>';
                    re.type = 2;
                    fun(re);
                    break;
                case '3'://变线路名称
                    re.content = '\<div change-line-name\>\<\/div\>';
                    re.type = 2;
                    fun(re);

                    break;
                case '4'://变线路价格
                    re.content = '\<div change-line-price\>\<\/div\>';
                    re.type = 2;
                    fun(re);

                    break;
                case '5'://操作说明
                    re.content = '\<div state\>\<\/div\>';
                    re.type = 2;
                    fun(re);

                    break;
                default :
                    re.content = 'item' + item + '未定义';
                    re.type = 1;
                    fun(re);
                    break;
            }
        }



        return alertDivRe;
    }
})();

