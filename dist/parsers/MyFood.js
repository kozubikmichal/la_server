"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * MyFood restaurant menu parser
 */
class MyFood {
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    parseDay(dom, day) {
        let soupIndex = (day - 1) * 2;
        let allData = dom.window.document.querySelectorAll(`div.item`);
        return Promise.resolve([{
                meals: this.processMenuList(allData.item(soupIndex)).concat(this.processMenuList(allData.item(soupIndex + 1)))
            }]);
    }
    processMenuList(list) {
        let meals = [];
        let data = list.children[1];
        for (let i = 0; i < data.children.length; ++i) {
            meals.push({
                name: data.children[i].children[0].textContent,
                price: this.normalizePrice(data.children[i].children[1].textContent)
            });
        }
        return meals;
    }
    normalizePrice(price) {
        return price.replace(" Kč", ",-");
    }
}
exports.default = MyFood;
//# sourceMappingURL=MyFood.js.map