"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DAY_NAMES = [
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
];
const MENU_PRICE_PARAGRAPH = "Cena menu:";
const MENU_PRICE_PARAGRAPH_END = "K menu:";
/**
 * Spilberk restaurant menu parser
 */
class Spilberk {
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    parseDay(dom, day) {
        let dayName = DAY_NAMES[day - 1];
        let paragraphs = dom.window.document.querySelectorAll(`p`);
        let dayIndex = this.indexOfParagraph(paragraphs, dayName);
        let priceIndex = this.indexOfParagraph(paragraphs, MENU_PRICE_PARAGRAPH);
        return Promise.resolve([{
                meals: this.processMenuList(paragraphs, dayIndex + 1)
            }, {
                name: MENU_PRICE_PARAGRAPH,
                meals: this.processPriceList(paragraphs, priceIndex + 1)
            }]);
    }
    processMenuList(list, dayIndex) {
        let meals = [];
        for (let i = dayIndex; dayIndex < list.length; ++i) {
            if (list.item(i).textContent.trim().length === 0) {
                break;
            }
            meals.push({
                name: list.item(i).textContent
            });
        }
        return meals;
    }
    processPriceList(list, index) {
        let meals = [];
        for (let i = index; index < list.length; ++i) {
            let item = list.item(i).textContent;
            if (item.trim().length === 0 || item === MENU_PRICE_PARAGRAPH_END) {
                break;
            }
            item.split(String.fromCharCode(160))
                .filter(String).map(text => text.trim())
                .forEach(text => {
                let delimiter = text.search(/\d+\s*,-\s*Kč$/);
                meals.push({
                    name: text.substr(0, delimiter).replace(/\s*[-–]\s*$/, "").trim(),
                    price: text.substr(delimiter).replace("Kč", "").trim()
                });
            });
        }
        return meals;
    }
    indexOfParagraph(paragraphs, content, startIndex = 0) {
        for (let i = startIndex; i < paragraphs.length; ++i) {
            if (paragraphs.item(i).textContent.trim() === content) {
                return i;
            }
        }
        return -1;
    }
}
exports.default = Spilberk;
//# sourceMappingURL=Spilberk.js.map