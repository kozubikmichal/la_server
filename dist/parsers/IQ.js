"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IQ = (function () {
    function IQ(isWeek) {
        if (isWeek === void 0) { isWeek = false; }
        this.isWeek = isWeek;
    }
    IQ.prototype.parseDay = function (dom, day) {
        var days = dom.window.document.querySelectorAll("dl.menuDayItems");
        var itemIndex = this.isWeek ? ((day - 1) * 2 + 1) : ((day - 1) * 2);
        var data = days.item(itemIndex);
        return Promise.resolve([{
                meals: this.processMenuList(data)
            }]);
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