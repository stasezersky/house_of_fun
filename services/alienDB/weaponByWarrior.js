const COLLECTION_NAME = 'weapons'
const indxes = [{ warrior_id: 1 }]
const INSERT_MSG = "inserted alien and weapon type to weapons collection"
const types = require('../../config/constants').weapons

module.exports = class Weapons {
    async initialize(mongodb, initFunciton) {
        this.mongodb = mongodb
        initFunciton(this.mongodb, COLLECTION_NAME, indxes)
    }
    async insertOne(insertFunction, data) {
        insertFunction(this.mongodb, COLLECTION_NAME, data, INSERT_MSG)
    }
    validateWeapon(weapon){
        return types.includes(weapon)
    }
}