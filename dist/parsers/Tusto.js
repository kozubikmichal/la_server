"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tusto restaurant menu parser
 */
class Tusto {
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    parseDay(dom, day) {
        let menu = dom.window.document.querySelectorAll(`table.menu`).item(day - 1);
        let dayData = menu.children.item(0);
        return Promise.resolve([{
                meals: this.processMenuList(dayData)
            }]);
    }
    processMenuList(list) {
        let meals = [];
        for (let i = 1; i < list.children.length; ++i) {
            let row = list.children[i];
            meals.push({
                name: this.normalizeName(row.children[0].textContent),
                price: this.normalizePrice(row.children[2].textContent)
            });
        }
        return meals;
    }
    normalizeName(name) {
        return name.replace(/^\d+\)\s*/, "").trim();
    }
    normalizePrice(price) {
        return price.replace("Kč", "").trim();
    }
}
exports.default = Tusto;
//# sourceMappingURL=Tusto.js.map