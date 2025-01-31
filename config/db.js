import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

// Conexión a MongoDB
const connectDB = async () => {
  try {
    // Esto es para simular la carga de la base de datos
    let loadingDots = 0;
    const interval = setInterval(() => {
      loadingDots++;
      if (loadingDots > 3) loadingDots = 0;
      process.stdout.write(chalk.yellow(`\r🔄 Conectando a la base de datos MongoDB${".".repeat(loadingDots)}`));
    }, 500);

    // Intentar conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    
    // Detener la animación de carga y mostrar mensaje de éxito
    clearInterval(interval);
    console.log(chalk.green("\n✅ *** CONECTADO A LA BASE DE DATOS *** ✅\n"));
  } catch (err) {
    console.error(chalk.red("\n❌ *** Error al conectar a MongoDB:", err, "*** ❌\n"));
    process.exit(1); // Forzar salida si la conexión falla
  }
};

export default connectDB;
