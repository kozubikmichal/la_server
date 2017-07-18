"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const ISourcesManager_1 = require("./ISourcesManager");
const IQ_1 = require("./parsers/IQ");
const Kometa_1 = require("./parsers/Kometa");
const Tusto_1 = require("./parsers/Tusto");
const Rebio_1 = require("./parsers/Rebio");
const MyFood_1 = require("./parsers/MyFood");
const Spilberk_1 = require("./parsers/Spilberk");
const restaurants_1 = require("./data/restaurants");
/**
 * Sources manager
 */
let SourcesManager = class SourcesManager {
    /**
     * Sources manager
     */
    constructor() {
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
    /**
     * Gets data for all sources
     */
    getSources() {
        return this.sources;
    }
    /**
     * Gets data for one restaurant
     * @param restaurantId restaurant id
     */
    getSource(restaurantId) {
        return this.getSources().filter((source) => {
            return source.restaurant.id === restaurantId;
        })[0];
    }
};
SourcesManager = __decorate([
    typescript_ioc_1.Provides(ISourcesManager_1.default)
], SourcesManager);
exports.default = SourcesManager;
//# sourceMappingURL=SourcesManager.js.map