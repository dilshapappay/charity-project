const express = require("express");
const itemsController = require("../controllers/itemsController");
const { validate } = require("../middlewares/validator");
const { itemSchema } = require("../api-data-schema/addItemSchema");
const { updateItemSchema } = require("../api-data-schema/updateItemSchema");
const authMiddleware = require('../middlewares/authMiddlware');
const router = express.Router();

router.get("/",authMiddleware, itemsController.getItems);
router.get("/:id", itemsController.getItemById);
router.post("/", validate(itemSchema), itemsController.createItems);
router.put("/", validate(updateItemSchema), itemsController.updateItem);

router.delete("/", itemsController.deleteItem);
module.exports = router;
