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
    MenuProvider.prototype.getMenusToday = function () {
        var _this = this;
        return Promise.all(this.sourcesManager.getSources().map(function (source) {
            return _this.parseMenuToday(source.menuUrl, source.parser).then(function (menus) {
                return {
                    restaurant: source.restaurant,
                    menus: menus
                };
            });
        }));
    };
    MenuProvider.prototype.getMenuToday = function (restaurantId) {
        var source = this.sourcesManager.getSource(restaurantId);
        if (!source) {
            return Promise.resolve({
                restaurant: {
                    id: "",
                    name: "unknown",
                    url: ""
                },
                menus: []
            });
        }
        return this.parseMenuToday(source.menuUrl, source.parser).then(function (menus) {
            return {
                restaurant: source.restaurant,
                menus: menus
            };
        });
    };
    MenuProvider.prototype.parseMenu = function (url, parser, day) {
        return Request_1.default.get(url).then(function (data) {
            var dom = new JSDOM(data);
            return parser.parseDay(dom, day);
        });
    };
    MenuProvider.prototype.parseMenuToday = function (url, parser) {
        return this.parseMenu(url, parser, (new Date()).getDay());
    };
    return MenuProvider;
}());
exports.default = MenuProvider;
//# sourceMappingURL=MenuProvider.js.map