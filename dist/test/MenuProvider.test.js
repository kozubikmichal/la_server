"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_ioc_1 = require("typescript-ioc");
var MenuProvider_1 = require("../src/MenuProvider");
var FakeSourceManager_1 = require("./fakes/FakeSourceManager");
var FakeRequest_1 = require("./fakes/FakeRequest");
var IRequest_1 = require("../src/IRequest");
require("mocha");
var assert = require("assert");
describe("MenuProvider", function () {
    it("getMenusToday", function () {
        typescript_ioc_1.Container.bind(IRequest_1.default).to(FakeRequest_1.default);
        var sourcesManager = new FakeSourceManager_1.default();
        var provider = new MenuProvider_1.default();
        return provider.getMenusToday().then(function (data) {
            assert.strictEqual(data.length, sourcesManager.sources.length, "All sources parsed");
        });
    });
});
//# sourceMappingURL=MenuProvider.test.js.map