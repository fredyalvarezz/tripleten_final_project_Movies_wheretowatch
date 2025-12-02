const router = require("express").Router();
const { getItems, createItem, deleteItem } = require("../controllers/watchlist");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:id", deleteItem);

module.exports = router;
