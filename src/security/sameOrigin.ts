const withoutPort = function (url) {
	return url.replace(/:\d+$/, "");
}

export default function () {
	return (request, response, next) => {
		const allowedHosts = new Set([
			withoutPort(request.headers.host)
		]);
		let referer = withoutPort(request.headers.host);
		let origin = null;

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
	}
}