"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const IMenuProvider_1 = require("./IMenuProvider");
const MenuProvider_1 = require("./MenuProvider");
const IRestaurantProvider_1 = require("./IRestaurantProvider");
const RestaurantProvider_1 = require("./RestaurantProvider");
const ISourcesManager_1 = require("./ISourcesManager");
const SourcesManager_1 = require("./SourcesManager");
const IRequest_1 = require("./IRequest");
const Request_1 = require("./Request");
class Configuration {
    static configure() {
        typescript_ioc_1.Container.bind(IMenuProvider_1.default).to(MenuProvider_1.default);
        typescript_ioc_1.Container.bind(ISourcesManager_1.default).to(SourcesManager_1.default);
        typescript_ioc_1.Container.bind(IRequest_1.default).to(Request_1.default);
        typescript_ioc_1.Container.bind(IRestaurantProvider_1.default).to(RestaurantProvider_1.default);
    }
}
exports.default = Configuration;
//# sourceMappingURL=IoCConfig.js.map