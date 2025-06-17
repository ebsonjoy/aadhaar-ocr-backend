import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ocrRoutes from './routes/ocrRoutes';
import path from 'path';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin:process.env.LOCAL_URL,
  // origin:  process.env.PRODUCTION_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Routes
app.use('/api/ocr', ocrRoutes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});