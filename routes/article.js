const Router = require('koa-router')
const router = new Router({prefix: '/article'})
const {find, create, findOne, getTopic} = require('../controllers/article')

router.get('/', find)
router.post('/', create)
router.get('/:id', findOne)
router.get('/topic/:topic', getTopic)
module.exports = router