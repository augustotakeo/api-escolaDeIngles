const db = require("../models");

const sequelize = require("sequelize");

const PersonService = require("../services/index").PersonService;
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
            const person = await personService.findOne(id);
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

            await db.sequelize.transaction( async transaction => {
                await db.People.update(
                    { active: false },
                    {   
                        where: {
                            id
                        }
                    },
                    transaction
                )

                await db.Registrations.update(
                    { status: "cancelado" },
                    {   
                        where: { student_id: id }
                    },
                    transaction
                )

            })

            return res.status(204).end();

        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    // association scope
    static async getRegistrations(req, res) {
        try {
            const { idStudent } = req.params;
            const person = await db.People.findOne({
                where: {
                    id: idStudent
                }
            })

            if(!person){
                return res.end();
            }

            const registrations = await person.getRegistrations();
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

    static async restoreRegistration(req, res) {
        try {
            const { idStudent, idRegistration } = req.params;
            await db.Registrations.restore({
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

    //finders
    static async getConfirmedRegistrationByClass(req, res) {
        try {
            const { class_id } = req.params;

            const registrations = await db.Registrations.findAndCountAll({ where: {
                class_id
            }});

            return res.status(200).json(registrations);

        } catch(error) {
            return res.status(500).json(error.message);
        }
    }

    //https://jvns.ca/blog/2019/10/03/sql-queries-don-t-start-with-select/
    /*
    FROM: pega as tabelas onde estão os dados

WHERE: filtra os dados

GROUP BY: agrega os dados

HAVING: filtra os dados agregados

SELECT: retorna os resultados

ORDER BY: ordena os resultados

LIMIT: limita a quantidade de resultados
    */
    static async getCrowdedClasses(req, res) {
        try {

            const masRegistrations = 2;

            const registrations = await db.Registrations.findAndCountAll({ 
                where: {
                    status: "confirmado"
                },
                attributes: ["class_id"],
                group: ["class_id"],
                having: sequelize.literal(`count(class_id) >= ${masRegistrations}`)
            });

            return res.status(200).json(registrations.count);

        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PersonController;