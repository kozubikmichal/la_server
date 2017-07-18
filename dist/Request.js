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
var IRequest_1 = require("./IRequest");
var axios_1 = require("axios");
/**
 * Request wrapper
 */
var Request = (function (_super) {
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
        return axios_1["default"].get(url, {
            proxy: {
                host: "proxy.wdf.sap.corp",
                port: 8080
            }
        }).then(function (response) {
            return response.data;
        });
    };
    return Request;
}(IRequest_1["default"]));
Request = __decorate([
    typescript_ioc_1.Provides(IRequest_1["default"])
], Request);
exports["default"] = Request;
//# sourceMappingURL=Request.js.map