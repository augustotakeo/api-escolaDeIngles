const db = require("../models");

class ClassController {
    static async getClasses(req, res) {
        try {
            const classes = await db.Classes.findAll();
            return res.json(classes);
        } catch(error) {
            return res.status(500).send(error.message)
        }
    }

    static async getClass(req,res) {
        try {
            const { id } = req.params;
            const class_ = await db.Classes.findOne({
                where: { id }
            });
            return res.json(class_);
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const class_ = await db.Classes.create( data );
            return res.json(class_);
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await db.Classes.update(
                data,
                {
                    where: { id }
                }
            )
            return res.status(204).end();
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await db.Classes.destroy({
                where: { id }
            })
            return res.status(204).end();
        } catch(error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = ClassController;