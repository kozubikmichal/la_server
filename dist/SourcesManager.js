"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IQ_1 = require("./parsers/IQ");
var Kometa_1 = require("./parsers/Kometa");
var Tusto_1 = require("./parsers/Tusto");
var Rebio_1 = require("./parsers/Rebio");
var MyFood_1 = require("./parsers/MyFood");
var SourcesManager = (function () {
    function SourcesManager() {
        this.sources = [{
                name: "IQ Holanská",
                url: "http://iqrestaurant.cz/brno/menu.html",
                menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
                parser: new IQ_1.default()
            }, {
                name: "IQ Holanská (Týdenní nabídka)",
                url: "http://iqrestaurant.cz/brno/menu.html",
                menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
                parser: new IQ_1.default(true)
            }, {
                name: "My Food Holandská",
                url: "https://www.sklizeno.cz/o-nas/brno-holandska/",
                menuUrl: "http://www.sklizeno.cz/o-nas/brno-holandska/",
                parser: new MyFood_1.default()
            }, {
                name: "Tusto Titanium",
                url: "http://titanium.tusto.cz/tydenni-menu/",
                menuUrl: "http://titanium.tusto.cz/tydenni-menu/",
                parser: new Tusto_1.default()
            }, {
                name: "Kometa Pub Arena",
                url: "http://arena.kometapub.cz/tydenni-menu.php",
                menuUrl: "http://arena.kometapub.cz/tydenni-menu.php",
                parser: new Kometa_1.default()
            }, {
                name: "Rebio Holandská",
                url: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
                menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
                parser: new Rebio_1.default()
            }];
    }
    SourcesManager.prototype.getSources = function () {
        return this.sources;
    };
    return SourcesManager;
}());
exports.default = SourcesManager;
//# sourceMappingURL=SourcesManager.js.map