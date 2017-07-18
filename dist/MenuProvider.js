"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const IMenuProvider_1 = require("./IMenuProvider");
const ISourcesManager_1 = require("./ISourcesManager");
const IRequest_1 = require("./IRequest");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
/**
 * Provides menu for the restaurants
 */
let MenuProvider = class MenuProvider {
    constructor(sourcesManager, request) {
        this.sourcesManager = sourcesManager;
        this.request = request;
    }
    /**
     * Gets today menus for all restaurants
     */
    getMenusToday() {
        return Promise.all(this.sourcesManager.getSources().map((source) => {
            return this.parseMenuToday(source.menuUrl, source.parser).then(menus => {
                return {
                    restaurant: source.restaurant,
                    menus: menus
                };
            });
        }));
    }
    /**
     * Gets today menu for one restaurant
     * @param restaurantId restaurant id
     */
    getMenuToday(restaurantId) {
        let source = this.sourcesManager.getSource(restaurantId);
        if (!source) {
            return Promise.resolve({
                restaurant: {
                    id: "",
                    name: "unknown",
                    url: ""
                },
                menus: []
            });
        }
        return this.parseMenuToday(source.menuUrl, source.parser).then((menus) => {
            return {
                restaurant: source.restaurant,
                menus: menus
            };
        });
    }
    parseMenu(url, parser, day) {
        return this.request.get(url).then((data) => {
            let dom = new JSDOM(data);
            return parser.parseDay(dom, day);
        });
    }
    parseMenuToday(url, parser) {
        return this.parseMenu(url, parser, (new Date()).getDay());
    }
};
MenuProvider = __decorate([
    typescript_ioc_1.Provides(IMenuProvider_1.default),
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [ISourcesManager_1.default,
        IRequest_1.default])
], MenuProvider);
exports.default = MenuProvider;
//# sourceMappingURL=MenuProvider.js.map