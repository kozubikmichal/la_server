"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("../Request");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var IQ = (function () {
    function IQ() {
        this.url = "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2";
    }
    IQ.prototype.provideToday = function () {
        return this.provideDay(new Date().getDay());
    };
    IQ.prototype.provideDay = function (day) {
        return Request_1.default.get(this.url).then(function (data) {
            var dayMeals = [];
            var weekMeals = [];
            var dom = new JSDOM(data);
            var days = dom.window.document.querySelectorAll("dl.menuDayItems");
            var dayData = days.item(day * 2 - 1);
            var weekData = days.item(day * 2);
            var processData = function (data, meals) {
                for (var i = 0; i < data.children.length; i += 2) {
                    meals.push({
                        name: data.children[i].textContent,
                        price: data.children[i + 1].textContent
                    });
                }
            };
            processData(dayData, dayMeals);
            processData(weekData, weekMeals);
            return {
                name: "IQ restaurant",
                meals: dayMeals,
                others: [{
                        name: "Týdenní nabídka",
                        meals: weekMeals
                    }]
            };
        });
    };
    return IQ;
}());
exports.default = IQ;
//# sourceMappingURL=IQ.js.map