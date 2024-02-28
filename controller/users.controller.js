const userRepository = require('../model/user.model')

// Some basic example of controller without validation/error handling
class UsersController {
	async getAll(req, res) {
		return await userRepository.find()
    }
    
    async getUseById(req, res) {
        if (req.param.id) {
            return await userRepository.findById(req.param.id)
        }
    }

	async addUser(req, res) {
        const { email, password } = req.body
        
        if (email && password) {
            return await userRepository.create({ email, password })
        }
	}
}


module.exports = new UsersController()



