const COLLECTION_NAME = 'aliens'
const indxes = [{ id: 1 }]
const INSERT_MSG = "inserted alien to aliens collection"

module.exports = class Aliens {
    async initialize(mongodb, initFunciton) {
        this.mongodb = mongodb
        initFunciton(this.mongodb, COLLECTION_NAME, indxes)
    }
    async insertOne(insertFunction, data) {
        insertFunction(this.mongodb, COLLECTION_NAME, data, INSERT_MSG)
    }
    async checkIfIdExists(id) {
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        let res = await collection.find({ id }).toArray()
        return res.length > 0 ? false : true
    }
    async getAlienById(id) {
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        let res = await collection.find({ id }).toArray()
        return res[0] ? res[0] : { id: "0", name: "not found", type: "not found"}
    }
    async getAlienByName(name) {
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        let res = await collection.find({ name }).toArray()
        return res[0] ? res[0] : { id: "0", name: "not found", type: "not found"}
    }
    async getAllrecords(){
        const collection = await this.mongodb.collection(COLLECTION_NAME)
        return await collection.find({}).toArray()
    }
}