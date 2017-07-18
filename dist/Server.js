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
const IRestaurantProvider_1 = require("./IRestaurantProvider");
const express = require("express");
const apicache = require("apicache");
const path = require("path");
const CACHE_DURATION = "30 minutes";
const API_ROOT = "/api";
const ROUTES = {
    menu: "/menu",
    singleMenu: "/menu/:id",
    restaurant: "/restaurant",
    clearCache: "/clearCache"
};
/**
 * Server
 */
let Server = class Server {
    constructor(menuProvider, restaurantProvider) {
        this.menuProvider = menuProvider;
        this.restaurantProvider = restaurantProvider;
        this.app = express();
        this.router = express.Router();
        this.useCache();
        this.useRouter();
        this.registerClient();
        this.registerRoutes();
    }
    /**
     * Starts server on the given port
     *
     * @param port port number
     */
    start(port) {
        this.app.listen(port);
        console.log("done");
    }
    registerRoutes() {
        this.router
            .get(ROUTES.singleMenu, (req, res) => {
            this.menuProvider.getMenuToday(req.params.id).then((data) => {
                res.json(data);
            });
        })
            .get(ROUTES.menu, (req, res) => {
            this.menuProvider.getMenusToday().then((data) => {
                res.json(data);
            });
        })
            .get(ROUTES.clearCache, (req, res) => {
            apicache.clear();
            res.end();
        })
            .get(ROUTES.restaurant, (req, res) => {
            this.restaurantProvider.getRestaurants().then((data) => {
                res.json(data);
            });
        });
    }
    useCache() {
        this.app.use(API_ROOT, apicache.middleware(CACHE_DURATION, (req, res) => {
            return res.statusCode === 200;
        }));
    }
    useRouter() {
        this.app.use(API_ROOT, this.router);
    }
    registerClient() {
        this.app.use(express.static(__dirname + '/../client'));
        this.app.get("/", (req, res) => {
            let file = path.join(__dirname, "/../client/public/index.html");
            res.sendFile(file);
        });
    }
};
Server = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [IMenuProvider_1.default,
        IRestaurantProvider_1.default])
], Server);
exports.default = Server;
//# sourceMappingURL=Server.js.map