"use strict";
exports.__esModule = true;
/**
 * Tusto restaurant menu parser
 */
var Tusto = /** @class */ (function () {
    function Tusto() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     */
    Tusto.prototype.parseDay = function (dom) {
        var index = this.getDayIndex(dom);
        var menu = dom.window.document.querySelectorAll("table.menu").item(index);
        var dayData = menu.children.item(0);
        return Promise.resolve([{
                meals: this.processMenuList(dayData)
            }]);
    };
    Tusto.prototype.getDayIndex = function (dom) {
        var now = new Date();
        var regex = new RegExp("\\w\\s" + now.getDate() + "." + (now.getMonth() + 1) + ".");
        var dates = dom.window.document.querySelectorAll("table.menu > tbody > tr:first-child > td:first-child");
        var dayIndex = 0;
        for (var i = 0; i < dates.length; ++i) {
            if (dates.item(i).textContent.search(regex) > -1) {
                dayIndex = i;
                break;
            }
        }
        return dayIndex;
    };
    Tusto.prototype.processMenuList = function (list) {
        var meals = [];
        for (var i = 1; i < list.children.length; ++i) {
            var row = list.children[i];
            meals.push({
                name: this.normalizeName(row.children[0].textContent),
                price: this.normalizePrice(row.children[2].textContent)
            });
        }
        return meals;
    };
    Tusto.prototype.normalizeName = function (name) {
        return name.replace(/^\d+\)\s*/, "").trim();
    };
    Tusto.prototype.normalizePrice = function (price) {
        return price.replace("Kč", "").trim();
    };
    return Tusto;
}());
exports["default"] = Tusto;
//# sourceMappingURL=Tusto.js.map