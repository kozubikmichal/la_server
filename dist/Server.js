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
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IMenuProvider_1 = require("./IMenuProvider");
var IRestaurantProvider_1 = require("./IRestaurantProvider");
var express = require("express");
var apicache = require("apicache");
var path = require("path");
var CACHE_DURATION = "30 minutes";
var API_ROOT = "/api";
var ROUTES = {
    menu: "/menu",
    singleMenu: "/menu/:id",
    restaurant: "/restaurant",
    clearCache: "/clearCache"
};
/**
 * Server
 */
var Server = /** @class */ (function () {
    function Server(menuProvider, restaurantProvider) {
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
    Server.prototype.start = function (port) {
        this.app.listen(port);
        console.log("done");
    };
    Server.prototype.registerRoutes = function () {
        var _this = this;
        this.router
            .get(ROUTES.singleMenu, function (req, res) {
            _this.menuProvider.getMenuToday(req.params.id).then(function (data) {
                res.json(data);
            });
        })
            .get(ROUTES.menu, function (req, res) {
            _this.menuProvider.getMenusToday().then(function (data) {
                res.json(data);
            });
        })
            .get(ROUTES.clearCache, function (req, res) {
            apicache.clear();
            res.end();
        })
            .get(ROUTES.restaurant, function (req, res) {
            _this.restaurantProvider.getRestaurants().then(function (data) {
                res.json(data);
            });
        });
    };
    Server.prototype.useCache = function () {
        this.app.use(API_ROOT, apicache.middleware(CACHE_DURATION, function (req, res) {
            return res.statusCode === 200;
        }));
    };
    Server.prototype.useRouter = function () {
        this.app.use(API_ROOT, this.router);
    };
    Server.prototype.registerClient = function () {
        this.app.use(express.static(__dirname + '/../client'));
        this.app.get("/", function (req, res) {
            var file = path.join(__dirname, "/../client/public/index.html");
            res.sendFile(file);
        });
    };
    Server = __decorate([
        __param(0, typescript_ioc_1.Inject),
        __param(1, typescript_ioc_1.Inject),
        __metadata("design:paramtypes", [IMenuProvider_1["default"],
            IRestaurantProvider_1["default"]])
    ], Server);
    return Server;
}());
exports["default"] = Server;
//# sourceMappingURL=Server.js.map