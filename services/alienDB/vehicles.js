const COLLECTION_NAME = 'vehicles'
const indxes = [{ commander_id: 1 }, { chief_id: 1 }]
const INSERT_MSG = "inserted commander into vehicles collection"
const types = require('../../config/constants').vehicles

module.exports = class Vehicles {
    async initialize(mongodb, initFunciton) {
        this.mongodb = mongodb
        initFunciton(this.mongodb, COLLECTION_NAME, indxes)
    }
    async insertOne(insertFunction, data) {
        insertFunction(this.mongodb, COLLECTION_NAME, data, INSERT_MSG)
    }
    validateVehicle(vehicle){
        return types.includes(vehicle)
    }
}