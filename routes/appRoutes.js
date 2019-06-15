const Router = require('koa-router');
const router = new Router();
const ctrl = require('./../controllers/actions')


router.post('/insert',ctrl.insert)
router.get('/aliens', ctrl.get)
router.allowedMethods()
module.exports = router;
