const router = require("express").Router();
const { getItems, createItem, deleteItem, updateItem } = require("../controllers/watchlist");
const { validateId } = require("../middlewares/validate");

// Rutas para los métodos GET, POST, DELETE y PATCH
router.get("/", getItems);
router.post("/", createItem);
router.patch('/:id', updateItem);
router.delete("/:id", validateId, deleteItem);  

module.exports = router;
