require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();

// Conexión a DB
mongoose.connect(process.env.MONGODB_URL);

// cors
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://tudominio.com",
];

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowedOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error("Origen no permitido por CORS"));
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
}));

// Middlewares globales
app.use(express.json());
app.use(requestLogger);

// Rutas 
app.use("/api",routes);

// err0res de celebrate
app.use(errors());

//  Ruta 404 no encontrado
app.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

// Logger de errores
app.use(errorLogger);

// Manejador centralizado de errores
app.use(errorHandler);

module.exports = app;
