"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var Constants_1 = require("./Constants");
var IRequest_1 = require("./IRequest");
var axios_1 = require("axios");
var http = require("http");
/**
 * Request wrapper
 */
var Request = /** @class */ (function (_super) {
    __extends(Request, _super);
    function Request() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Sends GET request
     *
     * @param url url path
     */
    Request.prototype.get = function (url) {
        // Default usage is from corporate network -> use proxy
        return axios_1["default"].get(url, {
            proxy: {
                host: Constants_1["default"].ProxyHost,
                port: Constants_1["default"].ProxyPort
            }
        })["catch"](function () {
            // In case of error try to perform request wihout proxy setting
            return axios_1["default"].get(url);
        }).then(function (response) {
            return response.data;
        });
    };
    Request.prototype.download = function (url) {
        return new Promise(function (resolve, reject) {
            var processResponse = function (response) {
                var body = [];
                response.on("data", function (data) {
                    body.push(data);
                }).on("end", function () {
                    resolve(Buffer.concat(body));
                });
            };
            http.get({
                host: Constants_1["default"].ProxyHost,
                port: Constants_1["default"].ProxyPort,
                path: url
            }, processResponse).on("error", function (error) {
                if (error.name === "ENOTFOUND") {
                    http.get(url, processResponse).on("error", function (error) { return reject(error); });
                }
                else {
                    reject(error);
                }
            });
        });
    };
    Request = __decorate([
        typescript_ioc_1.Provides(IRequest_1["default"])
    ], Request);
    return Request;
}(IRequest_1["default"]));
exports["default"] = Request;
//# sourceMappingURL=Request.js.map