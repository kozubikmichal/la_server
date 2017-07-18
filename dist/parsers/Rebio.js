"use strict";
exports.__esModule = true;
/**
 * Rebio restaurant menu parser
 */
var Rebio = (function () {
    function Rebio() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    Rebio.prototype.parseDay = function (dom, day) {
        var date = new Date();
        date.setDate(date.getDate() + (day - date.getDay()));
        var id = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        var dayHeader = dom.window.document.querySelector("h3[id='" + id + "']");
        return Promise.resolve([{
                meals: this.getMeals(dayHeader)
            }]);
    };
    Rebio.prototype.getMeals = function (dayHeader) {
        return dayHeader ? this.processMenuList(dayHeader.nextElementSibling) : [];
    };
    Rebio.prototype.processMenuList = function (list) {
        var meals = [];
        for (var i = 0; i < list.children.length; ++i) {
            var row = list.children[i];
            meals.push({
                name: row.children[0].textContent,
                price: ""
            });
        }
        return meals;
    };
    return Rebio;
}());
exports["default"] = Rebio;
//# sourceMappingURL=Rebio.js.map