import express from 'express';
import connectDB from './config/db.js';
import chalk from 'chalk';

/* import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; */


const app = express();
const PORT = 3000;

app.use(express.json());
/* app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chats', chatRoutes); */

app.get('/', (req, res) => {
  res.send({
    status: 'Techrevive API',
    primazos:"Gustavo y Jorge"
  });
});


connectDB();

app.listen(PORT, () => console.log(chalk.blue(`\nSERVIDOR CORRIENDO EN: http://localhost:${PORT}`)));
