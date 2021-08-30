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
        var sections = dom.window.document.querySelectorAll(".weekly-list");
        return Promise.resolve([{
                name: "Denní menu",
                meals: this.processSoupList(dom)
                    .concat(this.processMenuList(sections.item(0)))
            }, {
                name: "Týdenní menu",
                meals: this.processMenuList(sections.item(1))
            }]);
    };
    Tusto.prototype.processSoupList = function (dom) {
        var meals = [];
        var soups = dom.window.document.querySelectorAll(".soap .soap-list li");
        console.log(soups);
        soups.forEach(function (soup) {
            meals.push({
                name: soup.children[0].childNodes[0].textContent,
                price: soup.children[1].textContent
            });
        });
        return meals;
    };
    Tusto.prototype.processMenuList = function (menuSection) {
        var meals = [];
        var items = menuSection.querySelectorAll("li");
        items.forEach(function (item) {
            meals.push({
                name: item.children[1].childNodes[0].textContent,
                price: item.children[2].textContent
            });
        });
        return meals;
    };
    return Tusto;
}());
exports["default"] = Tusto;
//# sourceMappingURL=Tusto.js.map