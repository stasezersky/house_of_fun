const config = require('./config/config').get(process.env.NODE_ENV);
global.config = config

const Koa = require('koa')
const port = 4000
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./routes/appRoutes')
const koaCors = require('koa-cors')

const koaOptions = {
    origin: true,
    methods: ['GET', 'POST']
}

app.use(bodyParser())
app.use(router.routes())
app.use(koaCors(koaOptions))
app.use(async ctx => {
    console.log(ctx.body)

    ctx.body = 'House Of Fun'
})
log.info(`strating on port ${port}`)
app.listen(port)