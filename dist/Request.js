"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
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
     * @param params request parameters
     */
    Request.prototype.get = function (url, config) {
        if (config === void 0) { config = {}; }
        // Default usage is from corporate network -> use proxy
        return axios_1["default"].get(url, Object.assign({
            proxy: {
                host: Constants_1["default"].ProxyHost,
                port: Constants_1["default"].ProxyPort
            }
        }, config))["catch"](function () {
            // In case of error try to perform request wihout proxy setting
            return axios_1["default"].get(url, config);
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
    return Request;
}(IRequest_1["default"]));
exports["default"] = Request;
//# sourceMappingURL=Request.js.map