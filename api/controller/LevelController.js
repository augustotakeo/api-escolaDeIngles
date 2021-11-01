const db = require("../models");

class LevelController {
    static async getLevels(req, res) {
        try {
            const levels = await db.Levels.findAll();
            return res.json(levels);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    static async getLevel(req, res) {   
        try {
            const { id } = req.params;
            const level = await db.Levels.findOne({
                where: { id }
            })
            return res.json(level);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const level = await db.Levels.create( data );
            return res.json(level);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await db.Levels.update( 
                data, 
                {
                    where: { id }
                }
            );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await db.Levels.destroy({
                where: { id }
            });
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = LevelController;