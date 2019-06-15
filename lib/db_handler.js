const MONGO_URL = config.database
const AlienDBService = require('../services/alienDB/alienDbService')
const Mongodb = require('../services/mongo')
const mongo = new Mongodb()

class DB_handler {
    async initialize() {
        const mongoClient = await mongo.connectToDB(MONGO_URL)
        this.alienDBService = new AlienDBService(mongoClient)
        await this.alienDBService.initialize()
        log.info("DB handler is ready")
    }

    // gets msg object with alien params
    async insertNewAlien(data) {
        return await this.alienDBService.insertAlien(data)
    }

    async getAll() {
        return await this.alienDBService.getAllAliens()
    }
    // gets alien name or id
    async getAliensByQuery(data) {
        return await this.alienDBService.getSuperviedAliens(data)
    }

}

module.exports = DB_handler