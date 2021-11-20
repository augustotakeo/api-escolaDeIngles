const Op = require("sequelize").Op;

const ClassService = require("../services/ClassService");
const classService = new ClassService

class ClassController {
    static async getClasses(req, res) {

        const { initial_date, final_date } = req.query;

        let where = {};

        initial_date || final_date ? where.initial_date = {} : null;
        initial_date ? where.initial_date[Op.gte] = initial_date : null;
        final_date ? where.initial_date[Op.lte] = final_date : null;

        
        try {
            const classes = await classService.findAll(where);
            return res.json(classes);
        } catch(error) {
            return res.status(500).send(error.message)
        }
    }

    static async getClass(req,res) {
        try {
            const { id } = req.params;
            const class_ = await classService.findOne( { id } );
            return res.json(class_);
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const class_ = await classService.create( data );
            return res.json(class_);
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await classService.update( data , id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await classService.delete( id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }

    static async restore(req, res) {
        try {
            const { id } = req.params;
            await classService.restore( id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ClassController;