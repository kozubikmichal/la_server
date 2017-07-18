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
Object.defineProperty(exports, "__esModule", { value: true });
var IRequest_1 = require("../../src/IRequest");
var FakeRequest = (function (_super) {
    __extends(FakeRequest, _super);
    function FakeRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeRequest.prototype.get = function (url) {
        console.log("ASDASDASD");
        return Promise.resolve("<html></html>");
    };
    return FakeRequest;
}(IRequest_1.default));
exports.default = FakeRequest;
//# sourceMappingURL=FakeRequest.js.map