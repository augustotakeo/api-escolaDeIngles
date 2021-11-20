const PersonService = require("../services").PersonService;
const personService = new PersonService();
class PersonController {
    static async getActivePeople(req, res) {
        try {
            const people = await personService.findAll();
            res.json(people);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getAllPeople(req, res) {
        try {
            const people = await personService.findAllPeople();
            res.json(people);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getPerson(req, res) {
        try {
            const { id } = req.params;
            const person = await personService.findOne({ id });
            return res.json(person);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const person = await personService.create( data );
            return res.json(person);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await personService.update( data, id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await personService.delete( id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async restore(req, res) {
        try {
            const { id } = req.params;
            await personService.restore( id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //transaction
    static async cancel(req, res) {
        try {
            const { id } = req.params;
            await personService.deactivatePerson( id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PersonController;