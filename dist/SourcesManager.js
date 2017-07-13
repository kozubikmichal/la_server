"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IQ_1 = require("./parsers/IQ");
var Kometa_1 = require("./parsers/Kometa");
var Tusto_1 = require("./parsers/Tusto");
var Rebio_1 = require("./parsers/Rebio");
var MyFood_1 = require("./parsers/MyFood");
var Spilberk_1 = require("./parsers/Spilberk");
var restaurants_1 = require("./data/restaurants");
var SourcesManager = (function () {
    function SourcesManager() {
        this.sources = [{
                restaurant: restaurants_1.default.iqHolandska,
                menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
                parser: new IQ_1.default()
            }, {
                restaurant: restaurants_1.default.iqHolandskaWeek,
                menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
                parser: new IQ_1.default(true)
            }, {
                restaurant: restaurants_1.default.myFoodHolandska,
                menuUrl: "http://www.sklizeno.cz/o-nas/brno-holandska/",
                parser: new MyFood_1.default()
            }, {
                restaurant: restaurants_1.default.tustoTitanium,
                menuUrl: "http://titanium.tusto.cz/tydenni-menu/",
                parser: new Tusto_1.default()
            }, {
                restaurant: restaurants_1.default.kometaPubArena,
                menuUrl: "http://arena.kometapub.cz/tydenni-menu.php",
                parser: new Kometa_1.default()
            }, {
                restaurant: restaurants_1.default.spilberkCafe,
                menuUrl: "http://www.spielberkcafe.cz/denni_menu.html",
                parser: new Spilberk_1.default()
            }, {
                restaurant: restaurants_1.default.rebioHolandska,
                menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
                parser: new Rebio_1.default()
            }];
    }
    SourcesManager.prototype.getSources = function () {
        return this.sources;
    };
    SourcesManager.prototype.getSource = function (restaurantId) {
        return this.getSources().filter(function (source) {
            return source.restaurant.id === restaurantId;
        })[0];
    };
    return SourcesManager;
}());
exports.default = SourcesManager;
//# sourceMappingURL=SourcesManager.js.map