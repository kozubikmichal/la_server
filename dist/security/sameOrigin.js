"use strict";
exports.__esModule = true;
var withoutPort = function (url) {
    return url.replace(/:\d+$/, "");
};
function default_1() {
    return function (request, response, next) {
        var allowedHosts = new Set([
            withoutPort(request.headers.host)
        ]);
        var referer = withoutPort(request.headers.host);
        var origin = null;
        if (request.headers.referer) {
            referer = withoutPort(new URL(request.headers.referer).host);
        }
        if (request.headers.origin) {
            origin = withoutPort(new URL(request.headers.origin).host);
        }
        if (!allowedHosts.has((origin || referer))) {
            return next(new Error('Unallowed origin'));
        }
        next();
    };
}
exports["default"] = default_1;
//# sourceMappingURL=sameOrigin.js.map