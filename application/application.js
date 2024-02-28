const http = require('http')
const EventEmitter = require('events')

class Application {
	constructor() {
		this.emitter = new EventEmitter()
		this.server = this._createSever()
		this.middlewares = []
	}

	_createSever() {
		return http.createServer(async (req, res) => {
			let body = ''

			req.on('data', (chunk) => {
				body += chunk
			})

			req.on('end', () => {
				if (body) {
					req.body = JSON.parse(body)
				}

				this.middlewares.forEach((middleware) => {
					middleware(req, res)
				})

				const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)

				if (!emitted) {
					res.end()
				}
			})
		})
	}

	_getRouteMask(path, method) {
		return `[${path}]:[${method}]`
	}

	addRouter(router) {
		Object.keys(router.endpoints).forEach((path) => {
			const endpoint = router.endpoints[path]

			Object.keys(endpoint).forEach((method) => {
				this.emitter.on(this._getRouteMask(path, method), (req, res) => {
					const handler = endpoint[method]

					handler(req, res)
				})
			})
		})
	}

	listen(port, callback) {
		this.server?.listen(port, callback)
	}

	use(middleware) {
		this.middlewares.push(middleware)
	}
}

module.exports = Application
