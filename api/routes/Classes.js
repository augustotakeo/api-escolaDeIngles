const router = require("express").Router();

const ClassController = require("../controller/ClassController");

router.get("/", ClassController.getClasses);
router.get("/:id", ClassController.getClass);
router.post("/", ClassController.create);
router.put("/:id", ClassController.update);
router.delete("/:id", ClassController.delete);
router.post("/:id/restore", ClassController.restore);

module.exports = router;