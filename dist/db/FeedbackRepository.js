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
var IDAO_1 = require("./IDAO");
var TableName = "feedback";
var FeedbackRepository = /** @class */ (function () {
    function FeedbackRepository(dao) {
        this.dao = dao;
    }
    FeedbackRepository.prototype.createTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dao.run("\n\t\t\tCREATE TABLE IF NOT EXISTS " + TableName + " (\n\t\t\t\tId INTEGER PRIMARY KEY AUTOINCREMENT,\n\t\t\t\tName varchar(255),\n\t\t\t\tRestaurantName varchar(255),\n\t\t\t\tRestaurantUrl varchar(255),\n\t\t\t\tNote varchar(255),\n\t\t\t\tTimestamp datetime\n\t\t\t);\n\t\t")];
            });
        });
    };
    FeedbackRepository.prototype.commit = function (feedback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.dao.run("\n\t\t\tINSERT INTO " + TableName + " (Name, RestaurantName, RestaurantUrl, Note, Timestamp) VALUES (?, ?, ?, ?, ?)\n\t\t", [
                    feedback.Name || "",
                    feedback.RestaurantName || "",
                    feedback.RestaurantUrl || "",
                    feedback.Note || "",
                    new Date().getTime()
                ]);
                return [2 /*return*/];
            });
        });
    };
    FeedbackRepository.prototype.getAll = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "\n\t\t\tSELECT * FROM " + TableName + "\n\t\t";
                if (from != null && to != null) {
                    query += " WHERE Timestamp BETWEEN ? and ?";
                }
                else if (from != null) {
                    query += " WHERE Timestamp = ?";
                }
                return [2 /*return*/, this.dao.all(query, [from, to])];
            });
        });
    };
    FeedbackRepository = __decorate([
        __param(0, typescript_ioc_1.Inject),
        __metadata("design:paramtypes", [IDAO_1["default"]])
    ], FeedbackRepository);
    return FeedbackRepository;
}());
exports["default"] = FeedbackRepository;
//# sourceMappingURL=FeedbackRepository.js.map