"use strict";
exports.__esModule = true;
/**
 * IQ restaurant menu parser
 */
var IQ = (function () {
    /**
     * Constructor
     *
     * @param isWeek true if weekly menu is required
     */
    function IQ(isWeek) {
        if (isWeek === void 0) { isWeek = false; }
        this.isWeek = isWeek;
    }
    /**
     * Parses menu for the given day
     *
     * @param dom dom parser
     * @param day day number
     */
    IQ.prototype.parseDay = function (dom) {
        var days = dom.window.document.querySelectorAll("dl.menuDayItems");
        var itemIndex = this.isWeek ? (days.length - 1) : this.getDayIndex(dom);
        var data = days.item(itemIndex);
        return Promise.resolve([{
                meals: this.processMenuList(data)
            }]);
    };
    IQ.prototype.getDayIndex = function (dom) {
        var date = String((new Date()).getDate());
        var dates = dom.window.document.querySelectorAll("div.date");
        var dateIndex = 0;
        for (var i = 0; i < dates.length; ++i) {
            if (dates.item(i).children[0].textContent === date) {
                dateIndex = i;
                break;
            }
        }
        return dateIndex * 2;
    };
    IQ.prototype.processMenuList = function (list) {
        var meals = [];
        var mainMealIndex = 1;
        for (var i = 0; i < list.children.length; i += 2) {
            list.children[i].removeChild(list.children[i].children[0]);
            meals.push({
                name: list.children[i].textContent,
                price: this.normalizePrice(list.children[i + 1].textContent)
            });
        }
        return meals;
    };
    IQ.prototype.normalizePrice = function (price) {
        return price.replace(/\(.*\)/, "").trim();
    };
    return IQ;
}());
exports["default"] = IQ;
//# sourceMappingURL=IQ.js.map