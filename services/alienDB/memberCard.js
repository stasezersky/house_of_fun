const COLLECTION_NAME = 'member_card'
const indxes = [{ chief_id: 1 }]
const INSERT_MSG = "inserted chief into member_card collection"
const type = require('../../config/constants').member_card

module.exports = class MemberCard {
    async initialize(mongodb, initFunciton) {
        this.mongodb = mongodb
        initFunciton(this.mongodb, COLLECTION_NAME, indxes)
    }
    async insertOne(insertFunction, data) {
        insertFunction(this.mongodb, COLLECTION_NAME, data, INSERT_MSG)
    }
    validateCard(card){
        return type.includes(card)
    }
}