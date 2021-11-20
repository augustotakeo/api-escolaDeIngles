const db = require("../models");


class Service {

    constructor(modelName) {
        this.modelName = modelName;
    }

    async findAll(where = {}) {
        return await db[this.modelName].findAll({ where });
    }

    async findOne( where = {} ) {
        return await db[this.modelName].findOne({ where })
    }

    async create( data ) {
        return await db[this.modelName].create( data );
    }

    async update( data, id, transaction = {} ) {
        return await db[this.modelName].update(
            data,
            {
                where: { id }
            },
            transaction
        )
    }

    async updateSeveral( data, where, transaction = {} ) {
        return await db[this.modelName].update(
            data,
            { where },
            transaction
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

    async findAndCountAll( where = {}, aggregations = {} ) {
        return db[this.modelName].findAndCountAll({ where, ...aggregations });
    }

}

module.exports = Service;