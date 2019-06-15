const COLLECTION_NAME = 'warrior_by_commander'
const indxes = [{ commander_id: 1 }, { commander_name: 1 }, { warrior_id: 1 }, { warrior_name: 1 }]
const INSERT_MSG = "inserted warrior and commander to warrior_by_commander collection"
const maxCapacity = 30

module.exports = class WarriorByCommander {
    async initialize(mongodb, initFunciton) {
        this.mongodb = mongodb
        initFunciton(this.mongodb, COLLECTION_NAME, indxes)
    }
    async insertOne(insertFunction, data) {
        insertFunction(this.mongodb, COLLECTION_NAME, data, INSERT_MSG)
    }
    async checkCommanderCapacity(commander_id) {
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        let currentCount = await collection.countDocuments({ commander_id })
        return currentCount < maxCapacity ? true : false
    }
    async getAllforCommanderId(commander_id){
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        return await collection.find({commander_id}).toArray()
    }
    async getAllforCommanderName(commander_name){
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        return await collection.find({commander_name}).toArray()
    }
}