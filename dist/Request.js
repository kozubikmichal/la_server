"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const IRequest_1 = require("./IRequest");
const axios_1 = require("axios");
/**
 * Request wrapper
 */
let Request = class Request extends IRequest_1.default {
    /**
     * Sends GET request
     *
     * @param url url path
     */
    get(url) {
        return axios_1.default.get(url, {
            proxy: {
                host: "proxy.wdf.sap.corp",
                port: 8080
            }
        }).then((response) => {
            return response.data;
        });
    }
};
Request = __decorate([
    typescript_ioc_1.Provides(IRequest_1.default)
], Request);
exports.default = Request;
//# sourceMappingURL=Request.js.map