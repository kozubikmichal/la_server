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
        var soupData = dom.window.document.querySelectorAll("div#menu-day-ct p").item(1);
        var soupMeal = soupData && soupData.textContent.startsWith("Polévka:") && {
            name: soupData.textContent,
            price: ""
        };
        return Promise.resolve([{
                meals: this.processMenuList(dayData, soupMeal)
            }]);
    };
    Kometa.prototype.processMenuList = function (list, soupMeal) {
        var meals = soupMeal ? [soupMeal] : [];
        for (var i = 0; i < list.length; ++i) {
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