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
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IRestaurantProvider_1 = require("./IRestaurantProvider");
var restaurants_1 = require("./data/restaurants");
/**
 * Restaurant provider
 */
var RestaurantProvider = (function (_super) {
    __extends(RestaurantProvider, _super);
    function RestaurantProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets data for all restaurants
     */
    RestaurantProvider.prototype.getRestaurants = function () {
        return Promise.resolve(Object.keys(restaurants_1["default"]).map(function (key) {
            return restaurants_1["default"][key];
        }));
    };
    return RestaurantProvider;
}(IRestaurantProvider_1["default"]));
RestaurantProvider = __decorate([
    typescript_ioc_1.Provides(IRestaurantProvider_1["default"])
], RestaurantProvider);
exports["default"] = RestaurantProvider;
//# sourceMappingURL=RestaurantProvider.js.map