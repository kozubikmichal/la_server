"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * IQ restaurant menu parser
 */
class IQ {
    /**
     * Constructor
     *
     * @param isWeek true if weekly menu is required
     */
    constructor(isWeek = false) {
        this.isWeek = isWeek;
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    parseDay(dom, day) {
        let days = dom.window.document.querySelectorAll("dl.menuDayItems");
        let itemIndex = this.isWeek ? ((day - 1) * 2 + 1) : ((day - 1) * 2);
        let data = days.item(itemIndex);
        return Promise.resolve([{
                meals: this.processMenuList(data)
            }]);
    }
    processMenuList(list) {
        let meals = [];
        let mainMealIndex = 1;
        for (let i = 0; i < list.children.length; i += 2) {
            list.children[i].removeChild(list.children[i].children[0]);
            meals.push({
                name: list.children[i].textContent,
                price: this.normalizePrice(list.children[i + 1].textContent)
            });
        }
        return meals;
    }
    normalizePrice(price) {
        return price.replace(/\(.*\)/, "").trim();
    }
}
exports.default = IQ;
//# sourceMappingURL=IQ.js.map