"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rebio restaurant menu parser
 */
class Rebio {
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    parseDay(dom, day) {
        let date = new Date();
        date.setDate(date.getDate() + (day - date.getDay()));
        let id = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        let dayHeader = dom.window.document.querySelector(`h3[id='${id}']`);
        return Promise.resolve([{
                meals: this.getMeals(dayHeader)
            }]);
    }
    getMeals(dayHeader) {
        return dayHeader ? this.processMenuList(dayHeader.nextElementSibling) : [];
    }
    processMenuList(list) {
        let meals = [];
        for (let i = 0; i < list.children.length; ++i) {
            let row = list.children[i];
            meals.push({
                name: row.children[0].textContent,
                price: ""
            });
        }
        return meals;
    }
}
exports.default = Rebio;
//# sourceMappingURL=Rebio.js.map