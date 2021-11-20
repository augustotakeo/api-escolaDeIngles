const Service = require("./Service");

const db = require("../models");

const RegistrationService = require("./RegistrationService");
const registrationService = new RegistrationService();

class PersonService extends Service {
    constructor() {
        super("People");
    }

    async findAllPeople() {
        return db[this.modelName].scope("allPeople").findAll();
    }

    async deactivatePerson( id ) {
        db.sequelize.transaction(t => {
            this.update({ active: false }, id, t);
            registrationService.updateSeveral({ status: "cancelado" }, { student_id: id }, t);
        })
    }
}

module.exports = PersonService;