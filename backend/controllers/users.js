const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Signup - Registrarse
module.exports.createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
      name: name || "Usuario"
    });

    res.status(201).send({
      email: user.email,
      name: user.name,
      _id: user._id
    });
  } catch (err) {
    if (err.code === 11000) {
    res.status(409).send({ message: "El correo ya está registrado" });
  } else {
    res.status(400).send({ message: "Error al crear usuario" });
  }
}
};


// Login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send({ message: "Credenciales incorrectas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.send({ token });

  } catch (err) {
    res.status(500).send({ message: "Error en login" });
  }
};


// GET /users/me
module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.send({
      email: user.email,
      name: user.name,
      _id: user._id
    });
  } catch (err) {
    res.status(500).send({ message: "Error al obtener usuario" });
  }
};

// Users Update
module.exports.updateUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  const updateData = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (avatar) updateData.avatar = avatar;
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    updateData.password = hash;
  }

  try {
    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });
    res.send({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      _id: user._id
    });
  } catch (err) {
    res.status(400).send({ message: "Error al actualizar usuario" });
  }
};

