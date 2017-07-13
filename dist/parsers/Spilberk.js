"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DAY_NAMES = [
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
];
var MENU_PRICE_PARAGRAPH = "Cena menu:";
var MENU_PRICE_PARAGRAPH_END = "K menu:";
var Spilberk = (function () {
    function Spilberk() {
    }
    Spilberk.prototype.parseDay = function (dom, day) {
        var dayName = DAY_NAMES[day];
        var paragraphs = dom.window.document.querySelectorAll("p");
        var dayIndex = this.indexOfParagraph(paragraphs, dayName);
        var priceIndex = this.indexOfParagraph(paragraphs, MENU_PRICE_PARAGRAPH);
        return Promise.resolve([{
                meals: this.processMenuList(paragraphs, dayIndex + 1)
            }, {
                name: MENU_PRICE_PARAGRAPH,
                meals: this.processPriceList(paragraphs, priceIndex + 1)
            }]);
    };
    Spilberk.prototype.processMenuList = function (list, dayIndex) {
        var meals = [];
        for (var i = dayIndex; dayIndex < list.length; ++i) {
            if (list.item(i).textContent.trim().length === 0) {
                break;
            }
            meals.push({
                name: list.item(i).textContent
            });
        }
        return meals;
    };
    Spilberk.prototype.processPriceList = function (list, index) {
        var meals = [];
        for (var i = index; index < list.length; ++i) {
            var item = list.item(i).textContent;
            if (item.trim().length === 0 || item === MENU_PRICE_PARAGRAPH_END) {
                break;
            }
            item.split(String.fromCharCode(160))
                .filter(String).map(function (text) { return text.trim(); })
                .forEach(function (text) {
                var delimiter = text.search(/\d+\s*,-\s*Kč$/);
                meals.push({
                    name: text.substr(0, delimiter).replace(/\s*[-–]\s*$/, "").trim(),
                    price: text.substr(delimiter).replace("Kč", "").trim()
                });
            });
        }
        return meals;
    };
    Spilberk.prototype.indexOfParagraph = function (paragraphs, content, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        for (var i = startIndex; i < paragraphs.length; ++i) {
            if (paragraphs.item(i).textContent.trim() === content) {
                return i;
            }
        }
        return -1;
    };
    return Spilberk;
}());
exports.default = Spilberk;
//# sourceMappingURL=Spilberk.js.map