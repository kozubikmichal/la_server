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
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IRequest_1 = require("../IRequest");
var DAILY_MENU_URL = "https://developers.zomato.com/api/v2.1/dailymenu";
var USER_KEY = "b0a94ba965b2a1bbcdfc59d1632e0a6d";
/**
 * U Tesare restaurant menu parser
 */
var Zomato = /** @class */ (function () {
    function Zomato(restaurantId) {
        this.restaurantId = restaurantId;
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    Zomato.prototype.parseDay = function (dom, day, data) {
        var _this = this;
        return this.downloadMenu()
            .then(function (data) { return _this.parse(data); });
    };
    Zomato.prototype.downloadMenu = function () {
        return this.request.get(DAILY_MENU_URL, {
            params: {
                res_id: this.restaurantId
            },
            headers: {
                accept: "application/json",
                user_key: USER_KEY
            }
        });
    };
    Zomato.prototype.parse = function (menu) {
        return menu.daily_menus.map(function (dailyMenu) {
            return {
                name: dailyMenu.daily_menu.name,
                meals: dailyMenu.daily_menu.dishes.map(function (dish) {
                    return {
                        name: dish.dish.name,
                        price: dish.dish.price
                    };
                })
            };
        });
    };
    __decorate([
        typescript_ioc_1.Inject,
        __metadata("design:type", IRequest_1["default"])
    ], Zomato.prototype, "request");
    return Zomato;
}());
exports["default"] = Zomato;
//# sourceMappingURL=Zomato.js.map