"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var MenuProvider_1 = require("./MenuProvider");
var apicache = require("apicache");
var path = require("path");
var CACHE_DURATION = "30 minutes";
var API_ROOT = "/api";
var ROUTES = {
    menu: "/menu",
    clearCache: "/clearCache"
};
var Server = (function () {
    function Server() {
        this.menuProvider = new MenuProvider_1.default();
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
            .get(ROUTES.menu, function (req, res) {
            _this.menuProvider.getAllMenusToday().then(function (data) {
                res.json(data);
            });
        })
            .get(ROUTES.clearCache, function (req, res) {
            apicache.clear();
            res.end();
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