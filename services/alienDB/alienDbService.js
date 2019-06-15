const Aliens = require('./aliens')
const CommanderByChief = require('./commanderByChief')
const MemberCard = require('./memberCard')
const Vehicles = require('./vehicles')
const WarriorByCommander = require('./warriorByCommander')
const WeaponByWarrior = require('./weaponByWarrior')


module.exports = class AlienDBService {
  constructor(mongo) {
    this.mongodb = mongo
  }

  async initialize() {
    try {
      this.aliens = new Aliens()
      await this.aliens.initialize(this.mongodb, this.initCollectionService)
      this.commanderByChief = new CommanderByChief()
      await this.commanderByChief.initialize(this.mongodb, this.initCollectionService)
      this.memberCard = new MemberCard()
      await this.memberCard.initialize(this.mongodb, this.initCollectionService)
      this.vehicles = new Vehicles()
      await this.vehicles.initialize(this.mongodb, this.initCollectionService)
      this.warriorByCommander = new WarriorByCommander()
      await this.warriorByCommander.initialize(this.mongodb, this.initCollectionService)
      this.weaponByWarrior = new WeaponByWarrior()
      await this.weaponByWarrior.initialize(this.mongodb, this.initCollectionService)
    } catch (error) {
      log.error(error)
    }
  }
  async initCollectionService(mongodb, collectionName, indexes) {
    try {
      await mongodb.createCollection(collectionName)
      const collection = await mongodb.collection(collectionName)
      indexes.forEach(async obj => await collection.createIndex(obj))
    } catch (error) {
      log.error(error)
    }
  }
  async insertOneIntoCollection(mongodb, collectionName, data, msg) {
    try {
      const collection = await mongodb.collection(collectionName)
      await collection.insertOne(data)
      log.info(msg)
    } catch (error) {
      log.error(error)
      return error

    }
  }
  async insertWarrior(id, name, commander_id_for_warrior, weapon_type) {
    try {
      const isIdOK = await this.aliens.checkIfIdExists(id)
      const weaponIsOk = this.weaponByWarrior.validateWeapon(weapon_type)
      const commander = await this.aliens.getAlienById(commander_id_for_warrior)
      const canAssignCommander = await this.warriorByCommander.checkCommanderCapacity(commander_id_for_warrior)
      if (isIdOK && weaponIsOk && canAssignCommander && commander.id !== "0" && commander.type === "commander") {
        const type = "warrior"
        await this.aliens.insertOne(this.insertOneIntoCollection, { id, name, type })
        await this.warriorByCommander.insertOne(this.insertOneIntoCollection,
          { warrior_id: id, warrior_name: name, commander_id: commander.id, commander_name: commander.name })
        await this.weaponByWarrior.insertOne(this.insertOneIntoCollection, { id, weapon_type })
        log.info(`inserted warrior ${id} ${name}`)
        return { status: "success", id, name }
      } else {
        throw new Error(`failed to insert. id exists? ${!isIdOK}, weapon is ok? ${weaponIsOk}, commander type? ${commander.type} (should be commander) ,commander name? ${commander.name}, commander at capacity? ${!canAssignCommander}`)
      }
    } catch (error) {
      log.error(error)
      throw error
    }
  }
  async insertCommander(id, name, chief_id_for_commander, vehicle_type) {
    try {
      const isIdOK = await this.aliens.checkIfIdExists(id)
      const vehicleIsOK = this.vehicles.validateVehicle(vehicle_type)
      const chief = await this.aliens.getAlienById(chief_id_for_commander)
      const canAssignChief = await this.commanderByChief.checkChiefCapacity(chief_id_for_commander)
      if (isIdOK && vehicleIsOK && canAssignChief && chief.id !== "0" && chief.type === "chief") {
        const type = "commander"
        await this.aliens.insertOne(this.insertOneIntoCollection, { id, name, type })
        await this.commanderByChief.insertOne(this.insertOneIntoCollection,
          { commander_id: id, commander_name: name, chief_id: chief.id, chief_name: chief.name })
        await this.vehicles.insertOne(this.insertOneIntoCollection,
          { commander_id: id, chief_id: chief.id, vehicle_type })
        log.info(`inserted commander ${id} ${name}`)
        return { status: "success", id, name }
      } else {
        throw new Error(`failed to insert. id exists? ${!isIdOK}, vehicle is ok? ${vehicleIsOK}, chief type? ${chief.type} (should be chief), chief name? ${chief.name}, chief at capacity? ${!canAssignChief}`)
      }
    } catch (error) {
      log.error(error)
      throw error
    }
  }
  async insertChief(id, name, card_type) {
    try {
      const isIdOK = await this.aliens.checkIfIdExists(id)
      const cardIsOK = this.memberCard.validateCard(card_type)
      if (isIdOK && cardIsOK) {
        const type = "chief"
        await this.aliens.insertOne(this.insertOneIntoCollection, { id, name, type })
        await this.memberCard.insertOne(this.insertOneIntoCollection, { chief_id: id, card_type })
        log.info(`inserted chief ${id} ${name}`)
        return { status: "success", id, name }
      } else {
        throw new Error(`failed to insert: id exists? ${!isIdOK}, card is ok? ${cardIsOK}`)
      }
    } catch (error) {
      log.error(error)
      throw error
    }
  }
  async insertAlien(userInfo) {
    const {
      id,
      name,
      type,
      weapon_type,
      vehicle_type,
      card_type,
      commander_id_for_warrior,
      chief_id_for_commander
    } = userInfo
    try {
      if (type === "warrior") return await this.insertWarrior(id, name, commander_id_for_warrior, weapon_type)
      if (type === "commander") return await this.insertCommander(id, name, chief_id_for_commander, vehicle_type)
      if (type === "chief") return await this.insertChief(id, name, card_type)
    } catch (error) {
      log.error(error)
      return { status: "failed", id, name, error: error.message }
    }

  }
  async getAllAliens() {
    try {
      return await this.aliens.getAllrecords()
    } catch (error) {
      log.error(error)
      return { status: "failed", error }
    }
  }
  async getSuperviedAliens(data) {
    try {
      let alien
      data = this.generateValidMsg(data)
      if (data.id) {
        alien = await this.aliens.getAlienById(data.id)
        if (alien.type === "commander") {
          return await this.warriorByCommander.getAllforCommanderId(alien.id)
        } else {
          return await this.commanderByChief.getAllforChiefId(data.id)
        }
      } else {
        alien = await this.aliens.getAlienByName(data.name)
        if (alien.type === "commander") {
          return await this.warriorByCommander.getAllforCommanderName(alien.name)
        } else {
          return await this.commanderByChief.getAllforChiefName(data.name)
        }
      }
    } catch (error) {
      log.error(error)
      return { status: "failed", error }
    }

  }
  generateValidMsg(data) {
    if (data["id"]) {
      data["id"] = data["id"].toString()
    } else if (data["name"]) {
      data["name"] = data["name"].toString()
    } else {
      throw new Error("no identifiers were passed")
    }
    return data
  }
}
