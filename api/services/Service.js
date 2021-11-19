const db = require("../models");


class Service {

    constructor(modelName) {
        this.modelName = modelName;
    }

    async findAll(where = {}) {
        return await db[this.modelName].findAll({ where });
    }

    async findOne( id ) {
        return await db[this.modelName].findOne({
            where: { id }
        })
    }

    async create( data ) {
        return await db[this.modelName].create( data );
    }

    async update( data, id ) {
        return await db[this.modelName].update(
            data,
            {
                where: { id }
            }
        )
    }

    async delete( id ) {
        return await db[this.modelName].destroy({
            where: { id }
        })
    }

    async restore( id ) {
        return await db[this.modelName].restore({
            where: { id }
        })
    }

}

module.exports = Service;