const { Router } = require("express");
const PersonController = require("../controller/PersonController");
const RegistrationController = require("../controller/RegistrationController");
const router = Router();

router.get("/", PersonController.getActivePeople);
router.get("/all", PersonController.getAllPeople);
router.get("/:id", PersonController.getPerson);
router.post("/", PersonController.create);
router.put("/:id", PersonController.update);
router.delete("/:id", PersonController.delete);
router.post("/:id/restore", PersonController.restore);
router.post("/:id/cancel", PersonController.cancel);

router.get("/registrations/:class_id/confirmed", RegistrationController.getConfirmedRegistrationByClass);

router.get("/classes/crowded", RegistrationController.getCrowdedClasses);

router.get("/:idStudent/registrations", RegistrationController.getRegistrations);
router.get("/:idStudent/registrations/:idRegistration", RegistrationController.getRegistration);
router.post("/:idStudent/registrations", RegistrationController.createRegistration)
router.put("/:idStudent/registrations/:idRegistration", RegistrationController.updateRegistration);
router.delete("/:idStudent/registrations/:idRegistration", RegistrationController.deleteRegistration);
router.post("/:idStudent/registrations/:idRegistration/restore", RegistrationController.restoreRegistration);

module.exports = router;