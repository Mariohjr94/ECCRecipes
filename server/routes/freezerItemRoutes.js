const express = require("express");
const router = express.Router();
const controller = require("../controllers/freezerItemController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", controller.getItems);
router.post("/", authenticateToken, controller.createItem);
router.put("/:id", authenticateToken, controller.updateItem);
router.delete("/:id", authenticateToken, controller.deleteItem);

module.exports = router;
