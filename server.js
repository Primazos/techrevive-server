import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import chalk from "chalk";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
// ✅ Código con import correcto para ES Modules
import cartRoutes from "./routes/cartRoutes.js";


const app = express();
const PORT = 3001;



app.use(express.json());

app.use(cors({
  origin: "*", // Esto permite solicitudes desde cualquier origen
  methods: "GET, POST, PUT, DELETE", 
  allowedHeaders: "Content-Type, Authorization"
}));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
  res.send({
    status: "Techrevive API",
    primazos: "Gustavo y Jorge",
  });
});

connectDB();

app.listen(PORT, () =>
  console.log(chalk.blue(`\nSERVIDOR CORRIENDO EN: http://localhost:${PORT}`))
);
