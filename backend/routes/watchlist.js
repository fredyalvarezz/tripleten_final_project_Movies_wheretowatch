const router = require("express").Router();
const { getItems, createItem, deleteItem } = require("../controllers/watchlist");
const { validateId } = require("../middlewares/validate");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:id", validateId, deleteItem);

module.exports = router;
