"use strict";
exports.__esModule = true;
/**
 * Kometa restaurant menu parser
 */
var Kometa = (function () {
    function Kometa() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    Kometa.prototype.parseDay = function (dom, day) {
        var dayData = dom.window.document.querySelectorAll("div#div" + day + " tr");
        return Promise.resolve([{
                meals: this.processMenuList(dayData)
            }]);
    };
    Kometa.prototype.processMenuList = function (list) {
        var meals = [];
        for (var i = 1; i < list.length; ++i) {
            var row = list.item(i);
            meals.push({
                name: this.normalizeName(row.children[0].textContent),
                price: row.children[1].textContent
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