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
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IRequest_1 = require("../IRequest");
var pdfreader = require("pdfreader");
var MENU_URL = "http://www.utesare.cz/Menu.pdf";
var FILE_PATH = "./utesare.pdf";
/**
 * U Tesare restaurant menu parser
 */
var UTesare = (function () {
    function UTesare() {
    }
    /**
     * Parses menu for the given day
     */
    UTesare.prototype.parseDay = function (dom, day, data) {
        return Promise.resolve([]);
    };
    UTesare.prototype.parsePdfMenu = function (pdf) {
        return new Promise(function (resolve, reject) {
            var rows = {};
            var processRows = function () {
                var data = Object.keys(rows)
                    .sort(function (y1, y2) { return parseFloat(y1) - parseFloat(y2); })
                    .map(function (y) { return (rows[y] || []).join(""); });
                if (data.length) {
                    resolve(data);
                }
            };
            new pdfreader.PdfReader().parseBuffer(pdf, function (err, item) {
                if (!item || item.page) {
                    processRows();
                    rows = {};
                }
                else if (item.text) {
                    (rows[item.y] = rows[item.y] || []).push(item.text);
                }
            });
        });
    };
    UTesare.prototype.downloadMenu = function () {
        return this.request.download(MENU_URL);
    };
    UTesare.prototype.indexOfRow = function (rows, content) {
        var index = rows.findIndex(function (row) { return row === content; });
        return index !== -1 ? index : rows.length;
    };
    UTesare.prototype.normalizeName = function (name) {
        return name.replace(/^\d+\./, "").trim();
    };
    UTesare.prototype.normalizePrice = function (price) {
        return price.replace(/ .+$/, ",-");
    };
    return UTesare;
}());
UTesare.REGEX_PRICE = /\d+,-$/;
UTesare.REGEX_MEAL_INDEX = /^\d+\./;
UTesare.DAY_SEPARATOR = [
    "PONDĚLÍ",
    "ÚTERÝ",
    "STŘEDA",
    "ČTVRTEK",
    "PÁTEK",
    "Doba "
];
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", IRequest_1["default"])
], UTesare.prototype, "request");
exports["default"] = UTesare;
//# sourceMappingURL=UTesareBase.js.map