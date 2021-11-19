const Service = require("./Service");

const db = require("../models");

class PersonService extends Service {
    constructor() {
        super("People");
    }

    async findAllPeople() {
        return db[this.modelName].scope("allPeople").findAll();
    }
}

module.exports = PersonService;