const { Router } = require("express");
const PersonController = require("../controller/PersonController");

const router = Router();

router.get("/", PersonController.getPeople);
router.get("/:id", PersonController.getPerson);
router.post("/", PersonController.create);
router.put("/:id", PersonController.update);
router.delete("/:id", PersonController.delete);

router.get("/:idStudent/registrations", PersonController.getRegistrations);
router.get("/:idStudent/registrations/:idRegistration", PersonController.getRegistration);
router.post("/:idStudent/registrations", PersonController.createRegistration)
router.put("/:idStudent/registrations/:idRegistration", PersonController.updateRegistration);
router.delete("/:idStudent/registrations/:idRegistrations", PersonController.deleteRegistration);

module.exports = router;