"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_ioc_1 = require("typescript-ioc");
var IMenuProvider_1 = require("./IMenuProvider");
var ISourcesManager_1 = require("./ISourcesManager");
var IRequest_1 = require("./IRequest");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
/**
 * Provides menu for the restaurants
 */
var MenuProvider = (function (_super) {
    __extends(MenuProvider, _super);
    function MenuProvider(sourcesManager, request) {
        var _this = _super.call(this) || this;
        _this.sourcesManager = sourcesManager;
        _this.request = request;
        console.log("ASDASD");
        console.log(_this.sourcesManager);
        console.log(_this.request);
        return _this;
    }
    /**
     * Gets today menus for all restaurants
     */
    MenuProvider.prototype.getMenusToday = function () {
        return null;
        // return Promise.all(
        // 	this.sourcesManager.getSources().map((source) => {
        // 		return this.parseMenuToday(source.menuUrl, source.parser).then(menus => {
        // 			return {
        // 				restaurant: source.restaurant,
        // 				menus: menus
        // 			}
        // 		})
        // 	})
        // )
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
        return this.request.get(url).then(function (data) {
            var dom = new JSDOM(data);
            return parser.parseDay(dom, day);
        });
    };
    MenuProvider.prototype.parseMenuToday = function (url, parser) {
        return this.parseMenu(url, parser, (new Date()).getDay());
    };
    return MenuProvider;
}(IMenuProvider_1.default));
MenuProvider = __decorate([
    typescript_ioc_1.Provides(IMenuProvider_1.default),
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [ISourcesManager_1.default,
        IRequest_1.default])
], MenuProvider);
exports.default = MenuProvider;
//# sourceMappingURL=MenuProvider.js.map