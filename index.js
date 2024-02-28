require('dotenv').config()
const mongoose = require('mongoose')

const Application = require('./application/application')
const router = require('./router/routes')
const jsonParser = require('./middleware/parse-json.middleware')
const urlParser = require('./middleware/parse-url.middleware')
const PORT = process.env.PORT ?? 3005

const app = new Application()

app.use(jsonParser)
app.use(urlParser(`http://localhost:${PORT}`))
app.addRouter(router)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)

		app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
	} catch (err) {
		console.log(err)
	}
}


start()


