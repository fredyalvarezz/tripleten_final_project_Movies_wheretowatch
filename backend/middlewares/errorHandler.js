module.exports = (err, req, res, next) => {
  console.error(err);

  // Mongo: ID inválido
  if (err.name === "CastError") {
    return res.status(400).send({ message: "ID inválido" });
  }

  // Mongo: validación fallida
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: "Datos inválidos" });
  }

  // Email duplicado (error 11000)
  if (err.code === 11000) {
    return res.status(409).send({ message: "Este email ya está registrado" });
  }

  // Error creado manualmente con statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Error inesperado
  return res.status(500).send({ message: "Error interno del servidor" });
};
