"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyFood = (function () {
    function MyFood() {
    }
    MyFood.prototype.parseDay = function (dom, day) {
        var soupIndex = (day - 1) * 2;
        var allData = dom.window.document.querySelectorAll("div.item");
        return Promise.resolve([{
                meals: this.processMenuList(allData.item(soupIndex)).concat(this.processMenuList(allData.item(soupIndex + 1)))
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
exports.default = MyFood;
//# sourceMappingURL=MyFood.js.map