"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IMenu_1 = require("./IMenu");
var ISourcesManager_1 = require("./ISourcesManager");
var IRequest_1 = require("./IRequest");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
/**
 * Provides menu for the restaurants
 */
var MenuProvider = /** @class */ (function () {
    function MenuProvider(sourcesManager, request) {
        this.sourcesManager = sourcesManager;
        this.request = request;
    }
    /**
     * Gets today menus for all restaurants
     */
    MenuProvider.prototype.getMenusToday = function () {
        var _this = this;
        return Promise.all(this.sourcesManager.getSources().map(function (source) {
            return _this.parseMenuToday(source.menuUrl, source.parser).then(function (menus) {
                return {
                    restaurant: source.restaurant,
                    menus: menus
                };
            })["catch"](function () {
                return null;
            });
        }).filter(Boolean));
    };
    /**
     * Gets today menu for one restaurant
     * @param restaurantId restaurant id
     */
    MenuProvider.prototype.getMenuToday = function (restaurantId) {
        var source = this.sourcesManager.getSource(restaurantId);
        if (!source) {
            return Promise.resolve({
                restaurant: {
                    id: "",
                    name: "unknown",
                    url: "",
                    position: {
                        lat: "",
                        lng: ""
                    }
                },
                menus: [],
                type: IMenu_1.MenuType.Standard
            });
        }
        switch (source.type) {
            case IMenu_1.MenuType.PDF: {
                return source.pdfInfoProvider.getDayInfo(this.getTodayDay()).then(function (info) {
                    return {
                        restaurant: source.restaurant,
                        menus: [],
                        type: IMenu_1.MenuType.PDF,
                        pdfInfo: info
                    };
                });
            }
            default: {
                return this.parseMenuToday(source.menuUrl, source.parser).then(function (menus) {
                    return {
                        restaurant: source.restaurant,
                        menus: menus,
                        type: IMenu_1.MenuType.Standard
                    };
                });
            }
        }
    };
    MenuProvider.prototype.parseMenu = function (url, parser, day) {
        var dataPromise = url.length > 0 ? this.request.get(url) : Promise.resolve();
        return dataPromise.then(function (data) {
            var dom = new JSDOM(data);
            return parser.parseDay(dom, day, data);
        });
    };
    MenuProvider.prototype.parseMenuToday = function (url, parser) {
        return this.parseMenu(url, parser, this.getTodayDay());
    };
    MenuProvider.prototype.getTodayDay = function () {
        return new Date().getDay();
    };
    MenuProvider = __decorate([
        __param(0, typescript_ioc_1.Inject),
        __param(1, typescript_ioc_1.Inject),
        __metadata("design:paramtypes", [ISourcesManager_1["default"],
            IRequest_1["default"]])
    ], MenuProvider);
    return MenuProvider;
}());
exports["default"] = MenuProvider;
//# sourceMappingURL=MenuProvider.js.map