"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IQ = (function () {
    function IQ() {
    }
    IQ.prototype.parseDay = function (dom, day) {
        var days = dom.window.document.querySelectorAll("dl.menuDayItems");
        var dayData = days.item(day * 2 - 1);
        var weekData = days.item(day * 2);
        return [{
                meals: this.processMenuList(dayData)
            }, {
                name: "Týdenní nabídka",
                meals: this.processMenuList(weekData)
            }];
    };
    IQ.prototype.processMenuList = function (list) {
        var meals = [];
        var mainMealIndex = 1;
        for (var i = 0; i < list.children.length; i += 2) {
            list.children[i].removeChild(list.children[i].children[0]);
            meals.push({
                name: list.children[i].textContent,
                price: this.normalizePrice(list.children[i + 1].textContent)
            });
        }
        return meals;
    };
    IQ.prototype.normalizePrice = function (price) {
        return price.replace(/\(.*\)/, "").trim();
    };
    return IQ;
}());
exports.default = IQ;
//# sourceMappingURL=IQ.js.map