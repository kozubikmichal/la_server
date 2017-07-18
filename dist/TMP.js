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
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_ioc_1 = require("typescript-ioc");
var IMenuProvider_1 = require("./IMenuProvider");
var MenuProvider = (function () {
    function MenuProvider() {
    }
    /**
     * Gets today menus for all restaurants
     */
    MenuProvider.prototype.getMenusToday = function () { console.log("MENUS"); return null; };
    /**
     * Gets today menu for one restaurant
     * @param restaurantId restaurant id
     */
    MenuProvider.prototype.getMenuToday = function (restaurantId) { console.log(restaurantId); return null; };
    return MenuProvider;
}());
MenuProvider = __decorate([
    typescript_ioc_1.Provides(IMenuProvider_1.default),
    __metadata("design:paramtypes", [])
], MenuProvider);
exports.default = MenuProvider;
//# sourceMappingURL=TMP.js.map