const sequelize = require("sequelize");

const RegistrationService = require("../services").RegistrationService;
const registrationService = new RegistrationService();

class RegistrationController {
    // association scope
    static async getRegistrations(req, res) {
        try {
            const { idStudent } = req.params;
            const registrations = await registrationService.findAll({
                student_id: idStudent,
                status: "confirmado"
            });
            return res.json(registrations);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getRegistration(req, res) {
        try {
            const { idStudent, idRegistration } = req.params;
            const registration = await registrationService.findOne({
                id: idRegistration,
                student_id: idStudent
            });
            return res.json(registration);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async createRegistration(req, res) {
        try {
            const { idStudent } = req.params;
            const data = { ...req.body, student_id: idStudent };
            const registration = await registrationService.create( data );
            return res.json(registration);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateRegistration(req, res) {
        try {
            const { idRegistration } = req.params;
            const data = req.body;
            await registrationService.update( data, idRegistration );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteRegistration(req, res) {
        try {
            const { idRegistration } = req.params;
            await registrationService.delete( idRegistration );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreRegistration(req, res) {
        try {
            const { idRegistration } = req.params;
            await registrationService.restore( idRegistration );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //finders
    static async getConfirmedRegistrationByClass(req, res) {
        try {
            const { class_id } = req.params;

            const registrations = await registrationService.findAndCountAll( { class_id } );

            return res.status(200).json(registrations);

        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getCrowdedClasses(req, res) {
        try {

            const maxRegistrations = 2;

            const where = {
                status: "confirmado"
            }

            const aggregations = {
                attributes: ["class_id"],
                group: ["class_id"],
                having: sequelize.literal(`count(class_id) >= ${maxRegistrations}`)
            }

            const registrations = await registrationService.findAndCountAll(where, aggregations);

            return res.status(200).json(registrations.count);

        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = RegistrationController;