class Mongo {
    async createClient(connectionString) {
        const { MongoClient } = require('mongodb')
        return MongoClient.connect(connectionString, { useNewUrlParser: true })
            .catch((err) => {
                log.err(err.message, err);

            })
    }

    async connectToDB(connectionString) {
        const client = await this.createClient(connectionString)
        log.info('connecting to mongodb')
        return client.db(null)
    }
}

module.exports = Mongo
