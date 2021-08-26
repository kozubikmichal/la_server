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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IMenuProvider_1 = require("./IMenuProvider");
var IRestaurantProvider_1 = require("./IRestaurantProvider");
var express = require("express");
var apicache = require("apicache");
var path = require("path");
var IVisitorsRepository_1 = require("./db/IVisitorsRepository");
var FeedbackCollector_1 = require("./feedback/FeedbackCollector");
var CACHE_DURATION = "30 minutes";
var API_ROOT = "/api";
var ROUTES = {
    menu: "/menu",
    singleMenu: "/menu/:id",
    restaurant: "/restaurant",
    clearCache: "/clearCache",
    visitors: "/stats/visitors",
    feedback: "/feedback"
};
/**
 * Server
 */
var Server = /** @class */ (function () {
    function Server(menuProvider, restaurantProvider, visitorsRepository, feedbackCollector) {
        this.menuProvider = menuProvider;
        this.restaurantProvider = restaurantProvider;
        this.visitorsRepository = visitorsRepository;
        this.feedbackCollector = feedbackCollector;
        this.app = express();
        this.router = express.Router();
        this.useMiddleware();
        this.useCache();
        this.useRouter();
        this.registerClient();
        this.registerRoutes();
        this.feedbackCollector.register(this.app);
        this.visitorsRepository.createTable();
    }
    /**
     * Starts server on the given port
     *
     * @param port port number
     */
    Server.prototype.start = function (port) {
        this.app.listen(port);
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
        })
            .get(ROUTES.visitors, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).json;
                        return [4 /*yield*/, this.visitorsRepository.getVisitors()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Server.prototype.useCache = function () {
        this.app.use(API_ROOT, apicache.middleware(CACHE_DURATION, function (req, res) {
            return res.statusCode === 200 && req.path !== "" + ROUTES.visitors;
        }));
    };
    Server.prototype.useRouter = function () {
        this.app.use(API_ROOT, this.router);
    };
    Server.prototype.registerClient = function () {
        var _this = this;
        this.app.use(express.static(__dirname + '/../client'));
        this.app.get("/", function (req, res) {
            var file = path.join(__dirname, "/../client/public/index.html");
            _this.visitorsRepository.hit(new Date().setMinutes(0, 0, 0));
            res.sendFile(file);
        });
    };
    Server.prototype.useMiddleware = function () {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    };
    Server = __decorate([
        __param(0, typescript_ioc_1.Inject),
        __param(1, typescript_ioc_1.Inject),
        __param(2, typescript_ioc_1.Inject),
        __param(3, typescript_ioc_1.Inject),
        __metadata("design:paramtypes", [IMenuProvider_1["default"],
            IRestaurantProvider_1["default"],
            IVisitorsRepository_1["default"],
            FeedbackCollector_1["default"]])
    ], Server);
    return Server;
}());
exports["default"] = Server;
//# sourceMappingURL=Server.js.map