"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("../Request");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var Kometa = (function () {
    function Kometa() {
        this.url = "http://arena.kometapub.cz/tydenni-menu.php";
    }
    Kometa.prototype.provideToday = function () {
        return this.provideDay(new Date().getDay());
    };
    Kometa.prototype.provideDay = function (day) {
        return Request_1.default.get(this.url).then(function (data) {
            var meals = [];
            var dom = new JSDOM(data);
            var dayData = dom.window.document.querySelectorAll("div#div" + day + " tr");
            for (var i = 1; i < dayData.length; ++i) {
                var row = dayData.item(i);
                meals.push({
                    name: row.children[0].textContent,
                    price: row.children[1].textContent
                });
            }
            return {
                name: "Kometa pub",
                meals: meals
            };
        });
    };
    return Kometa;
}());
exports.default = Kometa;
//# sourceMappingURL=Kometa.js.map