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
var ISourcesManager_1 = require("../../src/ISourcesManager");
var fakeRestaurant = {
    url: "url",
    name: "name",
    id: "id"
};
var DummyParser = (function () {
    function DummyParser() {
    }
    DummyParser.prototype.parseDay = function () {
        return Promise.resolve([{
                meals: []
            }]);
    };
    return DummyParser;
}());
exports.DummyParser = DummyParser;
var FakeSourcesManager = (function (_super) {
    __extends(FakeSourcesManager, _super);
    function FakeSourcesManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sources = [{
                menuUrl: "firstUrl",
                parser: new DummyParser(),
                restaurant: fakeRestaurant,
            }, {
                menuUrl: "secondUrl",
                parser: new DummyParser(),
                restaurant: fakeRestaurant
            }];
        return _this;
    }
    FakeSourcesManager.prototype.getSources = function () {
        return this.sources;
    };
    FakeSourcesManager.prototype.getSource = function (restaurantId) {
        return this.sources[0];
    };
    return FakeSourcesManager;
}(ISourcesManager_1.default));
exports.default = FakeSourcesManager;
//# sourceMappingURL=FakeSourceManager.js.map