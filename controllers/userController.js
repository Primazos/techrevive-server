import chalk from "chalk";
import User from "../models/userSchema.js";
import { upload } from "../config/cloudinaryConfig.js";
import bcrypt from "bcryptjs";

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

    const randomString = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, randomString); // Encripto la contraseña

    const savedUser = await newUser.save();

    console.log(chalk.magentaBright("Usuario guardado:", savedUser._id));
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    console.log(chalk.greenBright("Usuario autenticado:", user._id));

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

// PUT
export const uploadAvatar = async (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al subir imagen", error: err.message });
    }

    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Se debe subir una imagen" });
      }

      const uploadedImageUrl = req.file.path;

      user.avatar_img = uploadedImageUrl;
      await user.save();

      console.log(chalk.magentaBright("Avatar actualizado:", user._id));
      res.json({
        avatar_img: uploadedImageUrl,
        message: "Avatar actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al subir avatar:", error);
      res.status(500).json({ message: "Error al subir el avatar", error });
    }
  });
};
