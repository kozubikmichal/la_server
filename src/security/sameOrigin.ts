export default function () {
	return (request, response, next) => {
		const allowedHosts = new Set([request.headers.host]);
		let referer = request.headers.host;
		let origin = null;

		if (request.headers.referer) {
			referer = new URL(request.headers.referer).host;
		}
		if (request.headers.origin) {
			origin = new URL(request.headers.origin).host;
		}

		if (!allowedHosts.has((origin || referer))) {
			return next(new Error('Unallowed origin'));
		}

		next();
	}
}