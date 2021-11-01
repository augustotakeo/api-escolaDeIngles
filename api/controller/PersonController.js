const db = require("../models");

class PersonController {
    static async getPeople(req, res) {
        try {
            const people = await db.People.findAll();
            res.json(people);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getPerson(req, res) {
        try {
            const { id } = req.params;
            const person = await db.People.findOne({
                where: { id }
            });
            return res.json(person);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const person = await db.People.create( data );
            return res.json(person);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await db.People.update(
                data,
                {
                    where: { id }
                }
            )
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await db.People.destroy( {
                where: {id}
            });
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getRegistrations(req, res) {
        try {
            const { idStudent } = req.params;
            const registrations = await db.Registrations.findAll({
                where: { student_id: idStudent }
            });
            return res.json(registrations);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getRegistration(req, res) {
        try {
            const { idStudent, idRegistration } = req.params;
            const registration = await db.Registrations.findOne({
                where: { 
                    id: idRegistration,
                    student_id: idStudent
                }
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
            const registration = await db.Registrations.create( data );
            return res.json(registration);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateRegistration(req, res) {
        try {
            const { idStudent, idRegistration } = req.params;
            const data = req.body;
            await db.Registrations.update(
                data,
                {
                    where: { 
                        id: idRegistration,
                        student_id: idStudent
                    }
                }
            );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteRegistration(req, res) {
        try {
            const { idStudent, idRegistration } = req.params;
            await db.Registrations.destroy({
                where: { 
                    id: idRegistration,
                    student_id: idStudent
                }
            });
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PersonController;