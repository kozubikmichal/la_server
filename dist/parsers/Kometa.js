"use strict";
exports.__esModule = true;
var DAY_IDS = [
    "po",
    "ut",
    "st",
    "ct",
    "pa",
];
/**
 * Kometa restaurant menu parser
 */
var Kometa = /** @class */ (function () {
    function Kometa() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    Kometa.prototype.parseDay = function (dom, day) {
        var divId = "menu-day-" + DAY_IDS[day - 1];
        var dayData = dom.window.document.querySelectorAll("div#" + divId + " tr");
        return Promise.resolve([{
                meals: this.processMenuList(dayData)
            }]);
    };
    Kometa.prototype.processMenuList = function (list) {
        var meals = [];
        for (var i = 1; i < list.length; ++i) {
            var row = list.item(i);
            meals.push({
                name: this.normalizeName(row.children[1].textContent),
                price: row.children[2].textContent
            });
        }
        return meals;
    };
    Kometa.prototype.normalizeName = function (name) {
        return name.trim();
    };
    return Kometa;
}());
exports["default"] = Kometa;
//# sourceMappingURL=Kometa.js.map