"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var ISourcesManager_1 = require("./ISourcesManager");
var Kometa_1 = require("./parsers/Kometa");
var Tusto_1 = require("./parsers/Tusto");
var Rebio_1 = require("./parsers/Rebio");
var MyFood_1 = require("./parsers/MyFood");
var Makalu_1 = require("./parsers/Makalu");
var UHovezihoPupku_1 = require("./parsers/UHovezihoPupku");
var Eatology_1 = require("./pdfProviders/Eatology");
var restaurants_1 = require("./data/restaurants");
var IMenu_1 = require("./IMenu");
var SinglePage_1 = require("./pdfProviders/SinglePage");
var Zomato_1 = require("./parsers/Zomato");
var IQMoravka_1 = require("./pdfProviders/IQMoravka");
/**
 * Sources manager
 */
var SourcesManager = /** @class */ (function () {
    function SourcesManager() {
        this.sources = [{
                restaurant: restaurants_1["default"].iqHolandska,
                menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
                type: IMenu_1.MenuType.PDF,
                pdfInfoProvider: new Eatology_1["default"](restaurants_1["default"].iqHolandska)
            }, {
                restaurant: restaurants_1["default"].myFoodHolandska,
                menuUrl: "http://www.sklizeno.cz/o-nas/brno-holandska/",
                type: IMenu_1.MenuType.Standard,
                parser: new MyFood_1["default"]()
            }, {
                restaurant: restaurants_1["default"].tustoTitanium,
                menuUrl: "http://titanium.tusto.cz/tydenni-menu/",
                type: IMenu_1.MenuType.Standard,
                parser: new Tusto_1["default"]()
            }, {
                restaurant: restaurants_1["default"].kometaPubArena,
                menuUrl: "https://www.kometapub.cz/arena.php",
                type: IMenu_1.MenuType.Standard,
                parser: new Kometa_1["default"]()
            }, {
                restaurant: restaurants_1["default"].rebioHolandska,
                menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
                type: IMenu_1.MenuType.Standard,
                parser: new Rebio_1["default"]()
            }, {
                restaurant: restaurants_1["default"].makaluBrno,
                menuUrl: "http://www.nepalska-restaurace-makalu.cz/index.php",
                type: IMenu_1.MenuType.Standard,
                parser: new Makalu_1["default"]()
            }, {
                restaurant: restaurants_1["default"].uHovezihoPupku,
                menuUrl: "http://www.uhovezihopupku.cz/menu/",
                type: IMenu_1.MenuType.Standard,
                parser: new UHovezihoPupku_1["default"]()
            }, {
                restaurant: restaurants_1["default"].uTesare,
                menuUrl: "http://www.utesare.cz/Menu.pdf",
                type: IMenu_1.MenuType.PDF,
                pdfInfoProvider: new SinglePage_1["default"](restaurants_1["default"].uTesare)
            }, {
                restaurant: restaurants_1["default"].buffaloAmericanSteakhouse,
                menuUrl: "",
                type: IMenu_1.MenuType.Standard,
                parser: new Zomato_1["default"]("18491544")
            }, {
                restaurant: restaurants_1["default"].iqMoravka,
                menuUrl: "http://www.iqrestaurant.cz/moravka.html?iframe=true",
                type: IMenu_1.MenuType.PDF,
                pdfInfoProvider: new IQMoravka_1["default"](restaurants_1["default"].iqMoravka)
            }];
    }
    /**
     * Gets data for all sources
     */
    SourcesManager.prototype.getSources = function () {
        return this.sources;
    };
    /**
     * Gets data for one restaurant
     * @param restaurantId restaurant id
     */
    SourcesManager.prototype.getSource = function (restaurantId) {
        return this.getSources().filter(function (source) {
            return source.restaurant.id === restaurantId;
        })[0];
    };
    SourcesManager = __decorate([
        typescript_ioc_1.Provides(ISourcesManager_1["default"])
    ], SourcesManager);
    return SourcesManager;
}());
exports["default"] = SourcesManager;
//# sourceMappingURL=SourcesManager.js.map