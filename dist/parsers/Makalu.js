"use strict";
exports.__esModule = true;
/**
 * Makalu restaurant menu parser
 */
var Makalu = /** @class */ (function () {
    function Makalu() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    Makalu.prototype.parseDay = function (dom, day) {
        var daysData = [];
        var days = dom.window.document.querySelectorAll(".TJden");
        for (var i = 0; i < days.length; ++i) {
            daysData.push(days.item(i).nextElementSibling);
        }
        return Promise.resolve([{
                meals: this.processMenuList(days.item(day - 1).nextElementSibling)
            }]);
    };
    Makalu.prototype.processMenuList = function (dayData) {
        var meals = [];
        var mainMeals = dayData.getElementsByTagName("b");
        meals.push({
            name: dayData.textContent.substr(0, dayData.textContent.indexOf("Cena")),
            price: ""
        });
        for (var i = 0; i < mainMeals.length; ++i) {
            var data = mainMeals.item(i);
            var price = data.getElementsByClassName("cena").item(0).innerHTML;
            var name_1 = data.textContent.replace(price, "");
            var description = data.nextSibling.textContent;
            meals.push({
                name: this.normalizeName(name_1, description),
                price: this.normalizePrice(price)
            });
        }
        return meals;
    };
    Makalu.prototype.normalizeName = function (name, description) {
        var normalizedName = name.replace(/^\d+\./, "");
        return normalizedName.trim() + " (" + description.trim() + ")";
    };
    Makalu.prototype.normalizePrice = function (price) {
        return price.replace(/ .+$/, ",-");
    };
    return Makalu;
}());
exports["default"] = Makalu;
//# sourceMappingURL=Makalu.js.map