"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Request = (function () {
    function Request() {
    }
    Request.get = function (url) {
        return axios_1.default.get(url, {
            proxy: {
                host: "proxy.wdf.sap.corp",
                port: 8080
            }
        }).then(function (response) {
            return response.data;
        });
    };
    return Request;
}());
exports.default = Request;
//# sourceMappingURL=Request.js.map