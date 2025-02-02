import chalk from "chalk";
import Product from "../models/productSchema.js";

// GET
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    console.log(chalk.magentaBright("Producto encontrado:", product._id));
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

export const getProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const products = await Product.find({ user_id: userId });
    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No hay productos para este usuario" });
    }

    console.log(chalk.magentaBright("Productos encontrados:", products.length));
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos del usuario", error });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    if (!category) {
      return res.status(400).json({ message: "Categoría inválida" });
    }

    const products = await Product.find({ category: category });
    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No hay productos para esta categoría" });
    }

    console.log(
      chalk.magentaBright(
        "Productos por categorías encontrados:",
        products.length
      )
    );
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos por categoría", error });
  }
};

// POST - Añadir un nuevo producto
export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log(chalk.magentaBright("Producto guardado:", savedProduct._id));
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

// PUT
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );

    console.log(
      chalk.magentaBright("Producto actualizado:", updatedProduct._id)
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    console.log(chalk.magentaBright("Producto eliminado:", deletedProduct._id));
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
