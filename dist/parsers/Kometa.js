"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Kometa restaurant menu parser
 */
class Kometa {
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    parseDay(dom, day) {
        let dayData = dom.window.document.querySelectorAll(`div#div${day} tr`);
        return Promise.resolve([{
                meals: this.processMenuList(dayData)
            }]);
    }
    processMenuList(list) {
        let meals = [];
        for (let i = 1; i < list.length; ++i) {
            let row = list.item(i);
            meals.push({
                name: this.normalizeName(row.children[0].textContent),
                price: row.children[1].textContent
            });
        }
        return meals;
    }
    normalizeName(name) {
        return name.trim();
    }
}
exports.default = Kometa;
//# sourceMappingURL=Kometa.js.map