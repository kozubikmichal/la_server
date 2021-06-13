"use strict";
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IMenuProvider_1 = require("./IMenuProvider");
var MenuProvider_1 = require("./MenuProvider");
var IRestaurantProvider_1 = require("./IRestaurantProvider");
var RestaurantProvider_1 = require("./RestaurantProvider");
var ISourcesManager_1 = require("./ISourcesManager");
var SourcesManager_1 = require("./SourcesManager");
var IRequest_1 = require("./IRequest");
var Request_1 = require("./Request");
var IVisitorsRepository_1 = require("./db/IVisitorsRepository");
var VisitorsRepository_1 = require("./db/VisitorsRepository");
var IDAO_1 = require("./db/IDAO");
var AppDAO_1 = require("./db/AppDAO");
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Configuration.configure = function () {
        typescript_ioc_1.Container.bind(IMenuProvider_1["default"]).to(MenuProvider_1["default"]);
        typescript_ioc_1.Container.bind(ISourcesManager_1["default"]).to(SourcesManager_1["default"]);
        typescript_ioc_1.Container.bind(IRequest_1["default"]).to(Request_1["default"]);
        typescript_ioc_1.Container.bind(IRestaurantProvider_1["default"]).to(RestaurantProvider_1["default"]);
        typescript_ioc_1.Container.bind(IVisitorsRepository_1["default"]).to(VisitorsRepository_1["default"]);
        typescript_ioc_1.Container.bind(IDAO_1["default"])
            .factory(function () { return new AppDAO_1["default"](process.env.DB_PATH || "./database.sqlite3"); })
            .scope(typescript_ioc_1.Scope.Singleton);
    };
    return Configuration;
}());
exports["default"] = Configuration;
//# sourceMappingURL=IoCConfig.js.map