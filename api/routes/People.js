const { Router } = require("express");
const PersonController = require("../controller/PersonController");

const router = Router();

router.get("/", PersonController.getActivePeople);
router.get("/all", PersonController.getAllPeople);
router.get("/:id", PersonController.getPerson);
router.post("/", PersonController.create);
router.put("/:id", PersonController.update);
router.delete("/:id", PersonController.delete);
router.post("/:id/restore", PersonController.restore);
router.post("/:id/cancel", PersonController.cancel);

router.get("/registrations/:class_id/confirmed", PersonController.getConfirmedRegistrationByClass);

router.get("/classes/crowded", PersonController.getCrowdedClasses);

router.get("/:idStudent/registrations", PersonController.getRegistrations);
router.get("/:idStudent/registrations/:idRegistration", PersonController.getRegistration);
router.post("/:idStudent/registrations", PersonController.createRegistration)
router.put("/:idStudent/registrations/:idRegistration", PersonController.updateRegistration);
router.delete("/:idStudent/registrations/:idRegistration", PersonController.deleteRegistration);
router.post("/:idStudent/registrations/:idRegistration/restore", PersonController.restoreRegistration);

module.exports = router;