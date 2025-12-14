const watchListItem = require("../models/watchListItem");

// GET /watchlist
module.exports.getItems = async (req, res) => {
  const items = await watchListItem.find({ owner: req.user._id });
  res.send(items);
};

// POST /watchlist
module.exports.createItem = async (req, res) => {
  try {
    console.log("USER ID:", req.user._id.toString());

    const itemData = { ...req.body, owner: req.user._id };


    if (!itemData.externalId) {
      itemData.externalId = itemData.id;
    }

    if (!itemData.status) {
      itemData.status = "pendiente";
    }

    // Verifica si el ítem ya existe en la base de datos
    const existingItem = await watchListItem.findOne({ externalId: itemData.externalId, owner: req.user._id });
    if (existingItem) {
      return res.status(400).send({ message: "Este ítem ya está en tu lista" });
    }

    const item = await watchListItem.create(itemData);
    res.status(201).send(item);
  } catch (err) {

    res.status(400).send({ message: "Error al crear el ítem" });
  }
};


// DELETE /watchlist/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const idToDelete = req.params.id;

    const item = await watchListItem.findOneAndDelete({
      externalId: idToDelete,
      owner: req.user._id,
    });

    if (!item) {
      return res.status(404).send({ message: "Item no encontrado" });
    }

    //console.log('Item eliminado:', item);
    res.send({ message: "Eliminado" });
  } catch (err) {
    console.error('Error al eliminar item:', err);
    res.status(400).send({ message: "Error al eliminar item" });
  }
};


// PATCH - EDIT /watchlist/:id
module.exports.updateItem = async (req, res) => {
  try {
    const externalId = req.params.id;
    const { status } = req.body;

    const updatedItem = await watchListItem.findOneAndUpdate(
      { externalId: String(externalId), owner: req.user._id }, 
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).send({ message: "Item no encontrado" });
    }

    return res.send(updatedItem);
  } catch (err) {
    return res.status(500).send({ message: "Error al actualizar item", error: err.message });
  }
};
