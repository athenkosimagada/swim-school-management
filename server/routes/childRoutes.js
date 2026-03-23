const childController = require("../controllers/childController");

const express = require("express");
const router = express.Router();

router.get("/user/:id", childController.getChildrenByUserId);
router.get("/:id", childController.getChildById);
router.post("/", childController.createChild);
router.put("/:id", childController.updateChild);
router.delete("/:id", childController.deleteChild);

module.exports = router;
