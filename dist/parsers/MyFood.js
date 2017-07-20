"use strict";
exports.__esModule = true;
/**
 * MyFood restaurant menu parser
 */
var MyFood = (function () {
    function MyFood() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    MyFood.prototype.parseDay = function (dom, day) {
        var dayData = dom.window.document.querySelectorAll("div.jidla>div").item(day - 1);
        return Promise.resolve([{
                meals: this.processMenuList(dayData.children[0]).concat(this.processMenuList(dayData.children[1]))
            }]);
    };
    MyFood.prototype.processMenuList = function (list) {
        var meals = [];
        var data = list.children[1];
        for (var i = 0; i < data.children.length; ++i) {
            meals.push({
                name: data.children[i].children[0].textContent,
                price: this.normalizePrice(data.children[i].children[1].textContent)
            });
        }
        return meals;
    };
    MyFood.prototype.normalizePrice = function (price) {
        return price.replace(" Kč", ",-");
    };
    return MyFood;
}());
exports["default"] = MyFood;
//# sourceMappingURL=MyFood.js.map