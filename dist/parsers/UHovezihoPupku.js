"use strict";
exports.__esModule = true;
/**
 * U Hoveziho pupku restaurant menu parser
 */
var UHovezihoPupku = /** @class */ (function () {
    function UHovezihoPupku() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    UHovezihoPupku.prototype.parseDay = function (dom, day) {
        var menus = dom.window.document.querySelectorAll("table.menu_den");
        var dayMenu = menus.item(day + 1);
        var weekMenu = menus.item(menus.length - 1);
        return Promise.resolve([{
                meals: this.processMenuList(dayMenu)
            }, {
                name: "Stálé jídlo na menu",
                meals: this.processMenuList(weekMenu)
            }]);
    };
    UHovezihoPupku.prototype.processMenuList = function (list) {
        var meals = [];
        var names = list.querySelectorAll(".menu_jidlo_text");
        var prices = list.querySelectorAll(".menu_jidlo_cena");
        for (var i = 0; i < names.length; ++i) {
            meals.push({
                name: names.item(i).textContent,
                price: prices.item(i).textContent
            });
        }
        return meals;
    };
    return UHovezihoPupku;
}());
exports["default"] = UHovezihoPupku;
//# sourceMappingURL=UHovezihoPupku.js.map