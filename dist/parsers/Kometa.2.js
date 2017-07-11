"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Kometa = (function () {
    function Kometa() {
    }
    Kometa.prototype.parseDay = function (dom, day) {
        var dayData = dom.window.document.querySelectorAll("div#div" + day + " tr");
        return [{
                meals: this.processMenuList(dayData)
            }];
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
exports.default = Kometa;
//# sourceMappingURL=Kometa.2.js.map