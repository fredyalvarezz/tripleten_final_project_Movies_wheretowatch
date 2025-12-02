const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateSignup, validateLogin } = require("../middlewares/validate");
const userRoutes = require("./users");
const watchlistRoutes = require("./watchlist");

// Rutas públicas
router.post("/signup",validateSignup, createUser);
router.post("/login", validateLogin, login); // estandarizamos nombre

// Rutas privadas
router.use(auth);
router.use("/users", userRoutes);
router.use("/watchlist", watchlistRoutes);

module.exports = router;
