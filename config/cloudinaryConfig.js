import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

// Configurar Cloudinary con las credenciales desde el archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
