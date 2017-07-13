"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuProvider_1 = require("./MenuProvider");
var RestaurantProvider_1 = require("./RestaurantProvider");
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
var Server = (function () {
    function Server() {
        this.menuProvider = new MenuProvider_1.default();
        this.restaurantProvider = new RestaurantProvider_1.default();
        this.app = express();
        this.router = express.Router();
        this.useCache();
        this.useRouter();
        this.registerClient();
        this.registerRoutes();
    }
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
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=Server.js.map