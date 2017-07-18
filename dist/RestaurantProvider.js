"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const IRestaurantProvider_1 = require("./IRestaurantProvider");
const restaurants_1 = require("./data/restaurants");
/**
 * Restaurant provider
 */
let RestaurantProvider = class RestaurantProvider extends IRestaurantProvider_1.default {
    /**
     * Gets data for all restaurants
     */
    getRestaurants() {
        return Promise.resolve(Object.keys(restaurants_1.default).map((key) => {
            return restaurants_1.default[key];
        }));
    }
};
RestaurantProvider = __decorate([
    typescript_ioc_1.Provides(IRestaurantProvider_1.default)
], RestaurantProvider);
exports.default = RestaurantProvider;
//# sourceMappingURL=RestaurantProvider.js.map