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
var UTesareVIP = /** @class */ (function (_super) {
    __extends(UTesareVIP, _super);
    function UTesareVIP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    UTesareVIP.prototype.parseDay = function (dom, day, data) {
        var _this = this;
        return this.downloadMenu()
            .then(function (menu) { return _this.parsePdfMenu(menu); })
            .then(function (menu) {
            return [{
                    meals: _this.processVIPMenu(menu)
                }];
        });
    };
    UTesareVIP.prototype.processVIPMenu = function (rows) {
        var index = this.indexOfRow(rows, "V.I.P.") + 1;
        var meals = [];
        var meal = "";
        while (index < rows.length) {
            meal = (meal + " " + rows[index++]).trim();
            var priceIndex = meal.search(UTesareVIP.REGEX_PRICE);
            if (priceIndex !== -1) {
                meals.push({
                    name: this.normalizeName(meal.substr(0, priceIndex)),
                    price: meal.substr(priceIndex)
                });
                meal = "";
            }
        }
        return meals;
    };
    return UTesareVIP;
}(UTesareBase_1["default"]));
exports["default"] = UTesareVIP;
//# sourceMappingURL=UTesareVIP.js.map