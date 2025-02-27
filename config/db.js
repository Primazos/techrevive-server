import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();


const connectDB = async () => {
  try {
    let loadingDots = 0;
    const interval = setInterval(() => {
      loadingDots++;
      if (loadingDots > 3) loadingDots = 0;
      process.stdout.write(chalk.yellow(`\r🔄 Conectando a la base de datos MongoDB${".".repeat(loadingDots)}`));
    }, 500);

    
    await mongoose.connect(process.env.MONGO_URI);
    
    clearInterval(interval);
    console.log(chalk.green("\n✅ *** CONECTADO A LA BASE DE DATOS *** ✅\n"));
  } catch (err) {
    console.error(chalk.red("\n❌ *** Error al conectar a MongoDB:", err, "*** ❌\n"));
    process.exit(1);
  }
};

export default connectDB;
