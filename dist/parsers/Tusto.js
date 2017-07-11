"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tusto = (function () {
    function Tusto() {
    }
    Tusto.prototype.parseDay = function (dom, day) {
        var menu = dom.window.document.querySelectorAll("table.menu").item(day - 1);
        var dayData = menu.children.item(0);
        return [{
                meals: this.processMenuList(dayData)
            }];
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
exports.default = Tusto;
//# sourceMappingURL=Tusto.js.map