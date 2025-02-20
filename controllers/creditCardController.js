import CreditCard from "../models/creditCardSchema.js";

// GET
export const getCreditCardsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const creditCards = await CreditCard.find({ user_id: userId });
    res.status(200).json(creditCards);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los creditos de usuario" });
  }
};

// POST
export const addCreditCard = async (req, res) => {
  try {
    const { card_number, expiration_date, cvv, brand, user_id, is_default } =
      req.body;

    if (!user_id) {
      return res.status(400).json({ error: "El campo user_id es obligatorio" });
    }

    // Si la tarjeta debe ser predeterminada, desmarcar las otras como predeterminadas
    if (is_default) {
      await CreditCard.updateMany({ user_id: user_id }, { is_default: false });
    }

    // Crear la nueva tarjeta
    const creditCard = new CreditCard({
      card_number,
      expiration_date,
      cvv,
      brand,
      user_id,
      is_default: is_default || false, // Si no se pasa is_default, se pone como false por defecto
    });

    // Guardar la tarjeta
    await creditCard.save();
    res.status(201).json(creditCard);
  } catch (error) {
    console.error("Error al agregar la tarjeta:", error);
    res
      .status(500)
      .json({ error: "Error al agregar el crédito", details: error.message });
  }
};

// PUT
export const selectDefaultCreditCard = async (req, res) => {
  try {
    const { id } = req.params;
    const creditCard = await CreditCard.findByIdAndUpdate(id, {
      is_default: true,
    });
    res.status(200).json(creditCard);
  } catch (error) {
    res.status(500).json({ error: "Error al seleccionar el credito" });
  }
};

// DELETE
export const deleteCreditCard = async (req, res) => {
  try {
    const { id } = req.params;
    const creditCard = await CreditCard.findByIdAndDelete(id);
    res.status(200).json(creditCard);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el credito" });
  }
};
