const DB_handler = require('../lib/db_handler')
const db_handler = new DB_handler()

async function initialize() {
    await db_handler.initialize().catch(e => log.error(e))
}

initialize();

exports.insert = async (ctx) => {
    const msg = {...ctx.request.body}
    ctx.body = await db_handler.insertNewAlien(msg)
}

exports.get = async (ctx) => {
    const params = {...ctx.request.query}
    if(params.name || params.id){
        ctx.body = await db_handler.getAliensByQuery(params)
    } else {
        ctx.body = await db_handler.getAll()
    }
}