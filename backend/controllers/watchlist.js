const watchListItem = require("../models/watchListItem");

// GET /watchlist
module.exports.getItems = async (req, res) => {
  const items = await watchListItem.find({ owner: req.user._id });
  res.send(items);
};

// POST /watchlist
module.exports.createItem = async (req, res) => {
  try {
    const item = await watchListItem.create({ ...req.body, owner: req.user._id });
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send({ message: "Error al crear item" });
  }
};

// DELETE /watchlist/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const item = await watchListItem.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!item) {
      return res.status(404).send({ message: "Item no encontrado" });
    }

    res.send({ message: "Eliminado" });
  } catch (err) {
    res.status(400).send({ message: "Error al eliminar item" });
  }
};
