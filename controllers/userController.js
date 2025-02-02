import chalk from "chalk";
import User from "../models/userSchema.js";

// GET
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log(chalk.magentaBright("Usuario encontrado:", user._id));
    res.json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// POST
export const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);

    const savedUser = await newUser.save();

    console.log(chalk.magentaBright("Usuario guardado:", savedUser._id));
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};
