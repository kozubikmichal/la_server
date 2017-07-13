"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restaurants_1 = require("./data/restaurants");
var RestaurantProvider = (function () {
    function RestaurantProvider() {
    }
    RestaurantProvider.prototype.getRestaurants = function () {
        return Promise.resolve(Object.keys(restaurants_1.default).map(function (key) {
            return restaurants_1.default[key];
        }));
    };
    return RestaurantProvider;
}());
exports.default = RestaurantProvider;
//# sourceMappingURL=RestaurantProvider.js.map