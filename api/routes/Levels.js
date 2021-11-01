const router = require("express").Router();

const LevelController = require("../controller/LevelController");

router.get("/", LevelController.getLevels);
router.get("/:id", LevelController.getLevel);
router.post("/", LevelController.create);
router.put("/:id", LevelController.update);
router.delete("/:id", LevelController.delete);

module.exports = router;