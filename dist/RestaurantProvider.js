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
exports.__esModule = true;
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
    return RestaurantProvider;
}(IRestaurantProvider_1["default"]));
exports["default"] = RestaurantProvider;
//# sourceMappingURL=RestaurantProvider.js.map