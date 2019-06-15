const COLLECTION_NAME = 'commander_by_chief'
const indxes = [{ commander_id: 1 }, { commander_name: 1 }, { chief_id: 1 }, { chief_name: 1 }]
const INSERT_MSG = "inserted commander into commander_by_chief collection"
const maxCapacity = 3

module.exports = class ComanderByChief {
    async initialize(mongodb, initFunciton) {
        this.mongodb = mongodb
        initFunciton(this.mongodb, COLLECTION_NAME, indxes)
    }
    async insertOne(insertFunction, data) {
        insertFunction(this.mongodb, COLLECTION_NAME, data, INSERT_MSG)
    }
    async checkChiefCapacity(chief_id) {
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        let currentCount = await collection.countDocuments({ chief_id })
        return currentCount < maxCapacity ? true : false
    }
    async getAllforChiefId(chief_id){
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        return await collection.find({chief_id}).toArray()
    }
    async getAllforChiefName(chief_name){
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        return await collection.find({chief_name}).toArray()
    }
}