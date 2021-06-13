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
var sqlite3_1 = require("sqlite3");
var IDAO_1 = require("./IDAO");
var AppDAO = /** @class */ (function (_super) {
    __extends(AppDAO, _super);
    function AppDAO(dbFilePath) {
        var _this = _super.call(this) || this;
        _this.db = new sqlite3_1.Database(dbFilePath, function (err) {
            if (err) {
                console.error("Could not connect to database '" + dbFilePath + "'", err);
            }
        });
        return _this;
    }
    AppDAO.prototype.run = function (sql, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            _this.db.run(sql, params, function (err) {
                if (err) {
                    console.error("Error running sql '" + sql + "'");
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(this.changes);
                }
            });
        });
    };
    AppDAO.prototype.get = function (sql, params) {
        if (params === void 0) { params = []; }
        return this.getData("get", sql, params);
    };
    AppDAO.prototype.all = function (sql, params) {
        if (params === void 0) { params = []; }
        return this.getData("all", sql, params);
    };
    AppDAO.prototype.getData = function (method, sql, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            _this.db[method](sql, params, function (err, result) {
                if (err) {
                    console.error("Error running sql '" + sql + "'");
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    return AppDAO;
}(IDAO_1["default"]));
exports["default"] = AppDAO;
//# sourceMappingURL=AppDAO.js.map