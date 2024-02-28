const router = require('./router.instance')

const postsController = {} // custom controller like controller/users.controller.js

router.get('/posts', postsController.getAll)
router.get('/posts/:id', postsController.getPostById)
router.post('/posts', postsController.createPost)

module.exports = router
