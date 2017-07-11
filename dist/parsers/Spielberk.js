"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Spielberk = (function () {
    function Spielberk() {
    }
    Spielberk.prototype.parseDay = function (dom, day) {
        var soupIndex = (day - 1) * 2;
        var allData = dom.window.document.querySelectorAll("div.item");
        return [{
                meals: this.processMenuList(allData.item(soupIndex)).concat(this.processMenuList(allData.item(soupIndex + 1)))
            }];
    };
    Spielberk.prototype.processMenuList = function (list) {
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
    Spielberk.prototype.normalizePrice = function (price) {
        return price.replace("Kč", ",-");
    };
    return Spielberk;
}());
exports.default = Spielberk;
//# sourceMappingURL=Spielberk.js.map