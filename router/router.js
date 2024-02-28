class Router {
	constructor() {
		this.endpoints = []
	}

	request(method = 'GET', path, handler) {
		if (!this.endpoints[path]) {
			this.endpoints[path] = {}
		}

		// => /users [GET, POST, DELETE] /posts [GET, POST, PUT, DELETE]
		const endpoint = this.endpoints[path]

		if (endpoint[method]) {
			throw new Error(`[${method}] endpoint ${path} already exists`)
		}

		endpoint[method] = handler
	}

	get(path, handle) {
		this.request('GET', path, handle)
	}
	post(path, handle) {
		this.request('POST', path, handle)
	}
	put(path, handle) {
		this.request('PUT', path, handle)
	}
	delete(path, handle) {
		this.request('DELETE', path, handle)
	}
}

module.exports = Router
