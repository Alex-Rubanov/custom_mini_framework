const router = require('./router.instance')
const usersController = require('../controller/users.controller')

router.get('/users', usersController.getAll)
router.post('/users', usersController.addUser)

module.exports = router
