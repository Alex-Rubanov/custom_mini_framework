const postsRouter = require('./posts.router')
const usersRouter = require('./users.router')


module.exports = {
    ...postsRouter,
    ...usersRouter
}
