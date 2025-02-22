import CreditCard from "../models/creditCardSchema.js";

// GET
export const getCreditCardsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const creditCards = await CreditCard.find({ user_id: userId });

    // Verifica si solo hay una tarjeta y la marca como predeterminada
    if (creditCards.length === 1) {
      creditCards[0].is_default = true;
      await creditCards[0].save(); // Guarda los cambios
    }

    res.status(200).json(creditCards);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los creditos de usuario" });
  }
};

export const getDefaultCreditCard = async (req, res) => {
  try {
    const { userId } = req.params;
    const creditCard = await CreditCard.findOne({
      user_id: userId,
      is_default: true,
    });
    res.status(200).json(creditCard);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el credito predeterminado" });
  }
};

// POST
export const addCreditCard = async (req, res) => {
  try {
    const { card_number, expiration_date, cvv, brand, user_id } = req.body;

    if (!user_id || !card_number || !expiration_date || !cvv || !brand) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const cardCount = await CreditCard.countDocuments({ user_id });

    let is_default = cardCount === 0;

    const creditCard = new CreditCard({
      card_number,
      expiration_date,
      cvv,
      brand,
      user_id,
      is_default,
    });

    await creditCard.save();
    res.status(201).json(creditCard);
  } catch (error) {
    console.error("Error al agregar la tarjeta:", error);
    res
      .status(500)
      .json({ error: "Error al agregar la tarjeta", details: error.message });
  }
};

// PUT
export const selectDefaultCreditCard = async (req, res) => {
  try {
    const { id } = req.params;

    const creditCard = await CreditCard.findById(id);
    if (!creditCard) {
      return res.status(404).json({ error: "Tarjeta no encontrada" });
    }

    await CreditCard.updateMany({ user_id: creditCard.user_id }, { is_default: false });

    creditCard.is_default = true;
    await creditCard.save();

    res.status(200).json(creditCard);
  } catch (error) {
    console.error("Error al seleccionar la tarjeta:", error);
    res.status(500).json({ error: "Error al seleccionar la tarjeta", details: error.message });
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
