const router = require("express").Router();
const { getItems, createItem, deleteItem, updateItem } = require("../controllers/watchlist");
const { validateId } = require("../middlewares/validate");

router.get("/", getItems);
router.post("/", createItem);
router.patch("/:id", validateId, updateItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
