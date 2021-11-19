const LevelService = require("../services/LevelService");
const levelService = new LevelService();
class LevelController {
    static async getLevels(req, res) {
        try {
            const levels = await levelService.findAll();
            return res.json(levels);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async getLevel(req, res) {   
        try {
            const { id } = req.params;
            const level = await levelService.findOne( id );
            return res.json(level);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const level = await levelService.create( data );
            return res.json(level);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await levelService.update( data, id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await levelService.delete( id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async restore(req, res) {
        try {
            const { id } = req.params;
            await levelService.restore( id );
            return res.status(204).end();
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = LevelController;