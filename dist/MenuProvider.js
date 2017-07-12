"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SourcesManager_1 = require("./SourcesManager");
var Request_1 = require("./Request");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var MenuProvider = (function () {
    function MenuProvider() {
        this.sourcesManager = new SourcesManager_1.default();
    }
    MenuProvider.prototype.getAllMenusToday = function () {
        var _this = this;
        return Promise.all(this.sourcesManager.getSources().map(function (source) {
            return _this.getMenuToday(source.menuUrl, source.parser).then(function (menus) {
                return {
                    restaurant: source.restaurant,
                    menus: menus
                };
            });
        }));
    };
    MenuProvider.prototype.getMenu = function (url, parser, day) {
        return Request_1.default.get(url).then(function (data) {
            var dom = new JSDOM(data);
            return parser.parseDay(dom, day);
        });
    };
    MenuProvider.prototype.getMenuToday = function (url, parser) {
        return this.getMenu(url, parser, (new Date()).getDay());
    };
    return MenuProvider;
}());
exports.default = MenuProvider;
//# sourceMappingURL=MenuProvider.js.map