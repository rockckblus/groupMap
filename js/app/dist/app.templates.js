angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('html/src/group/changeLineName.group.editPanel.directive.html',
    "<form>\n" +
    "    <fieldset>\n" +
    "        <legend>修改线路名称</legend>\n" +
    "        <label>当前名称:{{name}}</label>\n" +
    "        <span class=\"clear\"></span>\n" +
    "        <input type=\"text\" ng-model=\"name\" placeholder=\"请输入新名称\">\n" +
    "        <button type=\"submit\" style=\"margin-top: 10px\" class=\"btn btn-success closeButton\"  click-router-group=\"2\" lineName=\"{{name}}\" lineId=\"{{lineId}}\">修改</button>\n" +
    "    </fieldset>\n" +
    "</form>"
  );


  $templateCache.put('html/src/group/changeLinePrice.group.editPanel.directive.html',
    "<form>\n" +
    "    <fieldset>\n" +
    "        <legend>修改线路价格</legend>\n" +
    "        <label>当前价格:{{price}}</label>\n" +
    "        <span class=\"clear\"></span>\n" +
    "        <input type=\"number\" ng-model=\"price\" placeholder=\"请输入新价格\">\n" +
    "        <button type=\"submit\" style=\"margin-top: 10px\" class=\"btn btn-success closeButton\"  click-router-group=\"3\" linePrice=\"{{price}}\" lineId=\"{{lineId}}\">修改</button>\n" +
    "    </fieldset>\n" +
    "</form>"
  );


  $templateCache.put('html/src/group/leftTop1.group.lineRoad.html',
    "<div class=\"groupBlock block {{vo.thisItem}}\" ng-repeat=\"vo in lineList track by $index\">\n" +
    "    <h5 class=\"line\">\n" +
    "        <!--线路名称-->\n" +
    "        <span class=\"name\" style=\"font-size: 20px\" lineid=\"{{vo.id}}\" click-router-group=\"1\">{{vo.name}}</span>\n" +
    "        <span click-router-ui-block=\"alertDiv.alertInfo\" item=\"3\" lineId=\"{{vo.id}}\">[名称]</span>\n" +
    "        <span click-router-ui-block=\"alertDiv.alertInfo\" item=\"4\" lineId=\"{{vo.id}}\">[价格:{{vo.price}}]</span>\n" +
    "        <span click-router-group=\"8\" lineId=\"{{vo.id}}\">[排序]</span>\n" +
    "        <span click-router-group=\"9\" lineId=\"{{vo.id}}\">[删除]</span>\n" +
    "        <span class=\"right\" click-router-group=\"1\" lineid=\"{{vo.id}}\" style=\"width: 30px;\n" +
    "    \"><img style=\"width: 100%\" ng-src=\"{{vo.radio}}\"/></span>\n" +
    "    </h5>\n" +
    "\n" +
    "    <div class=\"itemBlock\">\n" +
    "        <li ng-repeat=\"vo2 in vo.goods track by $index \">\n" +
    "            <div>{{vo2.sh_address}}</div>\n" +
    "            <div class=\"closeBut\" goodid=\"{{vo2.id}}\" lineid=\"{{vo.id}}\" click-router-group=\"6\">×</div>\n" +
    "        </li>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('html/src/group/sort.sort.sortGroup.html',
    "<div class=\"container\" style=\"margin-top: 50px\" ng-show=\"show\">\n" +
    "    <div>\n" +
    "        <h5 class=\"line\">\n" +
    "            <!--线路名称-->\n" +
    "            <span class=\"name\" style=\"font-size: 20px;color: #fff\">{{name}}</span>\n" +
    "            <button class=\"right btn btn-large btn-success ng-isolate-scope\" type=\"button\" ng-click=\"show = false\" style=\"margin-top: -20px\">保存</button>\n" +
    "        </h5>\n" +
    "\n" +
    "        <div>\n" +
    "            <ul ng-sortable=\"sortableConfig\" class=\"unstyled\">\n" +
    "                <li ng-repeat=\"todo in todos track by $index\">\n" +
    "                    <span class=\"left\"><img src=\"images/move.png\"/></span> <span class=\"left\">{{todo.sh_address}}</span>\n" +
    "                    <span class=\"right\" style=\"font-size: 20px;margin-top: -5px;color: red;font-weight: bold\">{{$index + 1}}</span>\n" +
    "                    <span class=\"left linkMouse\" goodid=\"{{todo.id}}\" lineid=\"{{thisLineId}}\" style=\"color: red\"\n" +
    "                          click-router-group=\"6\">&nbsp;[删除]</span>\n" +
    "                    <span class=\"clear\"></span>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div style=\"clear: both\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('html/src/group/state.group.stateText.directive.html',
    "<div class=\"clear\" style=\"width: 500px\">\n" +
    "    红色星星:当前编辑的线路多个货物<br/>\n" +
    "    蓝色星星:尚未分配线路的货物<br/>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('html/src/group/topGoodsList.group.topGoodsList.directive.html',
    "<div class=\"block goodsList\">\n" +
    "    <li ng-repeat=\"vo in list track by $index \" goodId=\"{{vo.id}}\" click-router-group=\"4\" ng-if=\"vo.show\">\n" +
    "        <div>{{vo.sh_address}}</div>\n" +
    "    </li>\n" +
    "</div>\n" +
    "<div class=\"clear\"></div>\n"
  );


  $templateCache.put('html/src/public/uiBlock/alertDiv/alertInfo.alertDiv.showInfo.directive.html',
    "<div id=\"alertInfo\" ng-show=\"show\">\n" +
    "    <div class=\"block blockContent\" id=\"infoContent\">\n" +
    "        <div class=\"closeButton\" id=\"alertInfoCloseButton\">&times;</div>\n" +
    "        <div class=\"content\" id=\"reBindContent\" >{{content}}</div>\n" +
    "        <div id=\"otherData\" data=\"{{otherData}}\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"backPositon \"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('html/src/public/uiBlock/alertDiv/alertWarn.alertDiv.alertWarn.directive.html',
    "<div id=\"alertWarn\" ng-show=\"show\">\n" +
    "    <div class=\"block2 blockContent\" id=\"warnContent\">\n" +
    "        <div class=\"closeButton\" id=\"alertWarnCloseButton\">&times;</div>\n" +
    "        <div class=\"content\" id=\"reBindWarnContent\">{{content}}</div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
