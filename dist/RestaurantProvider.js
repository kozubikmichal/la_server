"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var RestaurantProvider = /** @class */ (function (_super) {
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
    RestaurantProvider = __decorate([
        typescript_ioc_1.Provides(IRestaurantProvider_1["default"])
    ], RestaurantProvider);
    return RestaurantProvider;
}(IRestaurantProvider_1["default"]));
exports["default"] = RestaurantProvider;
//# sourceMappingURL=RestaurantProvider.js.map