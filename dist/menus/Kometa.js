"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Kometa = (function () {
    function Kometa() {
    }
    Kometa.prototype.provide = function () {
        axios_1.default.get("http://arena.kometapub.cz/tydenni-menu.php").then(function (result) {
            console.log(result.data);
        });
        return {};
    };
    return Kometa;
}());
exports.default = Kometa;
//# sourceMappingURL=Kometa.js.map