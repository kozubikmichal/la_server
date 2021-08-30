"use strict";
exports.__esModule = true;
var Position;
(function (Position) {
    Position[Position["Other"] = 0] = "Other";
    Position[Position["Soup"] = 1] = "Soup";
    Position[Position["MainCourse"] = 2] = "MainCourse";
})(Position || (Position = {}));
/**
 * U Tesaře restaurant menu parser
 */
var UTesare = /** @class */ (function () {
    function UTesare() {
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     */
    UTesare.prototype.parseDay = function (dom) {
        var items = dom.window.document.querySelectorAll(".elementor-text-editor")[1].children;
        var meals = [];
        var position;
        for (var i = 0; i < items.length; ++i) {
            var item = items.item(i);
            if (item.tagName.toUpperCase() !== "P") {
                var result = this.determinePosition(item);
                position = result.newPosition;
                i += result.offset;
                continue;
            }
            switch (position) {
                case Position.Soup:
                case Position.MainCourse: {
                    meals.push(this.parseMeal(item));
                    break;
                }
                default: continue;
            }
        }
        return Promise.resolve([{
                meals: meals
            }]);
    };
    UTesare.prototype.determinePosition = function (item) {
        switch (item.textContent.trim()) {
            case "Polévky": return {
                newPosition: Position.Soup,
                offset: 1
            };
            case "Hlavní chody": return {
                newPosition: Position.MainCourse,
                offset: 0
            };
            default: return {
                newPosition: Position.Other,
                offset: 0
            };
        }
    };
    UTesare.prototype.parseMeal = function (item) {
        var text = item.textContent.trim();
        var priceStart = text.search(/\d+,-/);
        return {
            name: text.substring(0, priceStart).trim(),
            price: text.substring(priceStart).trim()
        };
    };
    return UTesare;
}());
exports["default"] = UTesare;
//# sourceMappingURL=UTesare.js.map