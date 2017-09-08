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
exports.__esModule = true;
var UTesareBase_1 = require("./UTesareBase");
/**
 * U Tesare restaurant menu parser
 */
var UTesare = (function (_super) {
    __extends(UTesare, _super);
    function UTesare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    UTesare.prototype.parseDay = function (dom, day, data) {
        var _this = this;
        return this.downloadMenu()
            .then(function () { return _this.parsePdfMenu(); })
            .then(function (menu) {
            return [{
                    meals: _this.processDayMenu(menu, day - 1)
                }];
        });
    };
    UTesare.prototype.processDayMenu = function (rows, day) {
        var index = this.indexOfRow(rows, UTesare.DAY_SEPARATOR[day]) + 1;
        var meals = [];
        var meal = "";
        meals.push({
            name: rows[index++],
            price: ""
        });
        while (!meal.startsWith(UTesare.DAY_SEPARATOR[day + 1])) {
            meal = (meal + " " + rows[index++]).trim();
            if (meal.startsWith("Sladké")) {
                meal = "";
                continue;
            }
            var mealIndex = meal.search(UTesare.REGEX_MEAL_INDEX);
            var priceIndex = meal.search(UTesare.REGEX_PRICE);
            if (mealIndex !== -1 && priceIndex !== -1) {
                meals.push({
                    name: this.normalizeName(meal.substr(0, priceIndex)),
                    price: meal.substr(priceIndex)
                });
                meal = "";
            }
        }
        return meals;
    };
    return UTesare;
}(UTesareBase_1["default"]));
exports["default"] = UTesare;
//# sourceMappingURL=UTesare.js.map